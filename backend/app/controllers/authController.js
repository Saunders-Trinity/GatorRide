const db = require('../../db/connection');
const bcrypt = require('bcrypt');
//const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User signup, only ufl students
exports.register = async (req, res) => {
  try {
    //  include payment_link from the body
    const { first_name, last_name, email, password, phone, payment_link } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!email.endsWith('@ufl.edu')) {
      return res.status(400).json({ error: 'Only @ufl.edu emails are allowed' });
    }

    //duplicate check to return 409 instead of 500
    const [dupe] = await db.query('SELECT user_id FROM users WHERE email = ?', [email]);
    if (dupe.length) return res.status(409).json({ error: 'Email already registered' });

    //  hash -> password_hash (use the same name you insert)
    const password_hash = await bcrypt.hash(password, 10);

    //  insert correct columns in correct order
    const [result] = await db.query(
      `INSERT INTO users
       (first_name, last_name, email, phone, payment_link, password_hash)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [first_name, last_name, email, phone || null, payment_link || null, password_hash]
    );

    return res.status(201).json({ message: 'User registered successfully', user_id: result.insertId });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email already registered' });
    }
    console.error('REGISTER error:', err);
    return res.status(500).json({ error: 'Failed to register user' });
  }
};


// User login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    // pull only what we need, including the hashed password and role
    const [rows] = await db.query(
      "SELECT user_id, email, role, password_hash FROM users WHERE email = ?",
      [email]
    );
    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // sign JWT with user_id and role
    const token = jwt.sign(
      { user_id: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({ token, role: user.role, user_id: user.user_id });
  } catch (err) {
    console.error("LOGIN error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

