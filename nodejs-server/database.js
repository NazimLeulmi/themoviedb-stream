const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '127.0.0.1',
    port: '3306',
    user: 'ry',
    password: '11223344',
    database: 'themoviedb'
})

module.exports = pool;




