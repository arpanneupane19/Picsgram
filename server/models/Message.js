const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  Message: {
    type: String,
    required: true,
    minLength: 4,
  },

  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  roomName: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = { Message: mongoose.model("Message", MessageSchema) };
