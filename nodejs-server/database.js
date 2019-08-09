const mysql = require('mysql');
const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'ry',
    password: '11223344',
    database: 'themoviedb'
});

connection.connect(error => {
    if (error) {
        console.log(error);
    } else {
        console.log('Connected to MySQL port 3306');
    }
});

module.exports = connection;


