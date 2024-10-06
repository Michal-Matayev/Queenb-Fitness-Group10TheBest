 const userModel = require("../models/UserModel");
 const userLogic = require("../../BL/Logic/userLogic");

 async function register(req, res) {
  console.log('in register controller');
  console.log('Request body:', req.body); // Log the body to see what is received

  try {
      const user = await userLogic.register(req.body); // Should now receive the correct object
      res.status(201).json(user);
  } catch (error) {
      console.error(error);
      res.status(400).json({ message: error });
  }
}
 
async function login(req, res) {
  console.log('in login controller', req.body);  // Log the incoming request body

  try {
      const user = await userLogic.login(req.body); // Pass req.body directly
      res.status(200).json(user);
  } catch (error) {
      console.error('Error in login controller:', error);
      res.status(401).json({ message: error });
  }
}
 
 async function readAllUsers(req, res) {
     try {
         const users = await userLogic.readAllUsersData();
         res.status(200).json(users);
     } catch (error) {
         console.error(error);
         res.status(500).json({ message: error });
     }
 }
 
 // You can also add other CRUD methods here (update, delete, etc.)
 
 module.exports = {
     register,
     login,
     readAllUsers,
 };
 