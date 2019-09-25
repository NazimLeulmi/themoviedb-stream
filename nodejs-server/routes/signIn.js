const express = require("express");
const router = express.Router();
const compare = require("bcryptjs").compare;
const validate = require("../validation");
const getUserByEmail = require("./queries").getUserByEmail;
const updateFirstLogin = require("./queries").updateFirstLogin;


router.post("/", async (req, res) => {
   // Destructuring the data object
   console.log(req.body)
   const { email, password } = req.body;
   // Initial error 
   let error = "the email or password is invalid";
   console.log(`${email} is trying to sign in`);
   // Form Input Validation
   const { isValid, errors } = validate(email, password, null);
   if (isValid === false) {
      return res.json({ auth: isValid, errors });
   }
   // Query Mysql database to get a user by email
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
   // Set Session 
   req.session.user = user.email;
   // Check if its a first login to display the pricing page
   let firstLogin = false;

   if (user.first_login === 1) {
      firstLogin = true;
      // Change first_login status in the database
      console.log("First Login")
      await updateFirstLogin(user.email);
   }
   const data = {
      firstLogin, errors,
      email: user.email,
      plan: user.plan,
      auth: true
   }
   console.log(req.session, "SIGNED IN");
   return res.json(data);
})

router.post("/signOut", async (req, res) => {
   const { token } = req.body;
   console.log(`${token} SIGNED OUT`);
   res.json({ out: deleted });
})


// Keep the user loged in if the session didnt expire
router.get("/verify", async (req, res) => {
   console.log(req.session);
   return res.json(req.session);
   // return res.json({ auth: req.session.userId ? true : false });
})

router.get("/", (req, res) => {
   res.json({ signIn: "root" });
})


module.exports = router;