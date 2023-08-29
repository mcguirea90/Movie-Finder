// http://www.omdbapi.com/?i=tt3896198&apikey=5a7bc394

const movieResultsEl = document.querySelector('.movie__results');
const searchTitleEl = document.querySelector('.title');
const loadingSpinEl = document.querySelector('.loading');
const sortEl = document.querySelector('#sort');

async function renderMovies(sort) {
    setTimeout(() => {
        loadingSpinEl.classList += ' movies__loading--spinner';
    }, 500);

    movieResultsEl.style.visibility = 'hidden';

    const movieTitles = await fetch(
        `https://www.omdbapi.com/?apikey=5a7bc394&s=${title}`
    );
    const movieTitleData = await movieTitles.json();

    const movieTitlesArray = movieTitleData.Search.slice(0, 6);

    if (sort === 'new_to_old') {
        movieTitlesArray.sort((a, b) => b.Year - a.Year);
    } else if (sort === 'old_to_new') {
        movieTitlesArray.sort((a, b) => a.Year - b.Year);
    }

    setTimeout(() => {
        movieResultsEl.style.visibility = 'visible';
        movieResultsEl.innerHTML = movieTitlesArray
            .map((movie) => movieHTML(movie))
            .join('');
        searchTitleEl.innerHTML = `Results for: ${title}`;
        sortEl.style.display = 'flex';
        loadingSpinEl.classList.remove('movies__loading');
    }, 1200);
}

function onSearchChange(event) {
    title = event.target.value;
    event.preventDefault();
    renderMovies();
}

function movieHTML(movie) {
    return `<div class="movie">
    <figure class="movie__poster">
      <img class="movie__cover" src="${movie.Poster}" alt="movie">
    </figure>
    <h4 class="movie__title">${movie.Title}</h4>
    <p class="movie__year">${movie.Year}</p>
  </div>`;
}

function sortMovieYear(event) {
    renderMovies(event.target.value);
}

function openMenu() {
    document.body.classList += " menu--open"
}

function closeMenu() {
    document.body.classList.remove('menu--open')
}