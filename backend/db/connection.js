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
//WARNING: .env needs to be in backend, same level as the gitignore
require('dotenv').config({path: path.join(__dirname, '../.env')});

console.log('DB_USER: ', process.env.DB_USER);

//MATCH THESE .NAMES EXACTLY IN THE .ENV
const db = mysql.createPool({
  host: process.env.DB_HOST, // || 'localhost',
  user: process.env.DB_USER, // || 'root',
  password: process.env.DB_PASSWORD, // || 'root',
  database: process.env.DB_NAME, // || 'gatorride',
  port: process.env.DB_PORT,
  ssl:{
    rejectUnauthorized: true,
    ca: fs.readFileSync(path.join(__dirname, './ca.pem')).toString(),
  },
});

module.exports = db;