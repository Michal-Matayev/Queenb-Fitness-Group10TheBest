const mongoose = require("mongoose");

const langSchema = new mongoose.Schema({
  langName: {
    type: String,
    required: true,
    unique: true,
  },
  // icon_name: {
  //   type: String,
  // },
  // icon_src: {
  //   type: String,
  // },
  icon: String,
  tags: [String],
});

module.exports = mongoose.model("languages", langSchema);
