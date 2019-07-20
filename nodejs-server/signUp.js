// Sign up / register functions & queries
let randomBytes = require('crypto').randomBytes;
const mysql = require('mysql2/promise');
const confirmationEmail = require("./email");
const genSalt = require("bcryptjs").genSalt;
const hash = require("bcryptjs").hash;


let signUp = async (email, password) => {
   try {
      let error = "";
      const pool = await mysql.createPool({
         host: 'localhost',
         user: 'ry',
         database: 'themoviedb',
         password: "11223344",
         waitForConnections: true,
         connectionLimit: 10,
         queueLimit: 0
      });
      let [users, fields] = await pool.query(`SELECT * from users where email="${email}"`);
      // check if the email isn't confirmed
      if (users.length !== 0 && users[0].confirmed === 0) {
         error = "you need to confirm your email";
         return { error, registered: false };
      }
      // check if the email has been taken
      if (users.length !== 0) {
         error = "this email has been taken";
         return { error, registered: false };
      }
      // generate a confirmation token
      const token = await randomBytes(32).toString("hex");
      // generate a salt to hash the password
      const salt = await genSalt(10);
      // Hash the password with the generated salt
      const hashed = await hash(password, salt);
      // Insert a new user in the database
      pool.query(`INSERT INTO users(email,password,token) 
      VALUES("${email}","${hashed}","${token}")`);
      // Send a confirmation email to the user
      confirmationEmail(token, email);
      return { registered: true };
   }
   catch (error) {
      console.log(error);
      return { error, registered: false };
   }
}


module.exports = signUp;