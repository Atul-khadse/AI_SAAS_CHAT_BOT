const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/new', authMiddleware, chatController.createChat);

module.exports = router;