import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/AuthContext';

const Start = () => {
  const { user } = useContext(UserDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div>
      <h1>Start</h1>
      {/* ...other content... */}
    </div>
  );
}

export default Start;
