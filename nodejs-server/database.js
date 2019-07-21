const mysql = require('mysql2/promise');

module.exports = async () => {
   try {
      const pool = await mysql.createPool({
         host: 'localhost',
         user: 'ry',
         database: 'themoviedb',
         password: "11223344",
         waitForConnections: true,
         connectionLimit: 10,
         queueLimit: 0
      });
      return pool;
   }
   catch (err) {
      console.log(err)
   }
}