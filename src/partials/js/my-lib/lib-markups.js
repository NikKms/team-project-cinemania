import { libRefs } from './lib-refs';
import { handleDeleteFilm, getGenreName } from './lib-main';

const { libSelectEl, libMoviesListEl } = libRefs;

const createLibSelectMarkup = genre => {
  return `<option class="option-item" value="${genre.id}">${genre.name}</option>`;
};

const createLibMoviesListMarkup = async ({
  title,
  name,
  release_date,
  first_air_date,
  genresIds,
  poster_path,
  vote_average,
  id,
}) => {
  const genreName = await getGenreName(genresIds);
  const movieTitle = title || name;
  const movieReleaseYear = release_date || first_air_date;
  let imagePath;
  if (poster_path !== null) {
    imagePath = `https://image.tmdb.org/t/p/original/${poster_path}`;
  } else {
    imagePath =
      'https://d2ths1nqi4sbhh.cloudfront.net/images/no-image.png?v=3884857787';
  }
  return `<li class="mylibrary_movie is-id"  data-id=${id}>
  <div class="mylibrary_dark">
  <img src="https://image.tmdb.org/t/p/original${poster_path}" alt="${movieTitle}" />
  </div>
 <div class="mylibrary_overlay"></div>
  <div class="mylibrary_info">
  <h3 class="mylibrary_movies_name">${movieTitle}</h3>
  <p class="mylibrary_genre_movie">${genreName} | ${movieReleaseYear.substring(
    0,
    4
  )}</p>
  </div>
<div class="hero_star_raiting">
 <span>
<div class="Stars thisstars" style="--rating: ${
    vote_average / 2
  }; " aria-label="Rating of this product is ${(vote_average / 2).toFixed(
    1
  )} out of 5."></div>
  </div>
  </span>   
  </li>`;
};

const renderLibSelectMarkup = async genresArr => {
  const libSelectMarkupEls = await Promise.all(
    genresArr.map(genre => createLibSelectMarkup(genre))
  );
  libSelectEl.insertAdjacentHTML('beforeend', libSelectMarkupEls.join(' '));
};

const renderLibMoviesListMarkup = async movies => {
  const libMovieListMarkup = await Promise.all(
    movies.map(movie => createLibMoviesListMarkup(movie))
  );
  libMoviesListEl.insertAdjacentHTML('beforeend', libMovieListMarkup.join(' '));

  const deleteFilmButtons =
    libMoviesListEl.querySelectorAll('.delete-film-btn');

  deleteFilmButtons.forEach(button => {
    button.addEventListener('click', handleDeleteFilm);
  });
};

export { renderLibMoviesListMarkup, renderLibSelectMarkup };
