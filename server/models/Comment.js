const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 150,
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
});

module.exports = { Comment: mongoose.model("Comment", CommentSchema) };
