  const UserLogic = require("../Logic/UserLogic/UserLogic");
  // LangLogic = require("../BL/Logic/langLogic");

async function getSingleExercise(_id) {
  console.log("in get");
  console.log(_id);
  const exercise = await ExerciseLogic.read({ _id: `${_id}` }); /*,
  { title: 1, details: 1, difficulty: 1, exec_type: 1, icon: 1 }); //array of one object  exercise that its your id*/
  //console.log(exercise);
  //console.log(exercise[0].icon);

  let creator_id = exercise[0].creator_id;
  //console.log(creator_id);
  const user = await UserLogic.read({ _id: exercise[0].creator_id });

  return {
    exercise,
    user,
  };
}
function emailValidation(email) {
  if (!email?.includes("@")) throw "The email should include @";
  return email;
}

module.exports = {
  getSingleExercise,
  emailValidation,
};
