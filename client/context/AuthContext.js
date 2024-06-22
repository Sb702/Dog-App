// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ username: 'sam', password: '' });


  const registerUser = (username, password) => {
    setUser({ username, password });
    setIsLoggedIn(true);
  }

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    registerUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};