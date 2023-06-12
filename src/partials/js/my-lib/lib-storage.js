import { Report } from 'notiflix';

const getParsedFilms = () => {
  try {
    const filmsArr = localStorage.getItem('films');
    return JSON.parse(filmsArr) || [];
  } catch (error) {
    console.error(error);
  }
};

const localMoviesArr = getParsedFilms() || [];

const handleFilmInStorage = (item, btnEl) => {
  const films = localMoviesArr;
  const isFilmExists = films.some(id => id === item.id);
  if (!isFilmExists) {
    addMovieToLib(item.id);
    btnEl.textContent = 'Remove from my library';
    return;
  }

  removeMovieFromLib(item.id);
  btnEl.textContent = 'Add to my library';
};

const isFilmInLocalStorage = (id, btnEl) => {
  try {
    const films = localMoviesArr;
    const filmExists = films.some(filmId => filmId === id);
    if (filmExists) {
      btnEl.textContent = 'Remove from the library';
    }
  } catch (error) {
    console.log(error);
  }
};

const addMovieToLib = id => {
  const movieId = id;
  localMoviesArr.unshift(movieId);
  localStorage.setItem('films', JSON.stringify(localMoviesArr));
  Report.success(
    'Film was added to the library',
    'Go to the library and check it :)'
  );
};

const removeMovieFromLib = id => {
  const index = localMoviesArr.findIndex(movieId => movieId === id);

  if (index !== -1) {
    localMoviesArr.splice(index, 1);
    localStorage.setItem('films', JSON.stringify(localMoviesArr));
  }

  Report.info(
    'Film was removed',
    'You can find something else in our catalog!'
  );
};

export { handleFilmInStorage, isFilmInLocalStorage };
