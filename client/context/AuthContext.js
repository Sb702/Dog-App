// AuthContext.js
import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ username: "sam", id: "" });
  const [dogs, setDogs] = useState([
    { dogName: "Rex", dogBreed: "German Shepherd", dogAge: 5 },
    { dogName: "Max", dogBreed: "Golden Retriever", dogAge: 3 },
    { dogName: "Buddy", dogBreed: "Labrador", dogAge: 7 },
  ]);

  const registerUser = (username, password) => {
    // console.log(username, password);
    setUser({ username, password });
    setIsLoggedIn(true);

    fetch("http://192.168.0.253:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => {
        if (response.status === 200) {
          setUser({ username, password });
        }
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error.message));
  };

  const loginUser = async (username, password) => {
    try {
      const response = await fetch("http://192.168.0.253:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });
      const data = await response.json();
      if (response.status === 200) {
        setUser({ username: data.username, id: data._id });
        // find the users dogs in the db based on the user id
        const dogsResponse = await fetch("http://192.168.0.253:5000/getDogs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: data._id }),
        });
        const dogsData = await dogsResponse.json();
        // console.log(dogsData, "dogsData ctx line 62");
        const newDogs = dogsData.map((dog) => ({
          dogName: dog.name,
          dogBreed: dog.breed,
          dogAge: dog.age,
          tricks: dog.tricks,
          userId: dog.userId,
        }));
        setDogs(newDogs);
        // console.log(dogs, "dogs ctx line 69");
      }
      return { success: true, user: { username: data.username, id: data._id } };
    } catch (error) {
      console.error(error.message);
    }
  };

  const addDog = async (dogName, dogBreed, dogAge, userId) => {
    console.log(userId, "ctx");
    // add dog to database
    const response = await fetch("http://192.168.0.253:5000/addDog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: dogName,
        breed: dogBreed,
        age: dogAge,
        userId: userId,
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          // add dog to list of dogs
          setDogs([...dogs, { dogName, dogBreed, dogAge, userId }]);
        }
        return response.json(); // Parse JSON only once
      })
      .then((data) => {
        console.log(data);
        // If you need to do something with the data, do it here
      })
      .catch((error) => {
        console.error("Error adding dog:", error);
      });
  };

  const updateDog = async (dogName, dogBreed, dogAge, originalName, id) => {
    // const dog = dogs.find((dog) => dog.dogName === originalName);
    const dog = dogs.find((dog) => dog.dogName === originalName && dog.userId === id);
    // console.log(dog, "dog from ctx, line 113")
    // console.log(dogName, dogBreed, dogAge, originalName, id, "from ctx 114")

    const response = await fetch("http://192.168.0.253:5000/updateDog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: dogName,
        breed: dogBreed,
        age: dogAge,
        originalName: originalName,
        userId: id,
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          dog.dogName = dogName;
          dog.dogBreed = dogBreed;
          dog.dogAge = dogAge;
          setDogs([...dogs]);
        }
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error.message, "error from ctx 137"));

    // dog.dogName = dogName;
    // dog.dogBreed = dogBreed;
    // dog.dogAge = dogAge;

    // setDogs([...dogs]);
  };

  const addDogTricks = (dogName, tricks, status, id) => {
    // console.log(id, "id from ctx")
    const dog = dogs.find((dog) => dog.dogName === dogName && dog.userId === id);
    // console.log(dog, "dog from ctx")
    // if the dog is found add the trick to the dog in the database 

    fetch("http://192.168.0.253:5000/addTrick", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dogName: dogName, trick: tricks, status: status, userId: id }),
    })
      .then((response) => {
        if (response.status === 201) {
          // add trick to dog in list of dogs
          dog.tricks = dog.tricks
            ? [...dog.tricks, { trick: tricks, status: status }]
            : [{ trick: tricks, status: status }];
          setDogs([...dogs]);
        }
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error.message));
    // console.log(tricks, "tricks from ctx")
    dog.tricks = dog.tricks
      ? [...dog.tricks, { trick: tricks, status: status }]
      : [{ trick: tricks, status: status }];
    setDogs([...dogs]);
    // console.log(dogs);
  };

  const updateDogTricksStatus = (dogName, tricks, status) => {
    // Find dog in list of dogs
    const dog = dogs.find((dog) => dog.dogName === dogName);
    // Find the trick in the dog's tricks array
    const trick = dog.tricks.find((trick) => trick.trick === tricks);
    // Update the status of the trick
    trick.status = status;
    // Update dog in list of dogs
    setDogs([...dogs]);
  };

  const removeTrick = (dogName, tricks) => {
    // Find dog in list of dogs
    const dog = dogs.find((dog) => dog.dogName === dogName);
    // Remove the trick from the dog's tricks array
    dog.tricks = dog.tricks.filter((trick) => trick.trick !== tricks);
    // Update dog in list of dogs
    setDogs([...dogs]);
  };

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
    removeTrick,
    loginUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
