const express = require("express")
const User = require("../db/User") // new
const router = express.Router()
const jwt = require('jsonwebtoken');
var crypto = require('crypto'); 

// Get all posts
router.get("/login", (req,res)=>{
	res.send(`<!DOCTYPE html>
	<html>
	<head>
		<title>Login Page</title>
		<style>
		   body {
		font-family: Arial, sans-serif;
		background-image: url('https://firebasestorage.googleapis.com/v0/b/dbms-project-ac358.appspot.com/o/bcd.png?alt=media&token=71293bb9-62df-4afd-886c-76acb7e22adb');
		background-color: #f9f9f9;
		margin: 0;
		padding: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		}
	
	.container {
		background-color: #fff;
		border-radius: 10px;
		box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
		text-align: center;
		padding: 30px;
		width: 350px;
		max-width: 80%;
	}
	
	h2 {
		color: #007BFF;
		margin-bottom: 20px;
	}
	
	label {
		display: block;
		text-align: left;
		margin-top: 10px;
	}
	
	input[type="text"],
	input[type="password"] {
		width: calc(100% - 20px);
		padding: 10px;
		margin: 5px 0;
		border: 1px solid #ccc;
		border-radius: 5px;
		box-sizing: border-box;
	}
	
	input[type="button"] {
		width: 100%;
		background-color: #007BFF;
		color: #fff;
		padding: 12px;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		font-size: 16px;
		margin-top: 20px;
	}
	
	input[type="button"]:hover {
		background-color: #0056b3;
	}
	
		</style>
	</head>
	<body>
		<div class="container">
			<h2>Login</h2>
			<form id="login-form" action="http://localhost:5000/auth/login" method="POST">
				<label for="username">Username:</label>
				<input type="text" id="username" name="username" required>
				<label for="password">Password:</label>
				<input type="password" id="password" name="password" required>
				<input type="button" value="Login" onclick="submitForm()">
			</form>
		</div>
	
		<script>
			function submitForm() {
				var username = document.getElementById("username").value;
				var password = document.getElementById("password").value;
			
				// login request is sent to this url
				var url = "http://localhost:5000/auth/login";
			
				// XMLHttpRequest object
				var xhr = new XMLHttpRequest();
			
				// Configure the request
				xhr.open("POST", url, true);
			
				// Set the request headers
				xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				xhr.onload = function () {
					console.log(username)
					if (xhr.status === 200) {
						var response = JSON.parse(xhr.responseText)
						if(response.token){
							console.log("JWT Token : ", response.token)
							localStorage.setItem('jwtToken', response.token);
							const newURL = 'http://localhost:5000/auth/home'; 
    						window.location.href = newURL;
						}else{
							console.log(xhr.responseText)
						} 
					} else {
						console.error("Login failed");
					}
					
				};
			
				// Prepare the data as a JSON object
				var data = {
					username: username,
					password: password
				};
			
				// Send the request after converting the data to JSON
				xhr.send(JSON.stringify(data));
			}        
		</script>
	</body>
	</html>`)
})
router.get("/register", (req,res)=>{
	res.send(`<!DOCTYPE html>
		<html>
		<head>
			<title>Registration Page</title>
			<style>
				body {
					font-family: 'Arial', sans-serif;
					background: url('https://e1.pxfuel.com/desktop-wallpaper/749/497/desktop-wallpaper-lights-background-color-rainbow-red-logo-texture-blue-lines-%D1%84%D0%BE%D0%BD-background-netflix-netflix-effect-colors-effect-lights-section-%D1%82%D0%B5%D0%BA%D1%81%D1%82%D1%83%D1%80%D1%8B-netflix-2021.jpg') no-repeat center center fixed;
					background-size: cover;
					margin: 0;
					padding: 0;
					display: flex;
					justify-content: center;
					align-items: center;
					height: 100vh;
				}
		
				.container {
					background-color: rgba(255, 255, 255, 0.85);
					border-radius: 5px;
					box-shadow: 0px 0px 20px 0px #333;
					text-align: center;
					padding: 20px;
					width: 300px;
				}
		
				h2 {
					color: #007BFF;
				}
		
				label {
					display: block;
					text-align: left;
					margin-top: 10px;
				}
		
				input[type="text"],
				input[type="password"] {
					width: 90%;
					padding: 10px;
					margin: 5px 0;
					border: 1px solid #ccc;
					border-radius: 4px;
				}
		
				input[type="submit"] {
					width: 100%;
					background-color: #007BFF;
					color: #fff;
					padding: 10px;
					border: none;
					border-radius: 4px;
					cursor: pointer;
				}
			</style>
		</head>
		<body>
			<div class="container">
				<h2>Registration</h2>
				<form id="login-form" action="http://localhost:5000/auth/register" method="POST">
					<label for="username">Username:</label>
					<input type="text" id="username" name="username" required>
					<label for="password">Password:</label>
					<input type="password" id="password" name="password" required>
					<input type="button" value="Register" onclick="submitForm()">
				</form>
			</div>
		
			<script>
			function submitForm() {
				var username = document.getElementById("username").value;
				var password = document.getElementById("password").value;

				var url = "http://localhost:5000/auth/register";
			
				var xhr = new XMLHttpRequest();

				xhr.open("POST", url, true);

				xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			
				//callback function
				xhr.onload = function () {
					console.log(username)
					const nooURL = 'http://localhost:5000/auth/login'; 
    				window.location.href = nooURL;
				};
			
				//JSON object
				var data = {
					username: username,
					password: password
				};
			
				// Send the request after converting the data to JSON
				xhr.send(JSON.stringify(data));
			}
			</script>
		</body>
		</html>
`)
})

