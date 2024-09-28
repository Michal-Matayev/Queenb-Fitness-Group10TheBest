require("../db-connection");
const userModel = require("../Models/UserModel");

// const newUserModel = {
//   userName: "Nava",
//   password: "1234",
//   Permissions: "user",
//   email: "aaa@gmail.com",
//   profileImg: "ligkhj",
// };

async function create(data) {
  return await userModel.create(data);
}

async function read(filter = {}, projection) {
  return await userModel.find(filter, projection);
}


async function update(_id, data) {
  return await userModel.findByIdAndUpdate(_id, data, {
    new: true,
    runValidators: true,
  });
}
async function readOne(filter) {
  return userModel.findOne(filter)
}

module.exports = {
  create,
  read,
  update,
  readOne
};


