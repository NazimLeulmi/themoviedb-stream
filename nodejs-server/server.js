const express = require('express');
const path = require('path');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const validateSignIn = require("../react-frontend/src/functions/validation").validateSignIn;
const validateSignUp = require("../react-frontend/src/functions/validation").validateSignUp;
const signUp = require("./signUp");
const signIn = require("./signIn");
const confirmation = require("./confirmation");
const db = require("./database");



// Initialize express 
const app = express();
let connection = null;
// database connection
db().then(pool => {
   connection = pool;
   console.log("MySQL connection has been established");
}).catch(err => res.json(err))

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
   const { email, password, passwordc } = req.body;
   console.log(`${email} is trying to sign up`);
   // Server side form inputs validation
   const { isValid, errors } = validateSignUp(email, password, passwordc);
   if (isValid === false) {
      res.json({ registered: false, errors });
   }
   // Query the database
   signUp(email, password, connection)
      .then(data => {
         if (data.error) {
            errors.email = data.error;
         }
         res.json({ registered: data.registered, errors })
      })
      .catch(err => {
         console.log(err);
         res.json({ registered: false, errors });
      })
})

app.post('/confirm', function (req, res) {
   const { token } = req.body;
   console.log(`confirming ${token}`);
   confirmation(token, connection)
      .then(confirmed => res.json({ confirmed }))
      .catch(error => res.json({ confirmed: false, error }))
})


app.post("/signin", (req, res) => {
   const { email, password } = req.body;
   console.log(`${email} is trying to sign in`);
   const { isValid, errors } = validateSignIn(email, password);
   if (isValid === false) {
      res.json({ auth: false, errors })
   }
   signIn(email, password, connection)
      .then(data => {
         if (data.error && data.authenticated === false) {
            errors.password = data.error;
            res.json({ auth: false, errors });
         }
         res.json({ auth: true, token: data.token, errors });
      })
      .catch(err => res.json({ err }))
})




app.listen(3333, () => console.log("express API running on port 3333"))

