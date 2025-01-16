import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/AuthContext';

const Chat = () => {
  const { user } = useContext(UserDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div>
      <h1>Chat</h1>
      {/* ...other content... */}
    </div>
  );
}

export default Chat;
