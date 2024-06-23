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

  const updateDog = (dogName, dogBreed, dogAge, originalName) => {
    // console.log(dogName, "dogName")
    // Find dog in list of dogs
    const dog = dogs.find((dog) => dog.dogName === originalName);
    // Update dog's breed and age
    dog.dogName = dogName;
    dog.dogBreed = dogBreed;
    dog.dogAge = dogAge;
    // Update dog in list of dogs
    setDogs([...dogs]);
  }

  const addDogTricks = (dogName, tricks, status) => {
    // find dog in list of dogs
    const dog = dogs.find((dog) => dog.dogName === dogName);
    // Add tricks and status to dog combined together as one object inside of the dogs array
    // dog.tricks = dog.tricks ? [...dog.tricks, tricks] : [tricks];
    // dog.status = dog.status ? [...dog.status, status] : [status];
    dog.tricks = dog.tricks ? [...dog.tricks, {trick: tricks, status: status}] : [{trick: tricks, status: status}];

// if no status make the default "low"
    // dog.tricks = dog.tricks ? [...dog.tricks, {trick: tricks, status: status}] : [{trick: tricks, status: "low"}];
    // update dog in list of dogs
    setDogs([...dogs]);
    console.log(dogs)
  }

  const updateDogTricksStatus = (dogName, tricks, status) => {
    // Find dog in list of dogs
    const dog = dogs.find((dog) => dog.dogName === dogName);
    // Find the trick in the dog's tricks array
    const trick = dog.tricks.find((trick) => trick.trick === tricks);
    // Update the status of the trick
    trick.status = status;
    // Update dog in list of dogs
    setDogs([...dogs]);
  }

  const removeTrick = (dogName, tricks) => {
    // Find dog in list of dogs
    const dog = dogs.find((dog) => dog.dogName === dogName);
    // Remove the trick from the dog's tricks array
    dog.tricks = dog.tricks.filter((trick) => trick.trick !== tricks);
    // Update dog in list of dogs
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
    addDogTricks, 
    updateDogTricksStatus, 
    updateDog,
    removeTrick
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};