const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
  liker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
});

module.exports = { Like: mongoose.model("Like", LikeSchema) };
