let createError = require('http-errors');
let express = require('express');
let path = require('path');
let logger = require('morgan');
let helmet = require('helmet')
let cors = require('cors');
let mysql = require('mysql');
let bcrypt = require('bcryptjs');
let nodemailer = require('nodemailer');
let randomBytes = require('crypto').randomBytes;
let cfg = require('./config');



// mysql config
let db = mysql.createConnection({
  host: "localhost",
  user: "dev",
  password: "11223344",
  database: "themoviedb"
});

db.connect(function (err) {
  if (err) {
    throw err;
  }
  console.log("MySQL database connected");
});


// Express 
let app = express();

app.use(helmet()); // security layer
app.use(cors()); // cross-origin requests
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Auth Form Validation functions
let validateEmail = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
let validateSignUp = (email, password, passwordc) => {
  let errors = { email: "", password: "", passwordc: "" }
  if (email === null || email === undefined || email === "") {
    errors.email = "the email is a required field";
  }
  else if (validateEmail(email) === false) {
    errors.email = "the email is invalid";
  }
  if (password === null || password === undefined || password === "") {
    errors.password = "the password is a required field"
  }
  else if (password.length < 8) {
    errors.password = "the password has to be at least 8 characters"
  }
  if (password !== "" && passwordc !== password) {
    errors.passwordc = "the two passwords must match";
  }
  if (errors.email + errors.password + errors.passwordc !== "") {
    return { isValid: false, errors };
  }
  return { isValid: true, errors };
}

app.get("/", (req, res) => {
  res.json({ root: "success" });
})

// Signing up / Registeration request
app.post("/signup", (req, res) => {
  let { email, password, passwordc } = req.body;
  console.log(`${email} is trying to sign up`);
  let { isValid, errors } = validateSignUp(email, password, passwordc);
  if (isValid === false) {
    res.json({ registered: false, errors });
  } else {
    // Check if the user already exists in the database
    db.query(`SELECT * FROM users WHERE email='${email}'`, (err, result) => {
      if (err) throw err;
      else if (result.length !== 0) {
        errors.email = "this email has been taken";
        res.json({ registered: false, errors });
      } else {
        // Check if the user exists in the unconfirmed_users table
        db.query(`SELECT * FROM unconfirmed_users WHERE email='${email}'`, (err, result) => {
          if (err) throw err;
          else if (result.length !== 0) {
            errors.email = "this email has to be confirmed";
            res.json({ registered: false, errors });
          } else {
            // Salt & hash the password
            bcrypt.genSalt(10, function (err, salt) {
              if (err) throw err;
              bcrypt.hash(password, salt, function (err, hash) {
                if (err) throw err;
                // generate the email confirmation token
                randomBytes(32, (err, buffer) => {
                  if (err) throw err;
                  let token = buffer.toString("hex");
                  // Store user's email + hashed password in the unconfirmed_users table
                  db.query(`INSERT INTO unconfirmed_users (email,password,token) VALUES ('${email}','${hash}','${token}')`, (err, result) => {
                    if (err) throw err;

                    // create reusable transporter object using the default SMTP transport

                    let template = `
                    <html>
                      <body>
                        <div id="container">
                        <img src="${cfg.logo}" alt="logo" width="42" height="42">
                         <h3>Registration confirmation</h3>
                          <p> Please click the link bellow to confirm your registeration </p>
                          <a href="http://192.168.0.10:3000/confirm/${token}"> Confirmation Link </a>
                       </div>
                       </body>
                      </html>
                    `;

                    let transporter = nodemailer.createTransport({
                      host: "smtp.zoho.com",
                      port: 587, // TLS port
                      secure: false, // true for 465, false for other ports
                      auth: {
                        user: cfg.email,
                        pass: cfg.password
                      },
                      tls: { rejectUnauthorized: false },
                    });

                    // send mail with defined transport object
                    let info = transporter.sendMail({
                      from: '"themoviedb-store" <nazim@ryanleulmi.com>', // sender address
                      to: email, // list of receivers
                      subject: "Registration confirmation", // Subject line
                      html: template
                    }).then(info => {
                      console.log("confirmation email has been sent from nodejs");
                      res.json({ registered: true, errors });
                    }).catch(err => console.log(err));
                  });
                })
              });
            });
          }
        })
      }
    })

  }
})

app.post('/confirm', function (req, res) {
  let { token } = req.body;
  console.log(token);
  db.query(`SELECT * FROM unconfirmed_users WHERE token='${token}'`, (err, results) => {
    if (err) throw err;
    else if (results === null || results.length === 0) {
      console.log(`Failed to confirm (${token})`)
      res.json({ confirmation: "failed" });
    } else {
      let { email, password } = results[0];
      db.query(`INSERT INTO users(email,password) VALUES("${email}","${password}")`, (err, results) => {
        if (err) throw err;
        db.query(`DELETE FROM unconfirmed_users WHERE email="${email}"`, (err, results) => {
          if (err) throw err;
          console.log(`${email} has been activated`);
          res.json({ email })
        })
      });
    }
  })
})


let validateSignIn = (email, password) => {
  let errors = { email: "", password: "" }
  if (email === null || email === undefined || email === "") {
    errors.email = "the email is a required field";
  }
  else if (validateEmail(email) === false) {
    errors.email = "the email is invalid";
  }
  if (password === null || password === undefined || password === "") {
    errors.password = "the password is a required field"
  }
  if (errors.email + errors.password !== "") {
    return { isValid: false, errors };
  }
  return { isValid: true, errors };
}

app.post("/signin", (req, res) => {
  let { email, password } = req.body;
  console.log(`${email} is trying to sign in`);
  let { isValid, errors } = validateSignIn(email, password);
  if (isValid === false) {
    res.json({ login: false, errors })
  } else {
    db.query(`SELECT * FROM unconfirmed_users WHERE email="${email}"`, (err, array) => {
      if (err) throw err;
      else if (array.length !== 0) {
        errors.password = "Your email has to be confirmed";
        res.json({ login: false, errors });
      } else {
        db.query(`SELECT * FROM users WHERE email="${email}"`, (err, array) => {
          if (err) throw err;
          else if (array.length === 0) {
            errors.password = "the email or password is wrong";
            res.json({ login: false, errors });
          } else {
            // check if the password is correct
            bcrypt.compare(password, array[0].password, (err, isCorrect) => {
              if (err) throw err;
              else if (isCorrect === false) {
                errors.password = "the email or password is wrong";
                res.json({ login: false, errors })
              } else {
                res.json({ login: true, token: "12345", errors });
              }

            })
          }

        })
      }
    })
  }
})


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


app.listen(3333, () => console.log("express API running on port 3333"))

