const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { getUserProfile, updateUserProfile, addToFavorites, removeFromFavorites, getFavorites } = require('../controllers/userController');
const router = express.Router();

router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.post('/favorites/add', protect, addToFavorites);
router.delete('/favorites/remove', protect, removeFromFavorites);
router.get('/favorites', protect, getFavorites);

module.exports = router;