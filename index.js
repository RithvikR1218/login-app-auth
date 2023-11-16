const express = require("express")
const mongoose = require("mongoose") // new
const routes = require("./routes/user") // new
const loginRoutes = require("./routes/login") // new
const videoRoutes = require("./routes/video") // new

var cors = require('cors')
var app = express()
app.use(cors(
	{
		credentials: true,
		origin: 'http://127.0.0.1:5500'
	}
))
// app.options('*', cors());

// Connect to MongoDB database
mongoose
	.connect("mongodb://localhost:27017/auth", { useNewUrlParser: true })
	.then(() => {
        console.log("DB connection has been established")
		const app = express()
        app.use(express.json()) // new
        app.use("/auth",routes);
        app.use("/auth",loginRoutes);
        app.use("/auth",videoRoutes);
		app.listen(5000, () => {
			console.log("Server has started!")
		})
	})