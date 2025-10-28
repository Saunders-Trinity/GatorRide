//how to connect the front end to the backend
// const mysql = require('mysql2');
// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT
// });

// connection.connect((err) => {
//   if (err) {
//     console.error('Database connection failed:', err.stack);
//     return;
//   }
//   console.log(' Connected to MySQL database');
// });

// module.exports = connection;

//use promise version
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

console.log("connection test working");
console.log('DB_USER: ', process.env.DB_USER);

const db = mysql.createPool({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME, 
  port: process.env.DB_PORT,
  ssl:{
    rejectUnauthorized: true,
    ca: fs.readFileSync(path.join(__dirname, './ca.pem')).toString(),
  },
});

module.exports = db;