const db = require('../../db/connection');

// GET all rides
exports.getRides = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM rides');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE new ride
exports.createRide = async (req, res) => {
  const { driver_id, origin, destination, ride_date, ride_time, available_seats, gas_cost } = req.body;
  if (!driver_id || !origin || !destination || !ride_date || !ride_time)
    return res.status(400).json({ error: 'Missing required fields' });

  try {
    const [result] = await db.query(
      `INSERT INTO rides (driver_id, origin, destination, ride_date, ride_time, available_seats, gas_cost)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [driver_id, origin, destination, ride_date, ride_time, available_seats || 3, gas_cost || 0]
    );
    res.status(201).json({ message: 'Ride created', ride_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE ride
exports.updateRide = async (req, res) => {
  const rideId = req.params.id;
  const { origin, destination, ride_date, ride_time, available_seats, gas_cost } = req.body;

  try {
    const [result] = await db.query(
      `UPDATE rides SET origin=?, destination=?, ride_date=?, ride_time=?, available_seats=?, gas_cost=? WHERE ride_id=?`,
      [origin, destination, ride_date, ride_time, available_seats, gas_cost, rideId]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'Ride not found' });
    res.json({ message: 'Ride updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE ride
exports.deleteRide = async (req, res) => {
  const rideId = req.params.id;
  try {
    const [result] = await db.query('DELETE FROM rides WHERE ride_id = ?', [rideId]);
    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'Ride not found' });
    res.json({ message: 'Ride deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
