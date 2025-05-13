const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/adminController');
const { protect } = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRole');

router.get('/users', protect, checkRole('admin'), getAllUsers);

module.exports = router;
