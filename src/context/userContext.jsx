import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { AppRoutes } from '../constant/AppRoutes';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = Cookies.get('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing user cookie:", error);
        Cookies.remove('user'); 
      }}
  }, []);
  

  const login = (userData) => {
    setUser(userData);
    Cookies.set('user', JSON.stringify(userData), { expires: 7 }); 
  };


  const logout = () => {
    setUser(null);
    Cookies.remove('user');
  };

  const getUserInfo = (token) => {
    axios
      .get(AppRoutes.login, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res?.data?.data);
        login(res?.data?.data);
      })
      .catch((err) => console.log(err));
  };

  

  return (
    <UserContext.Provider value={{ user, login, logout ,getUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};






