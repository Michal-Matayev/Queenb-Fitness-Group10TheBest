require("../db-connection");
const langModel = require("../Models/LangModel");

// const newLangModel = {
//   language: "c#",
//   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.14.0/devicon.min.css",
//   tags: ["loops", "arr"],
// };

async function create(data) {
  return await langModel.create(data);
}

async function read(filter = {}, projection = {}) {
  console.log("in read lang");

  //console.log(filter);
  //console.log(projection);

  let result = await langModel.find(filter, projection);
  //console.log(result);
  return result;
}

async function update(_id, data) {
  return await langModel.findByIdAndUpdate(_id, data, {
    new: true,
    runValidators: true,
  });
}

module.exports = {
  create,
  read,
  update,
};
