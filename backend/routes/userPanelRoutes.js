const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/userPanelController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/me', protect, getProfile);
router.put('/me', protect, updateProfile);

module.exports = router;
