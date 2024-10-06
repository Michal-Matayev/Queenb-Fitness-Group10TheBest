const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const usersRoutes = require('./routes/usersRouter');
const exerciseRouter = require('./routes/exerciseRouter');
const userExerciseRouter = require('./routes/userExerciseRouter');


dotenv.config();

// Constants
const PORT = process.env.PORT;
//console.log(PORT);

// Create Express server
const app = express();



// Middleware
app.use(express.json());
// CORS configuration to allow all origins
app.use(cors({
  origin: '*', // Allow requests from all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/users', usersRoutes);
app.use('/api/exercises', exerciseRouter);
app.use('/api', userExerciseRouter);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(PORT, () => {
      console.log('connected to mongoDB & listening on port', process.env.PORT);
    });
  }).catch((err) => {
    console.log(err);
  });