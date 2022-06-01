const { User } = require("../models/User.js");
const { Post } = require("../models/Post.js");
const { Message } = require("../models/Message.js");
const { Like } = require("../models/Like.js");
const { Follow } = require("../models/Follow.js");
const { Comment } = require("../models/Comment.js");
const bcrypt = require("bcrypt");

async function postRegister(req, res) {
	/* 
		Get first/last name, email, username, password.
	*/

	const firstName = req.body.user.firstName;
	const lastName = req.body.user.lastName;
	const email = req.body.user.email;
	const username = req.body.user.username;
	const password = req.body.user.password;

	/* Check if a user exists or not by looking for a user with the entered email & username. 
	If a user does exist, then send a 409 status code, else add a new user and send a 200 status code.
	*/
	const existingUsername = await User.findOne({ username: req.body.user.username })
	const existingEmail = await User.findOne({ email: req.body.user.email })

	if (existingUsername || existingEmail) {
		console.log("Existing username or existing email. Could not add user.")
		res.send({ success: false, statusCode: 409 })
	} else {
		const hashedPassword = await bcrypt.hash(password, 12)

		const newUser = await User.create({ firstName: firstName, lastName: lastName, email: email, username: username, password: hashedPassword })
		console.log(`${newUser.username} has been added successfully.`)
		res.send({ success: true, statusCode: 200 })

	}

}

async function login(req, res) { }

async function feed(req, res) { }

module.exports = {
	postRegister: postRegister
}