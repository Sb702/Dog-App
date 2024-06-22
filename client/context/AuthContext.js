// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ username: 'sam', password: '' });
  const [dogs, setDogs] = useState([
    { dogName: 'Rex', dogBreed: 'German Shepherd', dogAge: 5 },
    { dogName: 'Max', dogBreed: 'Golden Retriever', dogAge: 3 },
    { dogName: 'Buddy', dogBreed: 'Labrador', dogAge: 7 },
  ]);


  const registerUser = (username, password) => {
    setUser({ username, password });
    setIsLoggedIn(true);
  }

  const addDog = (dogName, dogBreed, dogAge) => {    
    // add dog to list of dogs 
    setDogs([...dogs, { dogName, dogBreed, dogAge }]);
  }

  const addDogTricks = (dogName, tricks) => {
    // find dog in list of dogs
    const dog = dogs.find((dog) => dog.dogName === dogName);
    // add tricks to dog as an array of strings and if there are already tricks, add to them
    dog.tricks = dog.tricks ? [...dog.tricks, tricks] : [tricks];
    // update dog in list of dogs
    setDogs([...dogs]);
  }

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    registerUser,
    addDog, 
    dogs, 
    setDogs,
    addDogTricks
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};