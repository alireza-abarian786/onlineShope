const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRole');

router.get('/users', authMiddleware, checkRole('admin'), getAllUsers);

module.exports = router;
