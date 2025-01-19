const express = require("express");
const app = express();
const connectToDb = require('./db/db');
const userRouters = require('./routers/user.routes');
const chatRouters = require('./routers/chat.routes');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

connectToDb();

const allowedOrigins = [
  'https://ai-saas-chat-bot-backend.onrender.com',
  'https://ai-saas-chat-bot-frontend.onrender.com',
  'http://localhost:5173'
]; 

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Access-Control-Allow-Origin']
}));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("hello jee")
});

app.use('/api/users', userRouters); // Ensure this line is correct
app.use('/api/chats', chatRouters);

module.exports = app;