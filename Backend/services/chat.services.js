const userModel = require('../models/user.model');
const { randomUUID } = require('crypto');
require('dotenv').config();

const OpenAI = require('openai');

const staticChats = [
    { role: 'assistant', content: 'Hello! How can I assist you today?' },
    { role: 'assistant', content: 'Sure, I can help with that. Please provide more details.' },
    { role: 'assistant', content: 'Thank you for the information. Let me check that for you.' },
    { role: 'assistant', content: 'Here is the information you requested.' },
    { role: 'assistant', content: 'Is there anything else I can help you with?' }
];

module.exports.createChat = async (userId, content, role) => {
    try {
        console.log(`Finding user with ID: ${userId}`);
        const user = await userModel.findById(userId);

        if (!user) {
            console.error(`User not found with ID: ${userId}`);
            throw new Error('User not found');
        }

        const chat = {
            id: randomUUID(),
            content,
            role
        };

        console.log(`Adding new chat to user: ${JSON.stringify(chat)}`);
        user.chats.push(chat);

        // Send all chats with the new one to OpenAI API
        const openai = new OpenAI({
            apiKey: process.env.OPEN_AI_SECRET
        });

        console.log('Sending chats to OpenAI API');
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: user.chats.map(chat => ({
                role: chat.role,
                content: chat.content
            })),
        });

        console.log('OpenAI API response:', chatCompletion);

        if (!chatCompletion.choices || chatCompletion.choices.length === 0) {
            console.error('No response from OpenAI');
            throw new Error('No response from OpenAI');
        }

        const aiResponse = {
            id: randomUUID(),
            content: chatCompletion.choices[0].message.content,
            role: 'assistant'
        };

        console.log(`Adding AI response to user: ${JSON.stringify(aiResponse)}`);
        user.chats.push(aiResponse);
        await user.save();

        return { userChat: chat, aiResponse };
    } catch (error) {
        console.error('Error in createChat:', error);
        throw error;
    }
};
