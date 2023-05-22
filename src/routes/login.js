const express = require('express');
const router = express.Router();
const LoginController = require('../app/controllers/LoginController');

// Đăng nhập
router.get('/login-screen', LoginController.loginScreen);
router.post('/login-check', LoginController.loginCheck);
router.get('/register-screen', LoginController.registerScreen);
router.post('/register-check', LoginController.registerUser);

module.exports = router;
