import React, { useContext, useEffect, useState, useRef } from 'react';
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
  const messageRefs = useRef({});

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
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/chats/new` , newChat, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const { aiResponse } = response.data;
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

  const handleChatClick = (chatId) => {
    const element = messageRefs.current[chatId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
      <div className="w-1/4 bg-slate-800 shadow-2xl text-white p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Chats</h2>
        {Object.keys(groupedChats).map(date => (
          <div key={date} className="mb-4">
            <h3 className="text-lg font-mono mb-2">{date}</h3>
            <ul>
              {groupedChats[date].filter(chat => chat.role === 'user').map((chat, index) => (
                <li
                  key={index}
                  className="mb-2 p-1 bg-opacity-0 rounded cursor-pointer"
                  onClick={() => handleChatClick(chat.id)}
                >
                  {chat.content}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="w-3/4 flex flex-col bg-slate-900">
        <div className="flex-1 p-4 overflow-y-auto">
          {chats.map((chat, index) => (
            <div
              key={index}
              ref={el => (messageRefs.current[chat.id] = el)}
              className={`mb-4 p-2 rounded-2xl ${chat.role === 'user' ? 'bg-slate-600 text-white' : 'bg-opacity-0 text-white'}`}
            >
              <div className="flex ">
                {chat.role === 'user' ? (
                  <span className="mr-2 font-bold">User:</span>
                ) : (
                  <span className="mr-2 font-semibold">GPT:</span>
                )}
                <span>{chat.content.split('\n').map((line, i) => (
                  <p key={i} className="mb-1">{line}</p>
                ))}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 flex items-center justify-between bg-opacity-15 shadow-2xl bg-gray-700">
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className="m-1 p-2 bg-blue-500 text-white rounded"
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
