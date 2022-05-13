const express = require('express');
const authController= require('../controllers/auth.controller');
const router = express.Router();
const db= require('../connection/connect');

//LOGIN MODULE
router.post('/login', authController.login);

//REGISTER MODULE
router.post('/register', authController.register);

module.exports = router;