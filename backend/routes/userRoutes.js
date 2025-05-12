// const express = require('express');
// const router = express.Router();
// const {
//   getUsers,
//   createUser,
//   loginUser,
//   updateUser,
//   deleteUser
// } = require('../controllers/userController');

// router.get('/', getUsers);
// router.post('/', createUser);
// router.post('/login', loginUser); // مسیر لاگین
// router.put('/:id', updateUser);
// router.delete('/:id', deleteUser);

// module.exports = router;


const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

module.exports = router;
