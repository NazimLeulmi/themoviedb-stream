// Sign up / register functions & queries
const confirmationEmail = require("../email");
const genSalt = require("bcryptjs").genSalt;
const hash = require("bcryptjs").hash;
const express = require("express");
const router = express.Router();
const randomBytes = require('crypto').randomBytes;
const compare = require("bcryptjs").compare;
const validate = require("../../react-frontend/src/functions/validation");
const getUserByEmail = require("./queries").getUserByEmail;
const insertUser = require("./queries").insertUser;
const confirmUser = require("./queries").confirmUser;



router.post("/", async (req, res) => {
   // Destructuring the data object
   const { email, password, passwordc } = req.body;
   console.log(email, password, passwordc);
   let error = "the email or password is invalid";
   console.log(`user is trying to sign in`);
   const { isValid, errors } = validate(email, password, passwordc);
   if (isValid === false) {
      return res.json({ auth: isValid, errors });
   }
   // Query database to get a user by email
   const user = await getUserByEmail(email);
   console.log("response:", user);
   // check if the email needs to be confirmed 
   if (user !== null && user !== undefined && user.confirmed === 0) {
      console.log("you need to confirm");
      errors.email = "you need to confirm your email";
      return res.json({ errors, auth: false });
   }
   // Check if th email belongs to another user
   if (user !== null && user !== undefined) {
      console.log("email has been taken");
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
   const inserted = await insertUser(email, hashed, token);
   confirmationEmail(token, email);
   return res.json({ errors, auth: inserted })
})


router.post("/confirm", async (req, res) => {
   // Destructuring the data object
   const { token } = req.body;
   console.log(`confirming ${token}`)
   const confirmed = await confirmUser(token);
   res.json({ confirmed });
})


module.exports = router;