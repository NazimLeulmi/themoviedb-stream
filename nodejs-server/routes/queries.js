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
      return response;
   },
   confirmUser: async (token) => {
      const sql = `UPDATE users SET confirmed=1 ,token="verified"
        WHERE token="${token}"`
      let response = await db.query(sql);
      console.log(response)
      if(response[0].affectedRows === 0){
        return false
      }
      return true;
   },
   insertSession: async (token, email) => {
      let sql = `INSERT INTO sessions(email,token)VALUES("${email}","${token}")`;
      let response = await db.query(sql);
      return true
   },
   // Delete the authentication token when signing out
   deleteSession: async (token) => {
      let sql = `DELETE FROM sessions where token="${token}"`;
      const response = await db.query(sql);
      // it should return 1 user because the email field is unique
      return true;
   },
   getSession: async (token) => {
      let sql = `SELECT * FROM sessions where token="${token}"`;
      let sessions = await db.query(sql);
      // it should return 1 user because the email field is unique
      return sessions[0][0];
   },
}
