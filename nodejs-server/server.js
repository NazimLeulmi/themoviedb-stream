let express = require('express');
let path = require('path');
let logger = require('morgan');
let helmet = require('helmet')
let cors = require('cors');
let mysql = require('mysql');
let bcrypt = require('bcryptjs');
let randomBytes = require('crypto').randomBytes;
let validateSignIn = require("./validation").validateSignIn;
let validateSignUp = require("./validation").validateSignUp;
let confirmationEmail = require("./email");



// mysql config
let db = mysql.createConnection({
  host: "localhost",
  user: "ry",
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
                    // send a confirmation email to activate the account
                    confirmationEmail(token, email).then(() => {
                      res.json({ registered: true, errors })
                    }).catch(() => {
                      res.json({ registered: false, errors })
                    })
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




app.listen(3333, () => console.log("express API running on port 3333"))

