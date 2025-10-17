//const db = require(".. /../config/db");
const db = require('../../db/connection'); //trying this one
//const db = require('../config/db');//doesnt seem to work?


// Get all ratings
exports.getAllRatings = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM ratings");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch ratings" });
  }
};

// Add a new rating
exports.addRating = async (req, res) => {
  try {
    const { user_id, ride_id, score, comment } = req.body;
    await db.query(
      "INSERT INTO ratings (user_id, ride_id, score, comment) VALUES (?, ?, ?, ?)",
      [user_id, ride_id, score, comment]
    );
    res.json({ message: "Rating added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add rating" });
  }
};

// Update a rating
exports.updateRating = async (req, res) => {
  try {
    const { id } = req.params;
    const { score, comment } = req.body;
    await db.query(
      "UPDATE ratings SET score = ?, comment = ? WHERE id = ?",
      [score, comment, id]
    );
    res.json({ message: "Rating updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update rating" });
  }
};

// Delete a rating
exports.deleteRating = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM ratings WHERE id = ?", [id]);
    res.json({ message: "Rating deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete rating" });
  }
};
