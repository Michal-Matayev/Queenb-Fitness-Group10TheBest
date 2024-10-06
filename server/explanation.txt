//include the routes file
//var exercise = require('./routes/exerciseRoute');
//var lang = require('./routes/langRoute');
//var user = require('./routes/userRoute');


const express = require("express"),
  app = express(),
  PORT = process.env.PORT || 5000,
  //npm install cors
  //npm install cors --save
  cors = require("cors");
require("dotenv").config({ path: ".env" });

//->we set db once and after put this kine in comments
//require("./DL/scripts_data/script_setDB.js");


app.use(express.json());
app.use(cors());

require("./router")(app);
//require('./routes')(app);

//app.use('/user',user);
//app.use('/exercise',exercise);
//app.use('/lang',lang);


app.listen(PORT, () => console.log(`server is running in port ${PORT}`));
console.log("in server.js");

//to run:
//npm i dotenv
//npm i express
//mpm i mongoose
//node '.\server.js'  ->run also db-connections

// server
// => router -app.post
// =>bl/logicControllers/exerciseLogic-  create
// => dl/controllers/ExerciseController - create
// =>dl/Models/exersicemodele - create

// index
// => router -app.get
//if params-  =>bl/logicControllers/exerciseLogic-  read
//if not params  =>bl/logicControllers/generallogic- getSingleExercise  -> exerciseLogic-  read
// => dl/controllers/ExerciseController - read
// =>dl/Models/exersicemodele - read
