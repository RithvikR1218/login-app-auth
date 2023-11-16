const express = require("express")
const router = express.Router()

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
    `)
})

module.exports = router