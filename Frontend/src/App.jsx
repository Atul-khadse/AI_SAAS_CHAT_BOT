import React from "react";
import { Route , Routes} from 'react-router-dom';
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";


function App() {
  return (
    <div>
     <Header />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/Chat' element={<Chat/>} />
        <Route path='/*' element={<NotFound/>} />
      </Routes>
    </div>
  )
}

export default App
