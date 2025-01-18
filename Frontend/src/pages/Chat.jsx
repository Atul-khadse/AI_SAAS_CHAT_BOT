import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/AuthContext';
import axios from 'axios';
import dayjs from 'dayjs';
import Header from '../components/Header';

const Chat = () => {
  const { user } = useContext(UserDataContext);
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const newChat = {
      content: message,
      role: 'user'
    };

    setChats(prevChats => [...prevChats, newChat]);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:4000/api/chats/new', newChat, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const { userChat, aiResponse } = response.data;
      setChats(prevChats => [...prevChats, aiResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const groupChatsByDate = (chats) => {
    return chats.reduce((acc, chat) => {
      const date = dayjs(chat.createdAt).format('YYYY-MM-DD');
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(chat);
      return acc;
    }, {});
  };

  const groupedChats = groupChatsByDate(chats);

  return (
    <div className="flex h-screen pt-20">
      <Header/>
      <div className="w-1/4 bg-gray-800 text-white p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Chats</h2>
        {Object.keys(groupedChats).map(date => (
          <div key={date} className="mb-4">
            <h3 className="text-lg font-semibold mb-2">{date}</h3>
            <ul>
              {groupedChats[date].map((chat, index) => (
                <li key={index} className="mb-2 p-2 bg-gray-700 rounded">
                  {chat.content}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="w-3/4 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto">
          {chats.map((chat, index) => (
            <div key={index} className={`mb-4 p-4 rounded ${chat.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
              {chat.content}
            </div>
          ))}
        </div>
        <div className="p-4 bg-gray-200">
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className="mt-2 p-2 bg-blue-500 text-white rounded"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
