const mongoose = require("mongoose");

const schemaExercise = new mongoose.Schema({
  prog_lang: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  icon: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["draft", "publish", "deleted"],
    default: "draft",
  },
  exec_type: {
    type: String,
    enum: ["short", "rolling", "tutorial"],
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
  tags: [String],
  dev_time: {
    type: String,
  },

  // {  content*: string , sources:[{name: string, url:string}]  }
  content: {
    content: {
      type: String,
      // required:true
    },
    code: {
      type: String,
    },
    sources: [
      {
        name: String,
        url: String,
      },
    ],
  },
  solution: {
    type: String,
  },
  creator_id: {
    type: mongoose.SchemaTypes.ObjectId,
    // required: true,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("exercises", schemaExercise);
