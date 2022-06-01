// Imports
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const cors = require("cors");


// App setup
const app = express();
const PORT = process.env.PORT || 8000;
const uri = `${process.env.MONGODB_URI}`;

async function connectToMongoDB() {
  try {
    await mongoose.connect(uri, {
      dbName: "PicsgramMain",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB :)");
  } catch (err) {
    console.error(err);
  }
}

// App middlewares
app.use(
  session({
    secret: process.env.APP_SECRET_KEY,
    cookie: { maxAge: 1000 * 3600 * 24 * 7 },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  })
);


// Models
const { User } = require("./models/User.js");
const { Post } = require("./models/Post.js");
const { Comment } = require("./models/Comment.js");
const { Message } = require("./models/Message.js");
const { Like } = require("./models/Like.js");
const { Follow } = require("./models/Follow.js");

// Routes
const routes = require("./routes/routes.js");

app.post("/api/register", routes.postRegister);

connectToMongoDB();
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
