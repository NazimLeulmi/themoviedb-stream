const express = require('express');
const path = require('path');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session);

const options = {
  host: 'localhost',
  port: 3306,
  user: 'tux',
  password: '11223344',
  database: 'tmdbsessions'
};

const sessionStore = new MySQLStore(options);

// Initialize express 
const app = express();
app.use(helmet()); // security layer
app.use(session({
  key: "sid",
  secret: "keyboard cat",
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: false,
    secure: false,
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: false
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


