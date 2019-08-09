// Sign up / register functions & queries
const confirmationEmail = require("../email");
const genSalt = require("bcryptjs").genSalt;
const hash = require("bcryptjs").hash;
const express = require("express");
const router = express.Router();
const randomBytes = require('crypto').randomBytes;
const compare = require("bcryptjs").compare;
const validate = require("../../react-frontend/src/functions/validation");
const getUsersByEmail = require("./queries").getUsersByEmail;
const insertUser = require("./queries").insertUser;



router.post("/", async (req, res) => {
   // Destructuring the data object
   const { email, password } = req.body;
   let error = "the email or password is invalid";
   console.log("valid");
   console.log(`user is trying to sign in`);
   const { isValid, errors } = validate(email, password, null);
   if (isValid === false) {
      return res.json({ auth: isValid, errors });
   }
   // Query database to get a user by email
   const response = getUsersByEmail(email);
   const users = response._results;
   console.log("Result:", users);
   // check if the email needs to be confirmed 
   if (users.length !== 0 && users[0].confirmed === 0) {
      errors.email = "you need to confirm your email";
      return res.json({ errors, auth: false });
   }
   // Check if th email belongs to another user
   if (users.length !== 0) {
      errors.email = "this email has been taken";
      return res.json({ errors, auth: false });
   }
   // generate a confirmation token
   const token = await randomBytes(32).toString("hex");
   // generate a salt to hash the password
   const salt = await genSalt(10);
   // Hash the password with the generated salt
   const hashed = await hash(password, salt);
   // Insert a new database entry
   const resp = insertUser(email, hashed, token);
   confirmationEmail(token, email);
   return res.json({ errors, auth: true })
})

module.exports = router;