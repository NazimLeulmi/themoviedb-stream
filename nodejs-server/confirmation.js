
// Sign up / register functions & queries
const mysql = require('mysql2/promise');


const confirm = async (token) => {
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

        // confirm the user / email
        // SQL update query
        const response = await pool.query(`UPDATE users 
        SET confirmed=1 ,token=NULL
        WHERE token="${token}"`);
        console.log("CONFIRMATION RESPONSE QUERY:", response);
        return true;
    }
    catch (error) {
        console.log(err);
        return false;
    }
}


module.exports = confirm;