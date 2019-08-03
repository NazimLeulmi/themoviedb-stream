const express = require('express');
const path = require('path');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const validateAuthInputs = require("../react-frontend/src/functions/validation");
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
   return res.json({ root: "success" });
})

// Signing up / Registeration request
app.post("/signup", (req, res) => {
   const { email, password, passwordc } = req.body;
   console.log(`${email} is trying to sign up`);
   // Server side form inputs validation
   const { isValid, errors } = validateAuthInputs(email, password, passwordc);
   if (isValid === false) {
      return res.json({ registered: false, errors });
   }
   // Query the database
   signUp(email, password, connection)
      .then(data => {
         if (data.error) {
            errors.email = data.error;
         }
         return res.json({ auth: data.registered, errors })
      })
      .catch(err => {
         console.log(err);
         return res.json({ auth: false, errors });
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
   const { isValid, errors } = validateAuthInputs(email, password, null);
   if (isValid === false) {
      return res.json({ auth: false, errors })
   }
   signIn(email, password, connection)
      .then(data => {
         if (data.error && data.authenticated === false) {
            errors.password = data.error;
            return res.json({ auth: false, errors });
         }
         return res.json({ auth: true, token: data.token, errors });
      })
      .catch(err => res.json({ err }))
})

// Auto Login if the client has a valid authentication token
app.post("/verify", async (req, res) => {
   const { token } = req.body;
   const sql = `SELECT * FROM sessions WHERE token="${token}"`;
   const [sessions, fields] = await connection.query(sql);
   if (sessions.length === 0) {
      return res.json({ auth: false })
   }
   return res.json({ auth: true })
})





app.listen(3333, () => console.log("express API running on port 3333"))

