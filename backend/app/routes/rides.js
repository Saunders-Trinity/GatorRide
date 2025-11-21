const express = require('express');
const router = express.Router();
const rideController = require('../controllers/rideController');

// GET all rides (search/filter)
router.get('/', rideController.getRides);

// GET one ride by ID
router.get('/:id', rideController.getRideById);

// POST new ride
router.post('/', rideController.createRide);

// PUT update ride
router.put('/:id', rideController.updateRide);

// DELETE ride
router.delete('/:id', rideController.deleteRide);

module.exports = router;
