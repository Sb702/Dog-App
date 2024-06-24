const express = require("express");
const router = express.Router();
const User = require("../schemas/userSchema");
const Dog = require("../schemas/dogsSchema");

// router.get('/', async (req, res) => {
//     res.send('User Routes');
// });

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  const user = new User({
    username,
    password,
  });
  try {
    const newUser = await user.save();
    res.status(201).json("User created successfully");
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  //   console.log(username, password);
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).json("Invalid credentials");
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

router.post("/getDogs", async (req, res) => {
  const { userId } = req.body;
  // console.log(userId, "userId")
  try {
    // filter by the userId
    const dogs = await Dog.find({ userId });
    // console.log(dogs, "dogs")
    res.status(200).json(dogs);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

router.post("/addDog", async (req, res) => {
  const { name, breed, age, userId } = req.body;
  const dog = new Dog({
    name,
    breed,
    age,
    userId,
  });
  try {
    const newDog = await dog.save();
    res.status(201).json({ message: "Dog added successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/addTrick", async (req, res) => {
  const { dogName, trick, difficulty, userId } = req.body;

  console.log(dogName, trick, difficulty, userId);

  try {
    const dog = await Dog.findOne({ name: dogName });
    dog.tricks.push({ trick, difficulty });
    await dog.save();
    res.status(201).json({ message: "Trick added successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/removeTrick", async (req, res) => {
  const { dogName, trick, id } = req.body;
  // console.log(dogName, trick, id, "from /removeTrick")
  try {
    const dog = await Dog.findOne({ name: dogName, userId: id });
    // console.log(dog);
    dog.tricks = dog.tricks.filter((item) => item.trick !== trick);
    await dog.save();
    res.status(201).json({ message: "Trick removed successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// update dog trick status
router.post("/updateTrickStatus", async (req, res) => {
  const { dogName, trick, status, userId } = req.body;
  try {
    const dog = await Dog.findOne({ name: dogName, userId });
    if (!dog) {
      return res.status(404).json({ message: "Dog not found" });
    }
    const trickToUpdate = dog.tricks.find((item) => item.trick === trick);
    if (!trickToUpdate) {
      return res.status(404).json({ message: "Trick not found" });
    }
    trickToUpdate.difficulty = status;
    dog.markModified('tricks'); // Mark the 'tricks' array as modified
    await dog.save();
    res.status(201).json({ message: "Trick updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/updateDog", async (req, res) => {
  const { name, breed, age, originalName, userId } = req.body;
  // console.log(name, breed, age, originalName, userId);
  try {
    // const dog = dogs.find((dog) => dog.dogName === originalName && dog.userId === id);
    const dog = await Dog.findOne({ name: originalName, userId });
    // console.log(dog, "dog from /updateDog"); 
    dog.name = name;
    dog.breed = breed;
    dog.age = age;
    await dog.save();
    res.status(201).json({ message: "Dog updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message, message: "from /updateDog"});
  }
});

module.exports = router;
