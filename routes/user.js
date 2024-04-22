const express = require("express")
const User = require("../db/User") // new
const router = express.Router()
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")
const path = require('path');

router.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/home.html'));
});

router.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/admin.html'));
});


router.post("/login", async (req, res) => {
	const users = await User.findOne({username: req.body.username})

    if (!users) {
        return res.status(404).json({ error: "User not found" });
    }

	const passwordMatch = await bcrypt.compare(req.body.password, users.password);

    if (!passwordMatch) {
        return res.status(401).json({ error: "Incorrect password" });
    }

	const jwt_token = jwt.sign({ username: users.username }, 'yourSecretKey', { expiresIn: '1h' });
	res.json({token: jwt_token});
})

router.post("/register", async (req, res) => {
	const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
        username: req.body.username,
        password: hashedPassword,
    });
    await user.save();
    res.send(user);
})

module.exports = router