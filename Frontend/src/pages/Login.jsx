import React, { useState, useContext } from 'react';
import { UserDataContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/users/login`, userData);

      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);

        navigate('/chat');
      }
    } catch (error) {
      console.error('Error during login:', error.response.data);
    }

    setEmail('');
    setPassword('');
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="w-full max-w-md p-8 m-4 space-y-6 bg-slate-800 text-white rounded-xl bg-opacity-5 shadow-2xl">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email 
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 mt-1 border text-black rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 mt-1 text-black border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Login
            </button>
            <p className="text-center">New here? <Link to='/signup' className="text-blue-600">Create new Account</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
