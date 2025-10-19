const express = require('express');
const router = express.Router();
const rideController = require('../controllers/rideController');

// GET all rides
router.get('/', rideController.getRides);

// POST new ride
router.post('/', rideController.createRide);

// PUT update ride
router.put('/:id', rideController.updateRide);

// DELETE ride
router.delete('/:id', rideController.deleteRide);

module.exports = router;
