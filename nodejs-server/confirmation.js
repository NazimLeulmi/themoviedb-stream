const confirm = async (token, pool) => {
   try {
      // confirm the user / email
      // SQL update query
      const response = await pool.query(`UPDATE users 
        SET confirmed=1 ,token="verified"
        WHERE token="${token}"`);
      console.log("CONFIRMATION RESPONSE QUERY:", response);
      if (response[0].affectedRows === 0) {
         return false;
      }
      return true;
   }
   catch (error) {
      console.log(err);
      return false;
   }
}

module.exports = confirm;