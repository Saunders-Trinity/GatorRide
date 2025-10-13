const express = require('express');
const router = express.Router();
const { getAllRides } = require('../controllers/rideController');

router.get('/', getAllRides);

module.exports = router;
