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

//Get Logged-In User
exports.getCurrentUser = async (req, res) => {
  const userId = req.user.userId;
  if (!userId){
    return res.status(400).json({error: "Missing userId"});
  }
  try {
    const [rows] = await db.query(
      `SELECT user_id, first_name, last_name, email, phone, payment_link, rating
       FROM USERS
       WHERE user_id = ?`,
      [userId]
    );

    if (rows.length===0){
      return res.status(404).json({error: "getUserById: ID not found"});
    }

    res.json(rows[0]);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Update User
exports.updateUser = async (req, res) => {
  const { first_name, last_name, phone, payment_link } = req.body;
  const userId = req.user.user_id;

  if (!user_id || !last_name || !first_name)
    return res.status(400).json({ error: 'Missing required fields' });

  try {
    const [result] = await db.query(
      `UPDATE Users
      SET first_name = ?, last_name = ?, phone = ?, payment_link = ?
      WHERE user_id = ?`,
      [first_name, last_name, phone || null, payment_link || null, userId]
    );

    if (result.affectedRows === 0){
      return res.status(404).json({error: "updateUser: User not found"});
    }

    res.json({message: "User updated success"});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}