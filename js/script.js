const photoURL = 'https://image.tmdb.org/t/p/w500/';
const global = {
  currentPage: window.location.pathname,
};

// Display 20 most popular movies
const displayPopularMovies = async () => {
  const { results } = await fetchAPIData('movie/popular');
  results.forEach((movie) => {
    const popularMovie = document.getElementById('popular-movies');
    const card = document.createElement('div');
    card.classList.add('card');
    popularMovie.appendChild(card);
    card.innerHTML = `
    <a href="movie-details.html?id=${movie.id}">
      <img
        src="${photoURL}${movie.poster_path}"
        class="card-img-top"
        alt="Movie Title"
      />
    </a>
    <div class="card-body">
      <h5 class="card-title">${movie.title}</h5>
      <p class="card-text">
        <small class="text-muted">Release: ${movie.release_date}</small>
      </p>
    </div>
  `;
  });
};
// Display 20 most popular tv shows
const displayPopularShows = async () => {
  const { results } = await fetchAPIData('tv/popular');

  results.forEach((show) => {
    const showDiv = document.getElementById('popular-shows');
    const div = document.createElement('div');
    div.classList.add('card');
    showDiv.appendChild(div);
    div.innerHTML = `
          <a href="tv-details.html?id=${show.id}">
            ${
              show.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />`
                : `<img
            src="../images/no-image.jpg"
            class="card-img-top"
            alt="${show.name}"
          />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Air Date: ${show.first_air_date}</small>
            </p>
          </div>
        `;
  });
};

const fetchAPIData = async (endpoint) => {
  showSpinner();
  const API_KEY = '17053943b64558ad816e53c9525dc33c';
  const API_URL = 'https://api.themoviedb.org/3/';
  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();
  hideSpinner();
  return data;
};

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

// Highlight active link
function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}

// Init App
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      break;
    case '/shows.html':
      displayPopularShows();
      break;
    case '/movie-details.html':
      console.log('Movie Details');
      break;
    case '/tv-details.html':
      console.log('TV Details');
      break;
    case '/search.html':
      console.log('Search');
      break;
  }

  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
displayPopularShows();
displayPopularMovies();
