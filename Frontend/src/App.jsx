import React from "react";
import { Route , Routes} from 'react-router-dom';
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Login from "./pages/Login";

import SignUp from "./pages/SignUp";

import Start from "./pages/Start";


function App() {
  return (
    <div>
     {/* <Header /> */}
      <Routes>
      <Route path='/' element={<Start/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/chat' element={<Chat/>} />
       
      </Routes>
    </div>
  )
}

export default App
