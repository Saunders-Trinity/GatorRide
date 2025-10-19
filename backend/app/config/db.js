// how to connect to sql
const mysql = require('mysql2/promise');
require('dotenv').config();

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'gatorride',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log('Connected to MySQL database');
module.exports = db;
