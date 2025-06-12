const express = require('express');
const router = express.Router();
const {
  getPurchases,
  getPendingTasks,
  getRecommendedProducts,
  getRecentActivities,
  getBalance,
  addBalance,
} = require('../controllers/dashboardController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/purchases', protect, getPurchases);
router.get('/pending-tasks', protect, getPendingTasks);
router.get('/recommended-products', protect, getRecommendedProducts);
router.get('/recent-activities', protect, getRecentActivities);
router.get('/balance', protect, getBalance);
router.put('/balance', protect, addBalance);

module.exports = router;