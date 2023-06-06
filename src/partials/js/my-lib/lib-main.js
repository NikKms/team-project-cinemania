import { getGenre } from '../api';
import { parsedFilms, parsedFilmsGenreIds } from './lib-storage';
import {
  renderLibMoviesListMarkup,
  renderLibSelectMarkup,
} from './lib-markups';
import { libRefs } from './lib-refs';

const { libSelectEl, libMoviesListEl, libLoadMoreBtn } = libRefs;
console.log('libLoadMoreBtn:', libLoadMoreBtn);

const movieByStep = 9;
let totalMoviesLoaded = 0;

const getFilteredGenres = async moviesGenreIds => {
  const { genres } = await getGenre();
  return genres.filter(({ id }) => moviesGenreIds.includes(id));
};

const getGenreName = async movieGenreIds => {
  const filteredGenres = await getFilteredGenres(movieGenreIds);
  const genreNames = await Promise.all(filteredGenres.map(({ name }) => name));
  return genreNames.slice(0, 2).join(', ');
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
  if (selectedValue === '1') {
    loadMovies(parsedFilms);
  } else {
    const moviesGenreById = parsedFilms.filter(({ genre_ids }) =>
      genre_ids.includes(parseInt(selectedValue))
    );
    loadMovies(moviesGenreById);
  }
};

const onLoadBtnClick = moviesArr => {
  loadMovies(moviesArr);
};

const clearHTML = () => {
  libMoviesListEl.innerHTML = '';
};

libSelectEl.addEventListener('change', onLibSelectChange);

window.addEventListener('load', async () => {
  await renderFilteredGenres(parsedFilmsGenreIds);
  loadMovies(parsedFilms);
});

libLoadMoreBtn.addEventListener('click', () => onLoadBtnClick(parsedFilms));

// libMoviesListEl.addEventListener('click', ect => {
//   console.log(ect.target);
// });
export { getGenreName };
