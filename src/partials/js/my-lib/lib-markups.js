import { libRefs } from './lib-refs';
import { getGenreName } from './lib-main';

const { libSelectEl, libMoviesListEl, libLoadMoreBtn } = libRefs;

const createLibSelectMarkup = genre => {
  return `<option value="${genre.id}">${genre.name}</option>`;
};

const createLibMoviesListMarkup = async ({
  title,
  name,
  release_date,
  first_air_date,
  genre_ids,
  poster_path,
  vote_average,
}) => {
  const genreNames = await getGenreName(genre_ids);
  const movieTitle = title || name;
  const movieReleaseYear = release_date || first_air_date;
  return ` <li class="mylibrary_movie is-id">
  <div class="mylibrary_poster">
  <img src="https://image.tmdb.org/t/p/original${poster_path}" alt="${movieTitle}" />
      <div class="mylibrary_move_dark"></div>
  </div>
  <h3 class="mylibrary_movies_name">${movieTitle}</h3>
  <p class="mylibrary_genre_movie">${genreNames} | ${movieReleaseYear.substring(
    0,
    4
  )}</p>
  <div class="hero-star-raiting" data-swiper-parallax="-350">
      <span>
          <div class="Stars" style="--rating: ${
            vote_average / 2
          }; " aria-label="Rating of this product is ${(
    vote_average / 2
  ).toFixed(1)} out of 5.">
      </span>
  </div>
</li>`;
};

const renderLibSelectMarkup = genresArr => {
  const libSelectMarkupEls = genresArr.map(genre =>
    createLibSelectMarkup(genre)
  );
  libSelectEl.insertAdjacentHTML('beforeend', libSelectMarkupEls.join(','));
};

const renderLibMoviesListMarkup = async movies => {
  const libMovieListMarkup = await Promise.all(
    movies.map(async movie => await createLibMoviesListMarkup(movie))
  );
  libMoviesListEl.insertAdjacentHTML('beforeend', libMovieListMarkup.join(','));
};

export { renderLibMoviesListMarkup, renderLibSelectMarkup };
