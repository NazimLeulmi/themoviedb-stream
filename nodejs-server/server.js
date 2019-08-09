const express = require('express');
const path = require('path');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const validateAuthInputs = require("../react-frontend/src/functions/validation");


// Initialize express 
const app = express();
app.use(helmet()); // security layer
app.use(cors()); // cross-origin requests
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// Express Router to seperate the server into multiple files
app.use(require("./routes"));



app.get("/", (req, res) => {
   return res.json({ root: "success" });
})

// app.post('/confirm', function (req, res) {
//    const { token } = req.body;
//    console.log(`confirming ${token}`);
//    confirmation(token, connection)
//       .then(confirmed => res.json({ confirmed }))
//       .catch(error => res.json({ confirmed: false, error }))
// })



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


