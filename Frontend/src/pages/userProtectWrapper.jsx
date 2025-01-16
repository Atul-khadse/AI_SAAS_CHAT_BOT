import React,{Children, useContext,useEffect, useState} from 'react'
import { UserDataContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { use } from 'react';

const userProtectWrapper = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [ user, setUser] = useContext(UserDataContext);
    const [ isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(!token){
            navigate('/login');
        }

        if(isLoading){
            return(
                <div>
                    loading...
                </div>
            )
        }
    })

  return (
    <div>
      {Children}
    </div>
  )
}

export default userProtectWrapper;
