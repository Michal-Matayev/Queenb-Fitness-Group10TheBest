require("../db-connection");
const execModel = require("../Models/ExerciseModel");
const userModel = require("../Models/UserModel");

const { createToken, verifyToken } = require('../../BL/Middleware/jwt');
const ExerciseModel = require("../Models/ExerciseModel");


// const newExecModel = {
//   icon: "icon.jpg",
//   title: "My First Exercise",
//   details: "bla bla bla bla bla bla",
//   status: "draft",
//   //creator_id: new mongoose.SchemaTypes.ObjectId(),
//   exec_type: "short",
//   difficulty: "medium",
//   tags: ["Loops", "Functions"],
//   prog_lang: "61d2eec83a6c92050a52b0de",
//   dev_time: "",
//   content: {
//     content: "bla bla bla",
//     sources: [
//       {
//         name: "Link1",
//         url: "https://google.com",
//       },
//     ],
//   },
//   solution: "my solution",
// };
// async function getTokenStatus(token)
// {
// const user = await readOne({ token: `${token}` })
// //console.log(user);
// // if(!user)
// // {
// //   throw("token expaired");
// // }


//     if (user && verifyToken(user._id, token))
//     {
//       console.log("sucsses verify token");
//       return true
    
// }
// else
// return false
// }


//create new row in ExecModel-get obj new ExecModel
async function create( data,token) {
  console.log(data);
  console.log("in excercise Controller.js in CREATE");
  const user = await readOne({ token: `${token}` })
  if (user && verifyToken(user._id, token))
  {
    console.log("sucsses");
  
      var result = await execModel.create(data);
      console.log(result);
      return  result;
  
  }
    console.log("error");
  

  


 

}


//SELECT _id, item, status from inventory WHERE status = "A"
//projection-select values, filter-where condition
// filter = { prog_lang: "js" },
// projection = { title: 1, _id: 1, prog_lang: 1 }
async function read(filter, projection = {}) {
  //console.log(token);
  console.log(filter);
  console.log("***");
 // const user = await readOne({ token: `${token}` })
  //const user = await userModel.findOne({ token: `${token}` })
  //console.log(user._id);
//console.log(verifyToken(user._id, token));
    // if (user && verifyToken(user._id, token))
    // {
    //   console.log("sucsses verify token");
      return await ExerciseModel.find(filter, projection); //we can to select specific filed with boolean valuse{ title: 1, _id: 0 }

   // }
    //else
       // throw 'not conected'
}
async function readOne(filter) {
  return userModel.findOne(filter)
}


//update data of a excercise by get him _id & the new data
//data like { title: "deleted" }
//@@
async function updateExersiceById(idEx,data,token) {
  const user = await readOne({ token: `${token}` })

    if (user && verifyToken(user._id, token))
    {
      console.log("good");
      return await execModel.findByIdAndUpdate(idEx, data, {
        new: true,
        runValidators: true,
      });
    }
 
}
//we doesnt want to delete a excercise so we just change hin status
async function del(_id,token) {
  console.log("in del");
  const user = await readOne({ token: `${token}` })
  console.log(user);
  console.log(verifyToken(user._id, token));

  if (user && verifyToken(user._id, token))
  {
   console.log("sucsses");
  return await execModel.findByIdAndUpdate(_id, { status: "deleted" });
  }
}

module.exports = {
  create,
  read,
  updateExersiceById,
  delete: del,
  readOne,
  //getTokenStatus
};
