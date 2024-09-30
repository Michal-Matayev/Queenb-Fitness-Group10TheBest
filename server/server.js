const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// ייבוא קובצי הנתיבים
const signInRoutes = require('./routes/signIn');  // נתיב הכניסה הקיים
const signUpRoutes = require('./routes/signUp');  // נתיב הרישום החדש

dotenv.config();

// Constants
const PORT = process.env.PORT;

// Create Express server
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL
}));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/signIn', signInRoutes);  // הגדרת נתיב /api/signIn
app.use('/api/signUp', signUpRoutes);  // הגדרת נתיב /api/signUp  <-- הוספנו את נתיב הרישום החדש

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(PORT, () => {
      console.log('connected to mongoDB & listening on port', PORT);
    });
  }).catch((err) => {
    console.log(err);
  });
