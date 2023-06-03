import { libRefs } from './lib-refs';
import { parsedFilms } from './lib-storage';
import { getMoviesGenres } from '../api';

const { libSelectEl, libMovieListEl, libLoadMoreBtn } = libRefs;

const parsedFilmsGenreIds = parsedFilms.flatMap(({ genre_ids }) => genre_ids);

const getGenres = async moviesGenreIds => {
  const { genres } = await getMoviesGenres();
  const genresForRender = genres.filter(({ id }) =>
    moviesGenreIds.includes(id)
  );
  renderLibSelectMarkup(genresForRender);
};

const createLibSelectMarkup = genre => {
  return `<option value="${genre.id}">${genre.name}</option>`;
};

const renderLibSelectMarkup = genresArr => {
  const libSelectMarkupEls = genresArr.map(genre =>
    createLibSelectMarkup(genre)
  );
  libSelectEl.insertAdjacentHTML('beforeend', libSelectMarkupEls.join(','));
};

const renderLibMovieListMarkup = movies => {
  const libMovieListMarkup = movies.map(movie =>
    createLibMovieListMarkup(movie)
  );
  libMovieListEl.insertAdjacentHTML('beforeend', libMovieListMarkup.join(','));
};

const createLibMovieListMarkup = ({
  title,
  name,
  release_date,
  first_air_date,
}) => {
  const movieTitle = title || name;
  const movieReleaseYear = release_date || first_air_date;
  return `<li><h3>${movieTitle}</h3><p>${movieReleaseYear.substring(
    0,
    4
  )}</p></li>`;
};

const onLibSelectChange = evt => {
  const selectedValue = evt.target.value;

  filterMovieListByGenre(selectedValue);
};

const filterMovieListByGenre = selectedValue => {
  clearHTML();
  if (selectedValue === '1') renderLibMovieListMarkup(parsedFilms);
  const movieGenreById = parsedFilms.filter(({ genre_ids }) =>
    genre_ids.includes(parseInt(selectedValue))
  );
  renderLibMovieListMarkup(movieGenreById);
};

getGenres(parsedFilmsGenreIds);

libSelectEl.addEventListener('change', onLibSelectChange);

window.addEventListener('load', renderLibMovieListMarkup(parsedFilms));

const clearHTML = () => {
  libMovieListEl.innerHTML = '';
};
