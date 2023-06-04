import { libRefs } from './lib-refs';
import { parsedFilms, parsedFilmsGenreIds } from './lib-storage';
import { getMoviesGenres } from '../api';
import { renderLibMoviesListMarkup, renderLibSelectMarkup } from './lib-markup';

const { libSelectEl, libMoviesListEl, libLoadMoreBtn } = libRefs;

const initialMoviesCount = 9;

let loadedMoviesCount = initialMoviesCount;

const getFilteredGenres = async moviesGenreIds => {
  const { genres } = await getMoviesGenres();
  return genres.filter(({ id }) => moviesGenreIds.includes(id));
};
const getGenreName = async movieGenreIds => {
  const filteredGenres = await getFilteredGenres(movieGenreIds);
  const genreNames = Promise.all(filteredGenres.map(({ name }) => name));
  return (await genreNames).slice(0, 2).join(', ');
};

const renderFilteredGenres = async moviesGenreIds => {
  const filteredGenres = await getFilteredGenres(moviesGenreIds);
  renderLibSelectMarkup(filteredGenres);
};

const onLibSelectChange = evt => {
  const selectedValue = evt.target.value;

  filterMoviesListByGenre(selectedValue);
};

const filterMoviesListByGenre = selectedValue => {
  clearHTML();
  if (selectedValue === '1')
    renderLibMoviesListMarkup(parsedFilms, initialMoviesCount);
  const moviesGenreById = parsedFilms.filter(({ genre_ids }) =>
    genre_ids.includes(parseInt(selectedValue))
  );
  renderLibMoviesListMarkup(moviesGenreById, 0,  initialMoviesCount);
};

const onLoadBtnClick = () => {};

const clearHTML = () => {
  libMoviesListEl.innerHTML = '';
};

libSelectEl.addEventListener('change', onLibSelectChange);

window.addEventListener('load', () => {
  renderFilteredGenres(parsedFilmsGenreIds);
  renderLibMoviesListMarkup(parsedFilms, 0, initialMoviesCount);
});

libLoadMoreBtn.addEventListener('click', onLoadBtnClick);

export { getGenreName };