router.get("/home", (req,res)=>{
	res.send(`
		<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Video Streaming Project</title>
	<style>
	

	body {
		margin: 0;
		font-family: Arial, sans-serif;
	}
	
	.header {
		background-color: #333;
		color: #fff;
		padding: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.header h1 {
		margin: 0;
	}
	
	.buttons .button {
		text-decoration: none;
		color: #fff;
		margin-left: 10px;
		padding: 10px 20px;
		border: 1px solid #fff;
		border-radius: 5px;
		transition: background-color 0.3s;
	}
	
	.buttons .button:hover {
		background-color: #fff;
		color: #333;
	}
	
	.image-container {
		position: relative;
		text-align: center;
	}
	
	.image-container img {
		max-width: 100%;
	}
	
	.top-buttons {
		position: absolute;
		top: 50px;
		left: 50px;
	}
	
	.big-button {
		padding: 10px 20px;
		font-size: 16px;
		background-color: #333;
		color: #fff;
		border: none;
		border-radius: 5px;
		margin-bottom: 10px;
		cursor: pointer;
	}
	
	.big-button:hover {
		background-color: #555;
	}
	
	
	.container {
		display: flex;
	}
	
	.left-panel {
		flex: 1;
		background-color: #f0f0f0;
		padding: 20px;
	}
	
	.right-panel {
		flex: 1;
		background-color: #ccc;
		padding: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.top-buttons .big-button {
		padding: 10px 20px;
		font-size: 16px;
		background-color: #333;
		color: #fff;
		border: none;
		border-radius: 5px;
		margin-bottom: 10px;
		cursor: pointer;
	}
	
	.top-buttons .big-button:hover {
		background-color: #555;
	}
	
	.video-container{
		position: relative;
		size: 200rem;
		left:5rem ;
		margin: 0;
		bottom: 60rem;
	}
	.video-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh; /* Set the height to occupy the full viewport height */
	}
	
	
	#videoPlayer{
		size: 200rem;
	}
	</style>
</head>


<body>
    <div class="header">
        <h1>Video Streaming Project</h1>
        <div class="buttons">
            <a href='http://localhost:5000/auth/login' class="button">Login</a>
            <a href='http://localhost:5000/auth/register' class="button">Register</a>
        </div>
    </div>
    <div class="image-container">
        <img src="https://firebasestorage.googleapis.com/v0/b/dbms-project-ac358.appspot.com/o/abc.png?alt=media&token=bd3ab80a-b81b-4a45-be85-57a5261f558e" alt="Video Streaming Background">
        <div class="top-buttons" id="movie-list">
            <!-- Movie data -->
        </div>
        <div class="video-container">
            <video id="videoPlayer" controls>
                <source src="" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
    </div>

    <script>
	    // Sample movie data
        const movieData = [
            {
                "id": 1,
                "title": "Rithvik movie 1",
                "director": "Rithvik",
                "rating": 4.54,
                "summary": "sfserfv",
                "duration": 657.3,
                "link": "https://firebasestorage.googleapis.com/v0/b/dbms-project-ac358.appspot.com/o/video%20(360p).mp4?alt=media&token=b0593f33-911b-4972-a75e-511707337ed1"
            },
            {
                "id": 2,
                "title": "Rithvik movie 2",
                "director": "Ravilla",
                "rating": 2.34,
                "summary": "sfserfv sdncjnz sdicsjzncn jkasdcjasnsn",
                "duration": 12.3,
                "link": "https://firebasestorage.googleapis.com/v0/b/dbms-project-ac358.appspot.com/o/video-3.mp4?alt=media&token=d5959220-9dcd-49a8-8401-ca039b71869d"
            },
        ];

        // Function to fetch movie data
        function fetchMovieData() {
            fetch('http://localhost:8080/movie/show', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                //displayMovieData(data);
				console.log(data)
				const movieList = document.getElementById('movie-list');
				movieList.innerHTML = ''; // Clear previous data
				data.forEach(movie => {
					const movieElement = document.createElement('div');
					movieElement.classList.add('big-button');
					movieElement.onclick = () => playVideo(movie.link);
					movieElement.style.display = 'inline-block';
					movieElement.style.marginRight = '100px';				
					movieElement.innerHTML = \`
						<p>Title: \${movie.title}</p>
						<p>Director: \${movie.director}</p>
						<p>Rating: \${movie.rating}</p>
						<p>Duration: \${movie.duration} minutes</p>
					\`;
					movieList.appendChild(movieElement);
				});
            });
        }

        // Function to play video
        function playVideo(source) {
            const videoPlayer = document.getElementById('videoPlayer');
            videoPlayer.src = source;
            videoPlayer.load();
            videoPlayer.play();
        }

        // get movie data when the page loads
        fetchMovieData();
    </script>
</body>
</html>
`
)
})

router.post("/login", async (req, res) => {
	console.log(req.body)
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