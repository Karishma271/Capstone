require('dotenv').config(); // Load environment variables
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Debugging: Log to verify environment variables
console.log("Loaded SECRET_KEY:", process.env.SECRET_KEY);

// Signup API
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, role, phone } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username is already in use.' });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email is already in use.' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role,
      phone,
    });

    // Save the user to the database
    await user.save();
    res.status(200).json({ message: 'Signup successful.' });
  } catch (error) {
    console.error("Server error during signup:", error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Login API
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("Login attempt with username:", username);

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    console.log("Raw Password Entered:", password);
    console.log("Stored Hashed Password:", user.password);

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", passwordMatch);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    // If the username and password are valid, create a JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.SECRET_KEY, // Use secret key from environment variables
      { expiresIn: '7d' } // Token expiration time
    );

    res.status(200).json({ token, user: { username: user.username, role: user.role } });
  } catch (error) {
    console.error("Server error during login:", error);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
