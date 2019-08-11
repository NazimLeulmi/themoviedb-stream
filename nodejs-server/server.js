const express = require('express');
const path = require('path');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');


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











app.listen(3333, () => console.log("express API running on port 3333"))


