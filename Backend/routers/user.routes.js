const express = require('express');
const router = express.Router();
const userController = require("../controllers/user.controller");
const { body } = require('express-validator');




router.post('/register',[
    body('email').isEmail().withMessage('invalid Email'),
    body('fullname.firsname').isLength({min : 3}).withMessage('first name at least 3 charcters'),
    body('password').isLength({min: 6}).withMessage('password at least 6 character'),
], userController.registerUser);



router.post('/login', [
    body('email').isEmail().withMessage('Invalid Enail'),
    body('password').isLength({min: 6}).withMessage('password at least 6 character'),
], userController.loginUser);




module.exports = router;