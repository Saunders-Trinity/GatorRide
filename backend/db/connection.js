const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();


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