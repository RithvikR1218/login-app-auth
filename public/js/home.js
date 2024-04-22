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
                    image.src = movie.picture_link;
                    image.classList.add('movie-image');
                    front.appendChild(image);

                    const back = document.createElement('div');
                    back.classList.add('back');
                    back.innerHTML =`
                        <p>Title: ${movie.title}</p>
                        <p>Director: ${movie.director}</p>
                        <p>Rating: ${movie.rating}</p>
                        <p>Duration: ${movie.duration} minutes</p>
                    `;

                    movieCard.appendChild(front);
                    movieCard.appendChild(back);

                    movieCard.addEventListener('click', () => playVideo(movie.video_link));

                    movieCard.addEventListener('mouseenter', () => {
                        movieCard.classList.add('hover');
                    });

                    movieCard.addEventListener('mouseleave', () => {
                        movieCard.classList.remove('hover');
                    });
                    if(index < 3){
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
                    back.innerHTML = `
                        <p>Title: \${show.title}</p>
                        <p>Director: \${show.director}</p>
                        <p>Rating: \${show.rating}</p>
                        <p>Duration: \${show.duration} minutes</p>
                    `;

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
            window.location.href = `/auth/videoplayer?source=${encodedSource}`;
        }
        ////////////////////////////////////////////////
        fetchAllData();
