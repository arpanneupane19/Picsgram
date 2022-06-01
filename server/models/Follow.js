const mongoose = require("mongoose");

const FollowSchema = new mongoose.Schema({
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  followee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = { Follow: mongoose.model("Follow", FollowSchema) };
