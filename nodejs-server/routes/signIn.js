const express = require("express");
const router = express.Router();
const randomBytes = require('crypto').randomBytes;
const compare = require("bcryptjs").compare;
const validate = require("../../react-frontend/src/functions/validation");
const getUsersByEmail = require("./queries").getUsersByEmail;
const insertSession = require("./queries").insertSession;

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
   // check if the user doesn't exist
   if (users.length === 0) {
      return res.json({ auth: false, error });
   }
   // check if the password is valid 
   const isValidPass = await compare(password, users[0].password);
   if (isValidPass === false) {
      return res.json({ auth: false, error });
   }
   // check if the email needs to be confirmed
   if (users[0].confirmed === 0) {
      error = "you need to verify your email address";
      return res.json({ auth: false, error });
   }
   // generate a session token
   const token = await randomBytes(32).toString("hex");
   // create a new database entry
   const resp = insertSession(token, email);
   console.log("SESSION INSERTION RESPONSE {:}", resp);

})

router.get("/", (req, res) => {
   res.json({ signIn: "root" });
})


module.exports = router;