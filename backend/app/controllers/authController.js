const db = require('../../db/connection');
const bcrypt = require('bcrypt');
//const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User signup, only ufl students
exports.register = async (req, res) => {
  try {
    const { first_name, last_name, email, password, phone } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check for UF email
    if (!email.endsWith('@ufl.edu')) {
      return res.status(400).json({ error: 'Only @ufl.edu emails are allowed' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into DB
    const [result] = await db.query(
      `INSERT INTO users (first_name, last_name, email, phone, password)
       VALUES (?, ?, ?, ?, ?)`,
      [first_name, last_name, email, phone || null, hashedPassword]
    );

    res.status(201).json({ message: 'User registered successfully', user_id: result.insertId });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: 'Email already registered' });
    } else {
      //res.status(500).json({ error: 'Failed to register user' });
      console.error("Database insert failed:", err);
      res.status(500).json({ 
      error: 'Failed to register user', 
      details: err.message 
  });
    }
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: 'Missing email or password' });

    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0)
      return res.status(401).json({ error: 'Invalid credentials' });

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ error: 'Invalid credentials' });

    // Generate JWT
    const token = jwt.sign({ id: user.user_id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });

    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: 'Failed to login' });
  }
};
