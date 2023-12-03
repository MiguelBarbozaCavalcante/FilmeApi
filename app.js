const apiKey = '6de28826330c3945921d863d996df652'; 

async function fetchPopularMovies() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error('Erro ao buscar filmes populares:', error);
    }
}

async function searchMovies() {
    const searchTerm = document.getElementById('searchInput').value;

    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            displayMovies(data.results);
        } else {
            alert('Nenhum filme encontrado.');
        }
    } catch (error) {
        console.error('Erro ao buscar filmes:', error);
    }
}

function displayMovies(movies) {
    const moviesList = document.getElementById('moviesList');
    moviesList.innerHTML = '';

    movies.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('movie-card');

        const posterUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        card.innerHTML = `
            <img src="${posterUrl}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p class="movie-details">${movie.overview}</p>
            <button onclick="showMovieDetails(${movie.id})">Detalhes</button>
        `;

        moviesList.appendChild(card);
    });
}

async function showMovieDetails(movieId) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
        const movieDetails = await response.json();

        
        const detailsPage = document.createElement('div');
        detailsPage.innerHTML = `
            <h2>${movieDetails.title}</h2>
            <img src="https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}" alt="${movieDetails.title}">
            <p><strong>Sinopse:</strong> ${movieDetails.overview}</p>
            <p><strong>Nota:</strong> ${movieDetails.vote_average}</p>
            <p><strong>Data de Lançamento:</strong> ${movieDetails.release_date}</p>
            <p><strong>Gêneros:</strong> ${movieDetails.genres.map(genre => genre.name).join(', ')}</p>
            <p><strong>Elenco:</strong> ${await getMovieCast(movieId)}</p>
        `;

        document.body.appendChild(detailsPage);
    } catch (error) {
        console.error('Erro ao obter detalhes do filme:', error);
    }
}

async function getMovieCast(movieId) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`);
        const castData = await response.json();

        const castNames = castData.cast.slice(0, 5).map(actor => actor.name);
        return castNames.join(', ');
    } catch (error) {
        console.error('Erro ao obter elenco do filme:', error);
        return 'Informação não disponível';
    }
}


fetchPopularMovies();




