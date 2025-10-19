const db = require('../../db/connection');
//const db = require('../config/db');


// Get all bookings
exports.getBookings = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM bookings');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a booking
exports.createBooking = async (req, res) => {
  const { ride_id, passenger_id, seats_reserved } = req.body;
  if (!ride_id || !passenger_id)
    return res.status(400).json({ error: 'Missing required fields' });

  try {
    const [result] = await db.query(
      'INSERT INTO bookings (ride_id, passenger_id, seats_reserved) VALUES (?, ?, ?)',
      [ride_id, passenger_id, seats_reserved || 1]
    );
    res.status(201).json({ message: 'Booking created', booking_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update booking
exports.updateBooking = async (req, res) => {
  const bookingId = req.params.id;
  const { seats_reserved } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE bookings SET seats_reserved = ? WHERE booking_id = ?',
      [seats_reserved, bookingId]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Booking not found' });
    res.json({ message: 'Booking updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete booking
exports.deleteBooking = async (req, res) => {
  const bookingId = req.params.id;
  try {
    const [result] = await db.query('DELETE FROM bookings WHERE booking_id = ?', [bookingId]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Booking not found' });
    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
