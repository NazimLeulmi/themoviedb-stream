const express = require('express');
const path = require('path');
const logger = require('morgan');
const helmet = require('helmet')
const cors = require('cors');
const bcrypt = require('bcryptjs');
const validateSignIn = require("./validation").validateSignIn;
const validateSignUp = require("./validation").validateSignUp;
const signUp = require("./signUp");
const confirmation = require("./confirmation");




// Initialize express 
const app = express();
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
   } else {
      // Query the database
      signUp(email, password)
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

   }
})

app.post('/confirm', function (req, res) {
   const { token } = req.body;
   console.log(`confirming ${token}`);
   confirmation(token)
      .then(confirmed => res.json({ confirmed }))
      .catch(error => res.json({ confirmed: false, error }))
})


app.post("/signin", (req, res) => {
   const { email, password } = req.body;
   console.log(`${email} is trying to sign in`);
   const { isValid, errors } = validateSignIn(email, password);
   if (isValid === false) {
      res.json({ login: false, errors })
   } else {
      connection.query(`SELECT * FROM unconfirmed_users WHERE email="${email}"`, (err, array) => {
         if (err) throw err;
         else if (array.length !== 0) {
            errors.password = "Your email has to be confirmed";
            res.json({ login: false, errors });
         } else {
            connection.query(`SELECT * FROM users WHERE email="${email}"`, (err, array) => {
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

