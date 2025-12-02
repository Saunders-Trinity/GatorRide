
const db = require('../../db/connection');




// Get all ratings
exports.getAllRatings = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM ratings');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch ratings' });
  }
};

// Add a new rating
exports.addRating = async (req, res) => {
  try {
    const { ride_id, reviewer_id, reviewee_id, score, comment } = req.body;
    if (!ride_id || !reviewer_id || !reviewee_id || !score)
      return res.status(400).json({ error: 'Missing required fields' });

    await db.query(
      'INSERT INTO ratings (ride_id, reviewer_id, reviewee_id, score, comment) VALUES (?, ?, ?, ?, ?)',
      [ride_id, reviewer_id, reviewee_id, score, comment || null]
    );
    res.json({ message: 'Rating added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add rating' });
  }
};

// Update a rating
exports.updateRating = async (req, res) => {
  try {
    const { id } = req.params;
    const { score, comment } = req.body;
    const [result] = await db.query(
      'UPDATE ratings SET score = ?, comment = ? WHERE rating_id = ?',
      [score, comment, id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'Rating not found' });
    res.json({ message: 'Rating updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update rating' });
  }
};

// Delete a rating
exports.deleteRating = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query('DELETE FROM ratings WHERE rating_id = ?', [id]);
    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'Rating not found' });
    res.json({ message: 'Rating deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete rating' });
  }
};
