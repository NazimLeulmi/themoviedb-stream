let createError = require('http-errors');
let express = require('express');
let path = require('path');
let logger = require('morgan');
let helmet = require('helmet')
let cors = require('cors');
let mysql = require('mysql');
let nodemailer = require('nodemailer');
let cfg = require('./config');



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

// Auth Form Validation functions
let validateEmail = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
let validateAuthInputs = (email, password, passwordc, isLogin) => {
  let errors = { email: "", password: "", passwordc: "" }
  if (validateEmail(email) === false) {
    errors.email = "the email is invalid";
  }
  if (password === null || password === "" || password === undefined) {
    errors.password = "the password is a required field";
  }
  if (password !== null && password.length < 8) {
    errors.password = "the password has to be at least 8 characters"
  }
  if (isLogin === false) {
    if (passwordc === null || passwordc === "" || passwordc === undefined) {
      errors.passwordc = "password confirmation is required";
    }
  }
  if (passwordc && password && password !== passwordc) {
    errors.passwordc = "the two passwords must match";
  }
  if (errors.email + errors.password + errors.passwordc !== "") {
    return { isValid: false, errors };
  }
  return { isValid: true, errors };
}

app.get("/", (req, res) => {
  res.send(`<h1>Ryan's Local Store</h1>`);
})
app.post("/signup", (req, res) => {
  let { email, password, passwordc } = req.body;
  console.log(`${email} is trying to sign up`);
  let { isValid, errors } = validateAuthInputs(email, password, passwordc, false);
  res.json({ validation: isValid, errors })

  // db.query(`SELECT * FROM unconfirmed_users WHERE email = ${req.body.email}`, (err, result) => {
  //   if (err) throw err;
  //   console.log(result);
  // })

  // create reusable transporter object using the default SMTP transport

  //   let template = `
  //   <html>
  //   <body>
  //     <div id="container">
  //       <img src="${cfg.logoUrl}" alt="logo" width="42" height="42">
  //       <h2>Account Activation</h2>
  //       <p> Please click the link bellow to activate your account </p>
  //       <a href="#"> Activition Link </a>
  //     </div>
  //   </body>
  //   </html>
  // `;

  //   let transporter = nodemailer.createTransport({
  //     host: "smtp.zoho.com",
  //     port: 587, // TLS port
  //     secure: false, // true for 465, false for other ports
  //     auth: {
  //       user: cfg.email,
  //       pass: cfg.emailPassword
  //     },
  //     tls: { rejectUnauthorized: false },
  //   });

  //   // send mail with defined transport object
  //   let info = transporter.sendMail({
  //     from: '"themoviedb-store" <nazim@ryanleulmi.com>', // sender address
  //     to: "nazim.ryan.leulmi@gmail.com,nazim@ryanleulmi.com", // list of receivers
  //     subject: "Email Verification", // Subject line
  //     html: template
  //   }).then(info => {
  //     console.log("Email has been sent from nodejs");
  //   }).catch(err => console.log(err));

})


app.post("/signin", (req, res) => {
  console.log(`${req.body.email} is trying to sign in`);
})


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


app.listen(3333, () => console.log("express API running on port 3333"))

