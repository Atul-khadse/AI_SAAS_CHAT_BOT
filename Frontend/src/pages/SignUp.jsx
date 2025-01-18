import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/AuthContext';



const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/users/register`, newUser);

      if (response.status === 201) {
        const data = response.data;

        setUser(data.user);
        localStorage.setItem('token', data.token);

        navigate('/login');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setError(error.response.data.errors[0].msg);
      } else {
        setError('An error occurred. Please try again.');
      }
    }

    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
  }

  return (
   
    <div className="flex items-center justify-center min-h-screen text-white bg-slate-900 px-4 py-8">
       
      <div className="bg-slate-800 p-8 rounded-xl shadow-2xl bg-opacity-5 w-full max-w-md overflow-y-auto max-h-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-white">First Name</label>
            <input type="text" placeholder="Firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="w-full px-3 py-2 border bg-gray-800 placeholder-gray-500 rounded-lg" />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-white">Last Name</label>
            <input type="text" placeholder="Lastname" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="w-full px-3 py-2 bg-gray-800 placeholder-gray-500 border rounded-lg" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white">Email</label>
            <input type="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 bg-gray-800 placeholder-gray-500 border rounded-lg" />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-white">Password</label>
            <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 bg-gray-800 placeholder-gray-500 border rounded-lg" />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-500">Sign Up</button>
          <p className="text-center">Already have a account? <Link to='/login' className="text-blue-500">Login</Link></p>
        </form>
      </div>
    </div>
  )
}

export default SignUp;
