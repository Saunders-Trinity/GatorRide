
const db = require('../../db/connection'); 

const getAllRides = async (req, res) => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM rides');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
};

module.exports = { getAllRides }; 
