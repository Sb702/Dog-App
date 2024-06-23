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
        res.status(201).json("Dog added successfully");
    } catch (error) {
        res.status(400).json({ error: error });
    }
    });

module.exports = router;
