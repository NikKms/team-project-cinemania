import { getGenre } from '../api';
import { parsedFilms, parsedFilmsGenreIds } from './lib-storage';
import {
  renderLibMoviesListMarkup,
  renderLibSelectMarkup,
} from './lib-markups';
import { libRefs } from './lib-refs';
import { LoadMoreBtn } from './loadMoreBtn';
import { Notify } from 'notiflix';

const {
  libSelectEl,
  libMoviesListEl,
  libLoadMoreBtn,
  libClearBtn,
  libContainerEL,
} = libRefs;

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

const getGenreName = async movieGenreIds => {
  const filteredGenres = await getFilteredGenres(movieGenreIds);
  const genreNames = filteredGenres.map(({ name }) => name);
  return genreNames.slice(0, 2).join(', ');
};

const renderFilteredGenres = async moviesArr => {
  const filteredGenres = await getFilteredGenres(moviesArr);
  renderLibSelectMarkup(filteredGenres);
};

const onLibSelectChange = () => {
  selectedGenre = libSelectEl.value;
  totalMoviesLoaded = 0;
  clearHTML();
  loadMoviesByGenre(selectedGenre);
};

const loadMovies = moviesArr => {
  const slicedArr = moviesArr.slice(
    totalMoviesLoaded,
    totalMoviesLoaded + movieByStep
  );

  totalMoviesLoaded += movieByStep;
  renderLibMoviesListMarkup(slicedArr);
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
      movie.genresIds.includes(parseInt(selectedValue))
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

const clearLibrary = () => {
  localStorage.removeItem('films');
  libContainerEL.innerHTML = '';
  renderNotification();
  Notify.success('Library was cleared succesfully');
};

const renderNotification = () => {
  const notification = `<h2 class="lib-empty-message">OOOPS...<br>We are very sorry!<br>You don't have any movies at your library.</h2>
  <a class="lib-link-search" href="./catalog.html"> Search movie</a>`;
  libContainerEL.insertAdjacentHTML('beforeend', notification);
};
const onClearBtnClick = () => {
  clearLibrary();
};

libSelectEl.addEventListener('change', onLibSelectChange);

window.addEventListener('load', () => {
  if (!parsedFilms.length) {
    libContainerEL.innerHTML = '';
    renderNotification();
    return;
  }
  renderFilteredGenres(parsedFilmsGenreIds);
  loadMovies(parsedFilms);
  checkArrLength(parsedFilms);
});

libLoadMoreBtn.addEventListener('click', onLoadBtnClick);

libClearBtn.addEventListener('click', onClearBtnClick);

export { getGenreName };
