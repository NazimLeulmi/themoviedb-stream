const db = require("../database");
module.exports = {
   getUserByEmail: async (email) => {
      let sql = `SELECT * FROM users where email="${email}"`;
      let users = await db.query(sql);
      // it should return 1 user because the email field is unique
      return users[0][0];
   },
   insertUser: async (email, password, token) => {
      let sql = `INSERT INTO users(email,password,token)
      VALUES("${email}","${password}","${token}")`;
      let response = await db.query(sql);
      if (response[0].affectedRows === 0) {
         return false
      }
      return true
   },
   confirmUser: async (token) => {
      const sql = `UPDATE users SET confirmed=1 ,token="verified"
        WHERE token="${token}"`
      let response = await db.query(sql);
      if (response[0].affectedRows === 0) {
         return false
      }
      return true;
   },
   updateFirstLogin: async (email) => {
      const sql = `UPDATE users SET first_login=0 WHERE email="${email}"`
      let response = await db.query(sql);
      if (response[0].affectedRows === 0) {
         return false
      }
      return true;
   },
}
