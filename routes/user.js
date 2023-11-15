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
					}else if(username == "admin"){
						const newURL = 'http://localhost:5000/auth/admin'; 
    					window.location.href = newURL;
					}else{
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
				font-family: sans-serif;
			}

			/////////////////////////////////////////

			.movie-card {
				position: relative;
				perspective: 1000px;
				cursor: pointer;
				height: 300px;
			}

			.front,
			.back {
				width: 100%;
				height: 100%;
				position: absolute;
				backface-visibility: hidden;
				transition: transform 0.6s;
			}

			.movie-card:hover .back {
				display: block;
			}

			.movie-card.hover .front {
				transform: rotateY(180deg);
			}

			.movie-card.hover .back {
				transform: rotateY(0deg);
			}

			.movie-image {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
			
			.movie-card {
				width: 200px;
				height: 200px;
				position: relative;
				perspective: 1000px;
				border: 5px solid #2BE498; 
				border-radius:22px;
			}
			
			.front, .back {
				width: 100%;
				height: 100%;
				position: absolute;
				backface-visibility: hidden;
				transition: transform 0.6s;
			}
			
			.back {
				transform: rotateY(180deg);
				background: rgba(0, 0, 0, 0.2);
				border-radius: 15px;
			}
			
			.movie-card.hover .front {
				transform: rotateY(180deg);
			}
			
			.movie-card.hover .back {
				transform: rotateY(0deg);
			}
			
			.movie-image {
				width: 200px;
				height: 200px;
				object-fit: cover; /* Helps maintain aspect ratio */
				border-radius: 15px;
			}
			

			/////////////////////////////////////////

			
			.header {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			
			.header h1 {
				padding:5px;
				padding-left:25px;
				padding-right:25px;
				border: 5px solid #2BE498;
				border-radius: 10px;
				background-color:#2BE498;
				margin-left: 10px;
			}
			
			.buttons .button {
				text-decoration: none;
				color: #fff;
				margin-left: 10px;
				padding: 10px 20px;
				border: 2px solid #2BE498;
				border-radius: 5px;
				transition: background-color 0.3s;
			}
			
			.buttons .button:hover {
				background-color: #2BE498;
				color: #333;
			}
			
			.image-container {
				position: relative;
				text-align: center;
			}
			
			.image-container img {
				max-width: 100%;
			}
			
			.top-buttone {
				position: absolute;
				top: 90px;
				left: 50px;
				padding: 10px 20px;
				font-size: 16px;
				color: #fff;
				border: none;
				border-radius: 5px;
				margin-bottom: 10px;
				cursor: pointer;
			}


			.top-buttwo {
				position: absolute;
				top: 400px;
				left: 50px;
				padding: 10px 20px;
				font-size: 16px;
				color: #fff;
				border: none;
				border-radius: 5px;
				margin-bottom: 10px;
				cursor: pointer;
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
			
			.head-one{
				position: absolute;
				top: 10px;
				left: 80px;
			}

			.head-two{
				position: absolute;
				top: 320px;
				left: 80px;
			}

			///////////////////////////////

			.movie-grid {
				display: block;
				margin-bottom: 20px; /* Add margin at the bottom for spacing */
			}
		

			///////////////////////////////


			</style>
		</head>


		<body>
			<div 
			//class="header" 
			style = "background-color: #0D0C22;
			color: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-left:20px;
			padding-right:20px;
			">
				<h1 style ="color: #0D0C22">Video Streaming Project</h1>
				<div class="buttons">
					<a href='http://localhost:5000/auth/login' class="button">Login</a>
					<a href='http://localhost:5000/auth/register' class="button">Register</a>
				</div>
			</div>

			<div class="image-container">

				<img src="https://firebasestorage.googleapis.com/v0/b/dbms-project-ac358.appspot.com/o/abc.png?alt=media&token=bd3ab80a-b81b-4a45-be85-57a5261f558e" 
				alt="Video Streaming Background">
				
				<div>
					<h1 class="head-one" style="color: #fff">Movies</h1>
					<div class="top-buttone movie-grid" id="movie-list">
						<!-- Movie data -->
					</div>
				</div>

				<div>
					<h1 class="head-two" style="color: #fff">TV Shows</h1>
					<div class="top-buttwo movie-grid" id="tv-list">
						<!-- TV Show data -->
					</div>
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
						"image": "https://i.pinimg.com/736x/a8/45/1f/a8451fc4aa4b4e3c39298fdfe2c3fd4d.jpg",
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
						"image": "https://i.pinimg.com/736x/a8/45/1f/a8451fc4aa4b4e3c39298fdfe2c3fd4d.jpg",
						"link": "https://firebasestorage.googleapis.com/v0/b/dbms-project-ac358.appspot.com/o/video-3.mp4?alt=media&token=d5959220-9dcd-49a8-8401-ca039b71869d"
					},
					{
						"id": 3,
						"title": "Rithvik movie 2",
						"director": "Ravilla",
						"rating": 2.34,
						"summary": "sfserfv sdncjnz sdicsjzncn jkasdcjasnsn",
						"image": "https://i.pinimg.com/736x/a8/45/1f/a8451fc4aa4b4e3c39298fdfe2c3fd4d.jpg",
						"duration": 12.3,
						"link": "https://firebasestorage.googleapis.com/v0/b/dbms-project-ac358.appspot.com/o/video-3.mp4?alt=media&token=d5959220-9dcd-49a8-8401-ca039b71869d"
					},
					{
						"id": 4,
						"title": "Rithvik movie 2",
						"director": "Ravilla",
						"rating": 2.34,
						"summary": "sfserfv sdncjnz sdicsjzncn jkasdcjasnsn",
						"image": "https://i.pinimg.com/736x/a8/45/1f/a8451fc4aa4b4e3c39298fdfe2c3fd4d.jpg",
						"duration": 12.3,
						"link": "https://firebasestorage.googleapis.com/v0/b/dbms-project-ac358.appspot.com/o/video-3.mp4?alt=media&token=d5959220-9dcd-49a8-8401-ca039b71869d"
					},
				];

				// Function to fetch all data

				function fetchAllData() {
					fetch('http://localhost:8080/movie/show', {
						method: 'GET',
						headers: {
							'Accept': 'application/json',
						},
					})
					.then(response => response.json())
					.then(data => {

						const movieList = document.getElementById('movie-list');
						movieList.innerHTML = ''; // Clear previous data
						const tvList = document.getElementById('tv-list');
						tvList.innerHTML = ''; // Clear previous data

						data.forEach((movie,index) => {

							const movieCard = document.createElement('div');
							movieCard.classList.add('movie-card');
		
							movieCard.style.display = 'inline-block';
							movieCard.style.marginRight = '30px';
		
							const front = document.createElement('div');
							front.classList.add('front');
							const image = document.createElement('img');
							image.src = movie.image;
							image.classList.add('movie-image');
							front.appendChild(image);
		
							const back = document.createElement('div');
							back.classList.add('back');
							back.innerHTML =\`
								<p>Title: \${movie.title}</p>
								<p>Director: \${movie.director}</p>
								<p>Rating: \${movie.rating}</p>
								<p>Duration: \${movie.duration} minutes</p>
							\`;
		
							movieCard.appendChild(front);
							movieCard.appendChild(back);
		
							movieCard.addEventListener('click', () => playVideo(movie.link));
		
							movieCard.addEventListener('mouseenter', () => {
								movieCard.classList.add('hover');
							});
		
							movieCard.addEventListener('mouseleave', () => {
								movieCard.classList.remove('hover');
							});
							if(index < 2){
								movieList.appendChild(movieCard);
							}else{
								tvList.appendChild(movieCard);
							}
							
						});
					});
				}

				//function to fetch TV Show data
				
				function fetchTVData() {
					fetch('http://localhost:8080/tv/show', {
						method: 'GET',
						headers: {
							'Accept': 'application/json',
						},
					})
					.then(response => response.json())
					.then(data => {

						const tvList = document.getElementById('tv-list');
						tvList.innerHTML = ''; // Clear previous data
						
						data.forEach(show => {
							const movieCard = document.createElement('div');
							movieCard.classList.add('movie-card');

							movieCard.style.display = 'inline-block';
							movieCard.style.marginRight = '30px';

							const front = document.createElement('div');
							front.classList.add('front');
							const image = document.createElement('img');
							image.src = show.image;
							image.classList.add('movie-image');
							front.appendChild(image);

							const back = document.createElement('div');
							back.classList.add('back');
							back.innerHTML = \`
								<p>Title: \${show.title}</p>
								<p>Director: \${show.director}</p>
								<p>Rating: \${show.rating}</p>
								<p>Duration: \${show.duration} minutes</p>
							\`;

							movieCard.appendChild(front);
							movieCard.appendChild(back);

							movieCard.addEventListener('click', () => playVideo(movie.link));

							movieCard.addEventListener('mouseenter', () => {
								movieCard.classList.add('hover');
							});

							movieCard.addEventListener('mouseleave', () => {
								movieCard.classList.remove('hover');
							});

							tvList.appendChild(movieCard);
						});

					});
				}

				// Function to play video
				
				function playVideo(source) {
					const encodedSource = encodeURIComponent(source);
					window.location.href = \`/auth/videoplayer?source=\${encodedSource}\`;
				}
				
			
				////////////////////////////////////////////////


				const movieList = document.getElementById('movie-list');
				movieList.innerHTML = ''; // Clear previous data
				const tvList = document.getElementById('tv-list');
				tvList.innerHTML = ''; // Clear previous data

				movieData.forEach((movie,index) => {

					const movieCard = document.createElement('div');
					movieCard.classList.add('movie-card');

					movieCard.style.display = 'inline-block';
					movieCard.style.marginRight = '30px';

					const front = document.createElement('div');
					front.classList.add('front');
					const image = document.createElement('img');
					image.src = movie.image;
					image.classList.add('movie-image');
					front.appendChild(image);

					const back = document.createElement('div');
					back.classList.add('back');
					back.innerHTML =\`
						<p>Title: \${movie.title}</p>
						<p>Director: \${movie.director}</p>
						<p>Rating: \${movie.rating}</p>
						<p>Duration: \${movie.duration} minutes</p>
					\`;

					movieCard.appendChild(front);
					movieCard.appendChild(back);

					movieCard.addEventListener('click', () => playVideo(movie.link));

					movieCard.addEventListener('mouseenter', () => {
						movieCard.classList.add('hover');
					});

					movieCard.addEventListener('mouseleave', () => {
						movieCard.classList.remove('hover');
					});
					if(index < 1){
						movieList.appendChild(movieCard);
					}else{
						tvList.appendChild(movieCard);
					}
					
				});

				
				////////////////////////////////////////////////////

				//fetchAllData();

			</script>
		</body>
		</html>
`
)
})

router.get("/admin", (req,res)=>{
	res.send(`
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Admin - Video Streaming Project</title>
		<link rel="stylesheet">
		<style>
			/* Additional styles */
			body {
				margin: 0;
				font-family: Arial, sans-serif;
				background-image: url("https://firebasestorage.googleapis.com/v0/b/dbms-project-ac358.appspot.com/o/abc.png?alt=media&token=bd3ab80a-b81b-4a45-be85-57a5261f558e"); 
				background-size: cover;
				background-repeat: no-repeat;
			}
			
			.header {
				background-color: #0D0C22;
				color: #fff;
				padding: 20px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 5px solid; /* Basic solid border */
				border-image: linear-gradient(to left, #2BE498, #2BE498); /* Gradient border from teal to purple */
				border-image-slice: 1; /* Ensure the gradient covers the entire border */
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
			
			
			
			.admin-content {
				width: 80%;
				margin: 20px auto;
				padding: 20px;
				background-color: rgba(244, 244, 244, 0.05);
				border-radius: 10px;
				box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
				text-align: center;
				border: 5px solid #66c2a5; /* Lighter teal border */
				backdrop-filter: blur(3px); /* Blurred background */
			}
			
			
	
			.button.add-movie-button, .button.view-movies-button, .button.cancel-button {
				font-size: 16px;
				padding: 10px 20px;
				border: none;
				border-radius: 5px;
				cursor: pointer;
				transition: background-color 0.3s ease, color 0.3s ease;
			}
	
			.button.add-movie-button {
				background-color: #808080;
				color: #fff;
			}
	
			.button.view-movies-button {
				background-color: #4CAF50;
				color: #fff;
			}
	
			.button.cancel-button {
				background-color: #ff6347;
				color: #fff;
			}
	
			.button.add-movie-button:hover, .button.view-movies-button:hover, .button.cancel-button:hover {
				background-color: #555;
				color: #fff;
			}
	
			/* Modal styles */
			.modal {
				display: none;
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: rgba(0,0,0,0.5);
				justify-content: center;
				align-items: center;
			}
	
			.modal-content {
				background-color: #fff;
				padding: 20px;
				border-radius: 8px;
				box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
				text-align: left;
			}
	
			.close {
				cursor: pointer;
				position: absolute;
				top: 10px;
				right: 10px;
				font-size: 20px;
			}
	
			/* Movie element styles */
			.movie-element {
				margin-bottom: 20px;
			}
	
			.remove-movie-button {
				background-color: #ff6347;
				color: #fff;
				border: none;
				padding: 5px 10px;
				border-radius: 5px;
				cursor: pointer;
				margin-left: 10px;
				transition: background-color 0.3s ease, color 0.3s ease;
			}
	
			.remove-movie-button:hover {
				background-color: #ff3e26;
			}
			#addMovieForm {
				position: absolute;
				top: 150%; /* Adjust this value to move the form down */
				left: 50%;
				transform: translate(-50%, -50%);
				/* Add more styling as needed */
			}
			
		</style>
	</head>
	<body>
		<div class="header">
			<h1>Admin - Video Streaming Project</h1>
			<div class="buttons">
				<a href="http://localhost:5000/auth/login" class="button">Logout</a>
			</div>
		</div>
	
		<div class="admin-content">
			<!-- Toggle buttons -->
			<button class="button add-movie-button" onclick="openModal('addMovieForm')">Add Movie</button>
			<button class="button view-movies-button" onclick="showMovies()">View Movies</button>
	
			<!-- Add Movie Modal -->
			<div id="addMovieForm" class="modal">
				<div class="modal-content">
					<span class="close" onclick="closeModal('addMovieForm')">&times;</span>
					<h2 style="text-align: center; margin-bottom: 20px;">Add Movie</h2>
					<label for="title">Title:</label>
					<input type="text" id="title" required style="width: 100%; padding: 8px; margin-bottom: 10px;">
					<label for="director">Director:</label>
					<input type="text" id="director" required style="width: 100%; padding: 8px; margin-bottom: 10px;">
					<label for="rating">Rating:</label>
					<input type="number" id="rating" required step="any" style="width: 100%; padding: 8px; margin-bottom: 10px;">
					<label for="summary">Summary:</label>
					<input type="text" id="summary" required style="width: 100%; padding: 8px; margin-bottom: 10px;">
					<label for="duration">Duration:</label>
					<input type="number" id="duration" required step="any" style="width: 100%; padding: 8px; margin-bottom: 10px;">
					<label for="videoLink">Video Link:</label>
					<input type="text" id="videoLink" required style="width: 100%; padding: 8px; margin-bottom: 10px;">
					<label for="videoLink">Picture Link:</label>
					<input type="text" id="pictureLink" required style="width: 100%; padding: 8px; margin-bottom: 10px;">
					<button class="button add-movie-button" onclick="addMovie()">Submit</button>
					<button class="button cancel-button" onclick="closeModal('addMovieForm')">Cancel</button>
				</div>
			</div>
	
			<!-- View Movies Section -->
			<div id="viewMovies" style="display: none;">
				<h2>View Movies</h2>
				<div class="movie-list" id="admin-movie-list">
					<!-- Display added movies here -->
				</div>
			</div>
		</div>
	
		<script>
			// Your existing script for playing videos
			function playVideo(source) {
				var videoPlayer = document.getElementById('videoPlayer');
				videoPlayer.src = source; // Replace with actual Firebase links
				videoPlayer.load();
				videoPlayer.play();
			}
	
			// Show Add Movie Modal
			function openModal(modalId) {
				document.getElementById(modalId).style.display = 'flex';
			}
	
			// Close Modal
			function closeModal(modalId) {
				document.getElementById(modalId).style.display = 'none';
			}
	
			// Show View Movies Section
			function showMovies() {
				closeModal('addMovieForm');
				document.getElementById('viewMovies').style.display = 'block';
				displayMovies();
			}
	
			// Add Movie Function
			function addMovie() {
				// Get input values
				var title = document.getElementById('title').value;
				var director = document.getElementById('director').value;
				var rating = parseFloat(document.getElementById('rating').value);
				var summary = document.getElementById('summary').value;
				var duration = parseFloat(document.getElementById('duration').value);
				var videoLink = document.getElementById('videoLink').value;
				var pictureLink = document.getElementById('pictureLink').value;
				
				var data = {
					title: title,
					director: director,
					rating: rating,
					summary: summary,
					duration: duration,
					video_link: videoLink,
					picture_link: pictureLink
				  };
				  
				  // Convert the data object to JSON
				  var jsonData = JSON.stringify(data);
				  console.log(jsonData)
				  
				  // Define the API endpoint URL
				  var apiUrl = 'http://localhost:8080/movie/create';
				  
				  // Make a POST request using fetch
				  fetch(apiUrl, {
					method: 'POST',
					headers: {
					  'Content-Type': 'application/json'
					},
					body: jsonData
				  })
					.then(response => response.json())
					.then(data => {
					  // Handle the response from the API
					  console.log('Success:', data);
					})
					.catch(error => {
					  // Handle any errors that occurred during the fetch
					  console.error('Error:', error);
					});
	
				// Create a new movie element
				var movieElement = document.createElement('div');
				movieElement.classList.add('big-button', 'movie-element');
				movieElement.innerHTML = \`
					<p>Title: \${title}</p>
					<p>Director: \${director}</p>
					<p>Rating: \${rating}</p>
					<p>Duration: \${duration} minutes</p>
					<button onclick="playVideo('\${videoLink}')">Play</button>
					<button class="remove-movie-button" onclick="removeMovie(this)">Remove</button>
				\`;
	
				// Append the movie element to the movie list
				var movieList = document.getElementById('admin-movie-list');
				movieList.appendChild(movieElement);
	
				// Clear the form
				closeModal('addMovieForm');
				document.getElementById('title').value = '';
				document.getElementById('director').value = '';
				document.getElementById('rating').value = '';
				document.getElementById('duration').value = '';
				document.getElementById('videoLink').value = '';
			}
	
			// Remove Movie Function
			function removeMovie(button) {
				var movieElement = button.parentElement;
				movieElement.remove();
			}
	
			// Display Movies in View Movies Section
			function displayMovies() {
				// You can add pre-existing movies here if needed
				// For example:
				// var preExistingMovies = [...];
				// preExistingMovies.forEach(movie => addMovieToView(movie));
			}
	
			// Function to add pre-existing movies to the View Movies section
			// function addMovieToView(movie) {
			//     // Similar logic as addMovie() to create and append movie elements
			// }
		</script>
	</body>
	</html>
`
)
})

router.get("/videoplayer", (req,res)=>{
	const videoSource = req.query.source;
	res.send(`
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Video Player</title>
			<style>
		/* Additional styles for the video player page */

		body {
			margin: 0;
			font-family: Arial, sans-serif;
			background-image: url('https://firebasestorage.googleapis.com/v0/b/dbms-project-ac358.appspot.com/o/abc.png?alt=media&token=bd3ab80a-b81b-4a45-be85-57a5261f558e'); 
			background-size: cover;
			background-repeat: no-repeat;
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
				

		body {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100vh;
			margin: 0;
		}

		.video-container {
			height: 90%;
			width: 100%;
			max-width: 800px; /* Adjust the max-width as needed */
			box-sizing: border-box;
			overflow: hidden;
			text-align: center;
			background-color: #fff;
			background-color: rgba(255, 255, 255, 0.6);
			border-radius: 8px;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
			padding: 30px;
			margin: 30px;
			border: 5px solid #2BE498;
		}

		video {
			width: 100%;
			height: auto;
			border-radius: 8px;
			margin-bottom: 20px;
		}



		p {
			font-size: 16px;
			line-height: 1.6;
			margin-bottom: 10px;
		}

		.back-button {
			background-color: #606060;
			color: #fff;
			font-size: 16px;
			padding: 10px 20px;
			border: none;
			border-radius: 5px;
			cursor: pointer;
			transition: background-color 0.3s ease, color 0.3s ease;
		}

		.back-button:hover {
			background-color: #555;
			color: #fff;
		}

			</style>
		</head>
		<body>
			<div class="video-container">
				<h1>Playing Now</h1>
				<video controls>
					<source src="${videoSource}" type="video/mp4">
						Your browser does not support the video tag.
				</video>
			</div>
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