// const exerciseController = require("../../DL/Controllers/exerciseController");
const exerciseController = require("../../DL/Controllers/exerciseController");
const ExerciseController = require("../../DL/Controllers/exerciseController");
// const GeneralLogic = require("../BL/Logic/generalLogic");

// async function create(data) {
//   console.log("in exersiceLogic.js in create");

//   return ExerciseController.create(data);
// }

// async function readAllExercisesInLang(langName) {
//   let exercises = ExerciseController.read();
//   return Object.values(exercises).filter((val) => val.prog_lang === langName);
//   // return ExerciseController.read();
// }
async function read(filter={}, projection = {})
{
  //console.log(token);
  return ExerciseController.read(filter, projection)
}

async function updateLastSeenById(id, data) {
  data.lastSeen = Date.now();
  return ExerciseController.updateExersiceById(data._id, data);
}
async function del(id,token)
{
  return await ExerciseController.delete(id,token);

}
//@@
async function update(idEx, data,token) {

  if (!idEx ||!token) throw "missing data";
  // if(!exerciseController.getTokenStatus(token))
  // {
  //   console.log('token unouthorized, you need to login again');
  //   throw 'token unouthorized, you need to login again'

  // }
  

  const foundExercise = await ExerciseController.read({ _id: `${idEx}` });
  //console.log(foundExercise);

  if (!foundExercise) throw `we don't find this id`;

  const {
    icon,
    title,
    details,
    exec_type,
    difficulty,
    status,
    prog_lang,
    tags,
    content,
    solution,
  } = data;
  const newData = {
    icon,
    title,
    details,
    exec_type,
    difficulty,
    status,
    prog_lang,
    tags,
    content,
    solution,
  };
  console.log(newData);

  let filteredData = {};
  for (let key in newData) {
    if (newData[key]) filteredData[key] = newData[key];
  }
console.log(filteredData);
  return await ExerciseController.updateExersiceById(idEx, filteredData,token);
}

module.exports = {
  ...ExerciseController,
  //create,
  read,
  //readAllExercisesInLang,
  updateLastSeenById,
  update,
  del
};
