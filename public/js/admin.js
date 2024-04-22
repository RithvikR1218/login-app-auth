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
            alert('Error:', error)
        });

    // Create a new movie element
    var movieElement = document.createElement('div');
    movieElement.classList.add('big-button', 'movie-element');
    movieElement.innerHTML = `
        <p>Title: ${title}</p>
        <p>Director: ${director}</p>
        <p>Rating: ${rating}</p>
        <p>Duration: ${duration} minutes</p>
        <button class="remove-movie-button" onclick="removeMovie(this)">Remove</button>
    `;

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
    var titleElement = movieElement.querySelector('p:first-child');
    var title = titleElement.textContent.replace('Title: ', ''); // Remove the "Title: " prefix if needed
    var apiUrl = 'http://localhost:8080/movie/delete';
    apiUrl = apiUrl + '/' + encodeURIComponent(title);
    movieElement.remove();
    
    // Make a POST request using fetch
    fetch(apiUrl, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    },
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the API
        console.log('Success:', data);
    })
    .catch(error => {
        // Handle any errors that occurred during the fetch
        alert('Error:', error)
    });
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