const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// these must point to valid functions
router.get('/', reportController.getAllReports);
router.post('/', reportController.addReport);
router.delete('/:id', reportController.deleteReport);

module.exports = router;
