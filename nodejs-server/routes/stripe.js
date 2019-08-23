const express = require("express");
const router = express.Router();
const stripe = require("stripe")("sk_test_MMRqdHPh2Ics5H6bljTWES9t00fPiRBW3u");
const getSession = require("./queries").getSession;

const basicPlan = "plan_Fehv82dSyI23UT";
const premiumPlan = "plan_Feht9aLk03zsX9";

router.post("/", async (req, res) => {
  // Destructuring the data object
  const { exp_year, exp_month, name, authToken, plan } = req.body;
  console.log(req.body);
  // Check if the user is authorized to access this route
  const session = await getSession(authToken);
  if (session === null || session === undefined) {
    return res.json({ error: "unauthorized user" });
  } else {
    console.log(session);
  }
  if (name === null || name === "" || name === undefined) {
    return res.json({ error: "the name is a required field" });
  }
  // Create a stripe token to access stripe's API
  stripe.tokens.create(
    {
      card: {
        number: "4242424242424242",
        exp_month: parseInt(exp_month),
        exp_year: parseInt(exp_year),
        cvc: 255
      }
    },
    function(err, token) {
      if (err) return res.json({ stripeTokenError: err });
      else {
        // Create a customer associated with this his credit card
        stripe.customers.create(
          {
            description: `${name} themoviedb subscriber`,
            source: token.id // obtained with Stripe.js
          },
          function(err, customer) {
            if (err) return res.json({ error: "Failed to create customer" });
            console.log("customer", customer);
            stripe.subscriptions.create(
              {
                customer: customer.id,
                items: [
                  {
                    plan: premiumPlan
                  }
                ]
              },
              function(err, subscription) {
                if (err) {
                  console.log(err);
                  return;
                }
                res.json(subscription);
              }
            );
          }
        );
      }
    }
  );
});

module.exports = router;
