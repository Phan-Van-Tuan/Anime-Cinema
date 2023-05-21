const express = require('express');
const router = express.Router();
const LoginController = require('../app/controllers/LoginController');

// Đăng nhập
router.get('/login-screen', LoginController.loginScreen);
// router.post('/login-check', LoginController.loginCheck);

module.exports = router;
