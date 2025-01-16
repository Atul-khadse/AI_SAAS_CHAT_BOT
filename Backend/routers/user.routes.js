const express = require('express');
const router = express.Router();
const userController = require("../controllers/user.controller");
const { body } = require('express-validator');

router.post('/register', [
    body('email').isEmail().withMessage('invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('first name at least 3 characters'),
    body('password').isLength({ min: 6 }).withMessage('password at least 6 characters'),
], userController.registerUser);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('password at least 6 characters'),
], userController.loginUser);

module.exports = router;