const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 500,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

module.exports = { Post: mongoose.model("Post", PostSchema) };
