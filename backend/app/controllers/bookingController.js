const db = require('../../db/connection');
//const db = require('../config/db');


// get  all bookings
exports.getBookings = (req, res) => {
  db.query('SELECT * FROM bookings', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// createa  booking
exports.createBooking = (req, res) => {
  const { ride_id, passenger_id, seats_reserved } = req.body;
  if (!ride_id || !passenger_id)
    return res.status(400).json({ error: 'Missing required fields' });

  const query = `
    INSERT INTO bookings (ride_id, passenger_id, seats_reserved)
    VALUES (?, ?, ?)
  `;
  db.query(query, [ride_id, passenger_id, seats_reserved || 1], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Booking created', booking_id: result.insertId });
  });
};

// update booking i.e change number of seats)
exports.updateBooking = (req, res) => {
  const bookingId = req.params.id;
  const { seats_reserved } = req.body;

  const query = `
    UPDATE bookings SET seats_reserved = ?
    WHERE booking_id = ?
  `;
  db.query(query, [seats_reserved, bookingId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Booking not found' });
    res.json({ message: 'Booking updated successfully' });
  });
};

// delete booking
exports.deleteBooking = (req, res) => {
  const bookingId = req.params.id;
  db.query('DELETE FROM bookings WHERE booking_id = ?', [bookingId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Booking not found' });
    res.json({ message: 'Booking deleted successfully' });
  });
};
