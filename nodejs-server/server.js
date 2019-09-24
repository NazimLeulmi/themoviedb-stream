const express = require('express');
const path = require('path');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session')
const bodyParser = require('body-parser');

// Initialize express 
const app = express();
app.use(helmet()); // security layer
app.use(session({
   name: "sid",
   secret: "keyboard cat",
   resave: false,
   saveUninitialized: false,
   cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24
   },
}))
app.use(cors()); // cross-origin requests
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// Express Router to seperate the server into multiple files
app.use(require("./routes"));



app.get("/", (req, res) => {
   return res.json({ root: "success" });
})











app.listen(3333, () => console.log("express API running on port 3333"))


