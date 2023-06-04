import { getGenre } from '../api';
import { parsedFilms, parsedFilmsGenreIds } from './lib-storage';
import { libRefs } from './lib-refs';
import { renderLibMoviesListMarkup, renderLibSelectMarkup } from './lib-markup';

const { libSelectEl, libMoviesListEl, libLoadMoreBtn } = libRefs;

const movieByStep = 9;
let totalMoviesLoaded = 0;

const getFilteredGenres = async moviesGenreIds => {
  const { genres } = await getGenre();
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

const loadMovies = moviesArr => {
  const slicedArr = moviesArr.slice(
    totalMoviesLoaded,
    totalMoviesLoaded + movieByStep
  );

  totalMoviesLoaded += movieByStep;
  renderLibMoviesListMarkup(slicedArr);
};

const onLibSelectChange = evt => {
  const selectedValue = evt.target.value;
  totalMoviesLoaded = 0;
  clearHTML();
  filterMoviesListByGenre(selectedValue);
};

const filterMoviesListByGenre = selectedValue => {
  if (selectedValue === '1') loadMovies(parsedFilms);
  const moviesGenreById = parsedFilms.filter(({ genre_ids }) =>
    genre_ids.includes(parseInt(selectedValue))
  );
  loadMovies(moviesGenreById);
};

const onLoadBtnClick = () => {};

const clearHTML = () => {
  libMoviesListEl.innerHTML = '';
};

libSelectEl.addEventListener('change', onLibSelectChange);

window.addEventListener('load', () => {
  renderFilteredGenres(parsedFilmsGenreIds);
  loadMovies(parsedFilms);
});

libLoadMoreBtn.addEventListener('click', onLoadBtnClick);

export { getGenreName };
