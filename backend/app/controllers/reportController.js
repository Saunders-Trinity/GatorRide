const db = require('../../db/connection');


// Get all reports
exports.getAllReports = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM reports');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching reports:', err);
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
};

// Add a new report
exports.addReport = async (req, res) => {
  const { user_id, ride_id, reason } = req.body;
  try {
    await db.query(
      'INSERT INTO reports (user_id, ride_id, reason, created_at) VALUES (?, ?, ?, NOW())',
      [user_id, ride_id, reason]
    );
    res.status(201).json({ message: 'Report added successfully' });
  } catch (err) {
    console.error('Error adding report:', err);
    res.status(500).json({ error: 'Failed to add report' });
  }
};

// Delete a report
exports.deleteReport = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM reports WHERE id = ?', [id]);
    res.json({ message: 'Report deleted successfully' });
  } catch (err) {
    console.error('Error deleting report:', err);
    res.status(500).json({ error: 'Failed to delete report' });
  }
};
