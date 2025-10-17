const db = require('../../db/connection');
//const db = require('../config/db');


//GET all rides
exports.getRides = (req, res) => {
  db.query('SELECT * FROM rides', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

//CREATE new ride
exports.createRide = (req, res) => {
  const { driver_id, origin, destination, ride_date, ride_time, available_seats, gas_cost } = req.body;
  if (!driver_id || !origin || !destination || !ride_date || !ride_time)
    return res.status(400).json({ error: 'Missing required fields' });

  const query = `
    INSERT INTO rides (driver_id, origin, destination, ride_date, ride_time, available_seats, gas_cost)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [driver_id, origin, destination, ride_date, ride_time, available_seats || 3, gas_cost || 0], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Ride created', ride_id: result.insertId });
  });
};

//UPDATE ride
exports.updateRide = (req, res) => {
  const rideId = req.params.id;
  const { origin, destination, ride_date, ride_time, available_seats, gas_cost } = req.body;

  const query = `
    UPDATE rides SET origin=?, destination=?, ride_date=?, ride_time=?, available_seats=?, gas_cost=?
    WHERE ride_id=?
  `;
  db.query(query, [origin, destination, ride_date, ride_time, available_seats, gas_cost, rideId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Ride not found' });
    res.json({ message: 'Ride updated successfully' });
  });
};

//ELETE ride
exports.deleteRide = (req, res) => {
  const rideId = req.params.id;
  db.query('DELETE FROM rides WHERE ride_id = ?', [rideId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Ride not found' });
    res.json({ message: 'Ride deleted successfully' });
  });
};
