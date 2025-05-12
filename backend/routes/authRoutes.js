const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;


// authRoutes.js

// const express = require('express');
// const router = express.Router();

// // اضافه کردن روت تست برای بررسی اتصال سرور
// router.get('/test', (req, res) => {
//   res.status(200).send("Server is running!");
// });

// // باقی روت‌ها
// // router.post('/register', registerUser);

// module.exports = router;
