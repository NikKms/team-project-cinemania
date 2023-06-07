import { getGenre } from '../api';
import { parsedFilms, parsedFilmsGenreIds, clearLibrary } from './lib-storage';
import {
  renderLibMoviesListMarkup,
  renderLibSelectMarkup,
} from './lib-markups';
import { libRefs } from './lib-refs';
import { LoadMoreBtn } from './loadMoreBtn';

const { libSelectEl, libMoviesListEl, libLoadMoreBtn, libClearBtn } = libRefs;

const loadMore = new LoadMoreBtn({
  btnEl: libLoadMoreBtn,
});

let selectedGenre = '1';
const movieByStep = 9;
let totalMoviesLoaded = 0;

const getFilteredGenres = async movieGenresIds => {
  const { genres } = await getGenre();

  return genres.filter(({ id }) => movieGenresIds.includes(id));
};

const renderFilteredGenres = async moviesArr => {
  const filteredGenres = await getFilteredGenres(moviesArr);
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
    const filteredMovies = parsedFilms.filter(movie =>
      movie.genres.some(genre => genre.id === parseInt(selectedValue))
    );
    loadMovies(filteredMovies);
    checkArrLength(filteredMovies);
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

const onClearBtnClick = () => {
  clearLibrary();
};

libSelectEl.addEventListener('change', onLibSelectChange);

window.addEventListener('load', () => {
  renderFilteredGenres(parsedFilmsGenreIds);
  loadMovies(parsedFilms);
  checkArrLength(parsedFilms);
});

libLoadMoreBtn.addEventListener('click', onLoadBtnClick);
const onClick = evt => {
  console.log(evt.target);
};

libMoviesListEl.addEventListener('click', onClick);

libClearBtn.addEventListener('click', onClearBtnClick);

export { getGenreName };
