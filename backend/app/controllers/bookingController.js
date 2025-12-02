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

// Getting the User-Specfic Bookings [Split as User is Driver | User is Passenger]
exports.getUserBookings = async (req, res) => {
  const userId = req.query.userId;
  if (!userId){
    return res.status(400).json({error: "Missing userId"});
  }

try {
    // Bookings where the user is a driver
    const [driverRows] = await db.query(
      `SELECT B.booking_id, B.ride_id, B.passenger_id, B.seats_reserved, 
        CONCAT(U.first_name, ' ', U.last_name) AS passenger_name
      FROM BOOKINGS B
      JOIN USERS U ON B.passenger_id = U.user_id
      JOIN RIDES R ON B.ride_id = R.ride_id
      WHERE R.driver_id = ?`,
      [userId]
    );

    // Bookings where the user is a passenger
    const [passengerRows] = await db.query(
      `SELECT B.booking_id, B.ride_id, B.passenger_id, B.seats_reserved, 
        CONCAT(U.first_name, ' ', U.last_name) AS driver_name
      FROM BOOKINGS B
      JOIN USERS U ON B.passenger_id = U.user_id
      JOIN RIDES R ON B.ride_id = R.ride_id
      WHERE B.passenger_id = ?`,
      [userId]
    );

    res.json({driverBookings: driverRows, passengerBookings: passengerRows});
  }
  catch (err){
    console.error('getUserBookings error:', err);
    res.status(500).json({error: 'Backend server error.'});
  }
};