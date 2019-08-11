const express = require("express");
const router = express.Router();
const randomBytes = require('crypto').randomBytes;
const compare = require("bcryptjs").compare;
const validate = require("../../react-frontend/src/functions/validation");
const getUserByEmail = require("./queries").getUserByEmail;
const insertSession = require("./queries").insertSession;
const deleteSession = require("./queries").deleteSession;
const getSession = require("./queries").getSession;


router.post("/", async (req, res) => {
   // Destructuring the data object
   const { email, password } = req.body;
   let error = "the email or password is invalid";
   console.log(`user is trying to sign in`);
   // Form Input Validation
   const { isValid, errors } = validate(email, password, null);
   if (isValid === false) {
      return res.json({ auth: isValid, errors });
   }
   // Query database to get a user by email
   const user = await getUserByEmail(email);
   // check if the user doesn't exist
   if (user === null || user === undefined) {
      errors.password = error;
      return res.json({ auth: false, errors });
   }
   // check if the password is valid 
   const isValidPass = await compare(password, user.password);
   if (isValidPass === false) {
      errors.password = error;
      return res.json({ auth: false, errors });
   }
   // check if the email needs to be confirmed
   if (user.confirmed === 0) {
      errors.email = "you need to verify your email address";
      return res.json({ auth: false, errors });
   }
   // generate a session token
   const token = await randomBytes(32).toString("hex");
   // create a new database entry
   const inserted = await insertSession(token, email);
   console.log(`${user.email} SIGNED IN`);
   return res.json({ auth: inserted, token, errors });

})

router.delete("/signOut", async (req, res) => {
   const { token } = req.body;
   const deleted = await deleteSession(token);
   console.log(`${token} SIGNED OUT`);
   res.json({ out: deleted });
})


// Auto Login if the client has a valid authentication token
router.post("/verify", async (req, res) => {
   const { token } = req.body;
   const session = await getSession(token);
   if (session === null || session === undefined) {
      res.json({ auth: false });
   }

   res.json({ auth: true });

})

router.get("/", (req, res) => {
   res.json({ signIn: "root" });
})


module.exports = router;