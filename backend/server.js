const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is working!');
});


// Import routes
const userRoutes = require('./app/routes/users');
const rideRoutes = require('./app/routes/rides');
const bookingRoutes = require('./app/routes/bookings');
const ratingRoutes = require('./app/routes/ratings');
const reportRoutes = require('./app/routes/reports');


// Use routes
app.use('/api/users', userRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/reports', reportRoutes);


//for connection to make sure users are ufl students
const authRoutes = require('./app/routes/authRoutes');
console.log('Auth routes:', authRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
