import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/AuthContext';
import Header from '../components/Header';

const Home = () => {
  const { user } = useContext(UserDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div>
      <Header />
      <div className="p-4">
        <h1>Welcome to the Home Page</h1>
        {/* ...other content... */}
      </div>
    </div>
  );
}

export default Home;
