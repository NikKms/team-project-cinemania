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
}) => {
  const genreNames = await getGenreName(genre_ids);
  const movieTitle = title || name;
  const movieReleaseYear = release_date || first_air_date;
  return `<li><h3>${movieTitle}</h3><p>${genreNames} | ${movieReleaseYear.substring(
    0,
    4
  )}</p></li>`;
};

const renderLibSelectMarkup = genresArr => {
  const libSelectMarkupEls = genresArr.map(genre =>
    createLibSelectMarkup(genre)
  );
  libSelectEl.insertAdjacentHTML('beforeend', libSelectMarkupEls.join(','));
};

const renderLibMoviesListMarkup = async (movies, x = 0, initialMoviesCount) => {
  const libMovieListMarkup = await Promise.all(
    movies
      .slice(0, initialMoviesCount)
      .map(async movie => await createLibMoviesListMarkup(movie))
  );
  libMoviesListEl.insertAdjacentHTML('beforeend', libMovieListMarkup.join(','));
};

export { renderLibMoviesListMarkup, renderLibSelectMarkup };
