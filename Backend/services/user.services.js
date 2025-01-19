const userModel = require('../models/user.model');

module.exports.createUser = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const user = await userModel.create({
            fullname: {
                firstname,
                lastname
            },
            email,
            password
        });

        res.setHeader('Access-Control-Allow-Origin', 'https://ai-saas-chat-bot-frontend.onrender.com');
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};