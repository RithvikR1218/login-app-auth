const express = require("express")
const User = require("../db/User") // new
const router = express.Router()
const jwt = require('jsonwebtoken');

// Get all posts
router.get("/login", async (req, res) => {
	const users = await User.findOne({username: req.body.username})

    if (!users) {
        return res.status(404).json({ error: "User not found" });
    }

    if (req.body.password !== users.password) {
        return res.status(401).json({ error: "Incorrect password" });
    }

	const jwt_token = jwt.sign({ username: users.username }, 'yourSecretKey', { expiresIn: '1h' });
	res.json({token: jwt_token});
})

router.post("/register", async (req, res) => {
	const user = new User({
		username: req.body.username,
		password: req.body.password,
	})
	await user.save()
	res.send(user)
})

module.exports = router