// routes.js

const express = require('express');
const router = express.Router();
const User = require('./mongo');

router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password, address } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json('User already exists. Please login.');
    }

    const newUser = new User({ firstName, lastName, email, password, address });
    await newUser.save();
    res.status(201).json('Signup successful. Please login.');
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json('Invalid credentials. Please signup.');
    }

    // Include additional user data as needed

    res.status(200).json('Login successful. Redirect to checkout.');
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
});

module.exports = router;
