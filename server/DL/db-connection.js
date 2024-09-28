require("dotenv").config({ path: "./.env" });

const mongoose = require("mongoose");


mongoose
  .connect(process.env.CONNECTION_STRING)
  //.connect(CONNECTION_STRING)
  .then(() => {
    console.log(`mongo connected successfuly!`);
    console.log("in db-connections.js");
  })
  .catch((err) => {
    //console.log(err);
    throw "mongo not connected";
  });

// to run:
// npm i mongoose(in first time)
// node '.\DL\db-connection.js'
