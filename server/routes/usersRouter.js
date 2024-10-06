const express = require('express');
const router = express.Router();
const userController = require('../DL/Controllers/userController'); // Adjust the path based on your file structure
const { verifyToken } = require('../BL/Middleware/jwt'); // Middleware for token verification


// User Registration Route
router.post('/register', async (req, res) => {
  console.log(`in register route ${JSON.stringify(req.body)} `);

  try {
    // Pass req.body directly to the register function
    const user = await userController.register(req, res); // Pass both req and res
    res.status(201).json(user);
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(400).json({ message: error });
  }
});

// User Login Route
router.post('/login', async (req, res) => {
  try {
    console.log(`in login route  ${JSON.stringify(req.body)} `);

    const user = await userController.login(req, res);
    res.status(200).json(user);
  } catch (error) {
    console.error('Login Error:', error);
    res.status(401).json({ message: error });
  }
});

// Read All Users' Data (Admin or authorized access only)
router.get('/users', verifyToken, async (req, res) => {
  try {
    const users = await userController.readAllUsersData(req, res);
    res.status(200).json(users);
  } catch (error) {
    console.error('Fetch Users Error:', error);
    res.status(500).json({ message: error });
  }
});

// Export the router
module.exports = router;