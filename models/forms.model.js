const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now
  },
});

const Postmodel = mongoose.model("post", postSchema);
module.exports = {
  Postmodel,
};
