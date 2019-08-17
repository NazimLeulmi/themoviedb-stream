const express = require("express");
const router = express.Router();
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");


router.post("/", async (req, res) => {
  // Destructuring the data object
  const { exp_year, exp_month, name,authToken } = req.body;
  // Check if the user is authorized to access this route
  const session = await getSession(authToken);
  if (session === null || session === undefined) {
    res.json({ error: "unauthorized user" });
  }else{
    console.log(session);
  }
  console.log(`user is trying to sign in`);
  if (name === null || name === "" || name === undefined) {
    return res.json({ error: "the name is a required field" });
  }
  stripe.tokens.create({
    card: {
      number: '4242424242424242',
      exp_month: parseInt(exp_month),
      exp_year: parseInt(exp_year),
      cvc:255
    }
  }, function (err, token) {
    if (err) return res.json({ error: err });
    else {
      return res.json({ token });
    }

  });
})

router.delete("/signOut", async (req, res) => {
    const { token } = req.body;
    const deleted = await deleteSession(token);
    console.log(`${token} SIGNED OUT`);
    res.json({ out: deleted });
})




module.exports = router;
