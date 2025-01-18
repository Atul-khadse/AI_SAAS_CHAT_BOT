const chatService = require('../services/chat.services');

module.exports.createChat = async (req, res, next) => {
    try {
        const { content, role } = req.body;
        const userId = req.user._id;

        const { userChat, aiResponse } = await chatService.createChat(userId, content, role);

        res.status(201).json({ userChat, aiResponse });
    } catch (error) {
        console.error('Error in createChat controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
