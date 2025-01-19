# AI-SaaS Chat Bot

AI-SaaS Chat Bot is a web application that allows users to interact with an AI-powered chatbot. The chatbot can respond to user messages and provide assistance based on the input provided.


https://github.com/user-attachments/assets/91c45e32-2ce4-43d1-a889-2a97c3e2aa41

## Features

- User authentication (login and signup)
- Chat interface with message history
- AI-powered responses using OpenAI API
- Responsive design using Tailwind CSS
- Sidebar for chat history
- Logout functionality

## Technologies Used

- Frontend: React, Tailwind CSS, Axios, GSAP
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, OpenAI API

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/AI-SaaS-Chat-Bot.git
   cd AI-SaaS-Chat-Bot
   ```

2. Install dependencies for the backend:
   ```bash
   cd Backend
   npm install
   ```

3. Install dependencies for the frontend:
   ```bash
   cd ../Frontend
   npm install
   ```

4. Create a `.env` file in the `Backend` folder and add the following environment variables:
   ```properties
   PORT=4000
   DB_CONNECT="your-mongodb-connection-string"
   JWT_SECRET="your-jwt-secret"
   OPEN_AI_SECRET="your-openai-api-key"
   OPENAI_ORGANIZATION_ID="your-openai-organization-id"
   ```

## Usage

1. Start the backend server:
   ```bash
   cd Backend
   npm start
   ```

2. Start the frontend development server:
   ```bash
   cd ../Frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000` to access the application.

## Project Structure

```
AI-SaaS-Chat-Bot/
├── Backend/
│   ├── config/
│   │   └── openai.config.js
│   ├── controllers/
│   │   └── chat.controller.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   └── user.model.js
│   ├── routers/
│   │   └── chat.routes.js
│   ├── services/
│   │   └── chat.services.js
│   ├── .env
│   ├── app.js
│   └── server.js
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Header.jsx
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Chat.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── NotFound.jsx
│   │   │   ├── SignUp.jsx
│   │   │   └── Start.jsx
│   │   ├── App.jsx
│   │   └── index.js
│   ├── public/
│   └── package.json
├── README.md
└── package.json
```

## License

This project is licensed under the MIT License.
