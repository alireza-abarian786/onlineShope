const express = require('express');
const router = express.Router();
const {
  getPurchases,
  getPendingTasks,
  addPendingTask,
  deletePendingTask,
  getRecommendedProducts,
  getRecentActivities,
  addRecentActivity,
  deleteRecentActivity,
  getBalance,
  addBalance,
} = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');

router.get('/purchases', protect, getPurchases);
router.route('/pending-tasks')
  .get(protect, getPendingTasks)
  .post(protect, addPendingTask);
router.delete('/pending-tasks/:id', protect, deletePendingTask);
router.get('/recommended-products', protect, getRecommendedProducts);
router.route('/recent-activities')
  .get(protect, getRecentActivities)
  .post(protect, addRecentActivity);
router.delete('/recent-activities/:id', protect, deleteRecentActivity);
router.route('/balance')
  .get(protect, getBalance)
  .put(protect, addBalance);

module.exports = router;