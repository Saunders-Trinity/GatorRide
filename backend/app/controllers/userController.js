const db = require('../../db/connection');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new user
exports.createUser = async (req, res) => {
  const { first_name, last_name, email, phone } = req.body;
  if (!first_name || !last_name || !email)
    return res.status(400).json({ error: 'Missing required fields' });

  try {
    const [result] = await db.query(
      'INSERT INTO users (first_name, last_name, email, phone) VALUES (?, ?, ?, ?)',
      [first_name, last_name, email, phone]
    );
    res.status(201).json({
      user_id: result.insertId,
      message: 'User created successfully',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getCurrentUser = async (req, res) => {
  const userId = req.query.userId; // <-- FIX HERE

  if (!userId) {
    return res.status(400).json({ error: "Missing userId" });
  }

  try {
    const [rows] = await db.query(
      `SELECT user_id, first_name, last_name, email, phone, payment_link, rating
       FROM users
       WHERE user_id = ?`,
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateUser = async (req, res) => {
  const { first_name, last_name, phone, payment_link, password } = req.body;
  
  const userId = req.query.userId;   // <-- FIXED: Now reading userId correctly

  if (!userId || !first_name || !last_name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    let updateQuery = `
      UPDATE users 
      SET first_name = ?, last_name = ?, phone = ?, payment_link = ?
      WHERE user_id = ?
    `;
    let params = [first_name, last_name, phone || null, payment_link || null, userId];

    // If updating password
    if (password && password.length > 0) {
      updateQuery = `
        UPDATE users 
        SET first_name = ?, last_name = ?, phone = ?, payment_link = ?, password = ?
        WHERE user_id = ?
      `;
      params = [first_name, last_name, phone || null, payment_link || null, password, userId];
    }

    const [result] = await db.query(updateQuery, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ message: "User updated successfully" });

  } catch (err) {
    console.error("updateUser error:", err);
    return res.status(500).json({ error: err.message });
  }
};


