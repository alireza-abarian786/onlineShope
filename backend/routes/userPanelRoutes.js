const express = require('express');
const router = express.Router();
const userPanelController = require('../controllers/userPanelController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/me', authMiddleware, userPanelController.getProfile);
router.put('/me', authMiddleware, userPanelController.updateProfile);

module.exports = router;
