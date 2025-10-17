const db = require('../../db/connection'); 
//const db = require('../config/db');//i dont think this works?


// Get all users
const getAllUsers = (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Create new user
const createUser = (req, res) => {
  const { first_name, last_name, email, phone } = req.body;
  const sql = 'INSERT INTO users (first_name, last_name, email, phone) VALUES (?, ?, ?, ?)';
  db.query(sql, [first_name, last_name, email, phone], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ user_id: result.insertId, message: 'User created successfully' });
  });
};

module.exports = { getAllUsers, createUser };

