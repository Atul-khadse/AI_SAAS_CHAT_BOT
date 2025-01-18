const express = require('express');
const router = express.Router();
const userController = require("../controllers/user.controller");
const { body } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', [
  body('email').isEmail().withMessage('Invalid Email'),
  body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], userController.registerUser);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min: 6}).withMessage('password at least 6 character'),
], userController.loginUser);

router.post('/logout', authMiddleware, userController.logout);

module.exports = router;