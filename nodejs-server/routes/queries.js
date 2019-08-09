const db = require("../database");
module.exports = {
   getUsersByEmail: (email) => {
      let sql = `SELECT * FROM users where email="${email}"`;
      return db.query(sql, (err, users) => {
         if (err) throw err;
      });
   },
   insertSession: (token, email) => {
      let sql = `INSERT INTO sessions(email,token)VALUES("${email}","${token}")`;
      return db.query(sql, (err, response) => {
         if (err) throw err;
      });
   },
   insertUser: (email, password, token) => {
      let sql = `INSERT INTO users(email,password,token)
      VALUES("${email}","${password}","${token}")`;
      return db.query(sql, (err, response) => {
         if (err) throw err;
      });
   }
}