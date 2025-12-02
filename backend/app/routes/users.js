//routes for adding users
const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, getCurrentUser, updateUser } = require('../controllers/userController');

router.get('/', getAllUsers);
router.post('/', createUser);

router.get('/profile', getCurrentUser);
router.put('/profile', updateUser);

module.exports = router;


