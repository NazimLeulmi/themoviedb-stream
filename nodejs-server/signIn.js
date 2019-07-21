let randomBytes = require('crypto').randomBytes;
const mysql = require('mysql2/promise');
const compare = require("bcryptjs").compare;


let signIn = async (email, password, pool) => {
   const error = "the email or password is invalid";
   try {
      const [users, fields] = await pool.query(`SELECT * FROM users where email="${email}"`);
      // check if the user exists
      if (users.length === 0) {
         return { authenticated: false, error };
      }
      // check if the password is valid 
      const isValidPass = await compare(password, users[0].password);
      if (isValidPass === false) {
         return { authenticated: false, error };
      }
      // generate a session token
      const token = await randomBytes(32).toString("hex");
      // create a session
      const queryResponse = await pool.query(`INSERT INTO sessions 
      (email,token)
      VALUES("${email}","${token}")`)
      return { authenticated: true, token };
   }
   catch (err) {
      return { err, authenticated: false };
   }
}


module.exports = signIn;