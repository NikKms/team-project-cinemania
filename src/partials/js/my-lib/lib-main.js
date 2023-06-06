import { getGenre } from '../api';
import { parsedFilms, parsedFilmsGenreIds } from './lib-storage';
import {
  renderLibMoviesListMarkup,
  renderLibSelectMarkup,
} from './lib-markups';
import { libRefs } from './lib-refs';
import { LoadMoreBtn } from './loadMoreBtn';

const { libSelectEl, libMoviesListEl, libLoadMoreBtn } = libRefs;

const loadMore = new LoadMoreBtn({
  btnEl: libLoadMoreBtn,
});

let selectedGenre = '1';
const movieByStep = 9;
let totalMoviesLoaded = 0;

const getFilteredGenres = async moviesGenreIds => {
  const { genres } = await getGenre();
  return genres.filter(({ id }) => moviesGenreIds.includes(id));
};

const getGenreName = async movieGenreIds => {
  const filteredGenres = await getFilteredGenres(movieGenreIds);
  const genreNames = filteredGenres.map(({ name }) => name);
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

const onLibSelectChange = () => {
  selectedGenre = libSelectEl.value;
  totalMoviesLoaded = 0;
  clearHTML();
  loadMoviesByGenre(selectedGenre);
};

const loadMoviesByGenre = selectedValue => {
  filterMoviesListByGenre(selectedValue);
};

const filterMoviesListByGenre = selectedValue => {
  if (selectedValue === '1') {
    loadMovies(parsedFilms);
    checkArrLength(parsedFilms);
  } else {
    const moviesGenreById = parsedFilms.filter(({ genre_ids }) =>
      genre_ids.includes(parseInt(selectedValue))
    );
    loadMovies(moviesGenreById);
    checkArrLength(moviesGenreById);
  }
};

const checkArrLength = moviesArr => {
  if (moviesArr.length <= totalMoviesLoaded) {
    loadMore.hideBtn();
  } else {
    loadMore.showBtn();
  }
};

const onLoadBtnClick = () => {
  loadMore.disableBtn();
  loadMoviesByGenre(selectedGenre);
  loadMore.enableBtn();
};

const clearHTML = () => {
  libMoviesListEl.innerHTML = '';
};

libSelectEl.addEventListener('change', onLibSelectChange);

window.addEventListener('load', async () => {
  await renderFilteredGenres(parsedFilmsGenreIds);
  loadMovies(parsedFilms);
});

libLoadMoreBtn.addEventListener('click', onLoadBtnClick);

export { getGenreName };
