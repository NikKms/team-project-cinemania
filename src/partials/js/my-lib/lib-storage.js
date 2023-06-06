import { Notify } from 'notiflix';
import { libRefs } from './lib-refs';

const localMoviesArr = JSON.parse(localStorage.getItem('films')) || [];

const clearLibrary = () => {
  localStorage.removeItem('films');
};

const addFilmToStorage = film => {
  const filmId = film.id;
  const isFilmExists = localMoviesArr.some(({ id }) => id === filmId);

  if (!isFilmExists) {
    localMoviesArr.unshift(film);
    localStorage.setItem('films', JSON.stringify(localMoviesArr));
    Notify.success('Film was added to library successfully');
    return;
  }
  alert('!!!');
  // removeItemFromLocalStorage(film.id);
};

const removeItemFromLocalStorage = id => {
  const items = JSON.parse(localStorage.getItem('films')) || [];

  const index = items.findIndex(item => item.id === id);

  if (index !== -1) {
    items.splice(index, 1);
    localStorage.setItem('films', JSON.stringify(items));
  }
};

const getParsedFilms = () => {
  try {
    const filmsArr = localStorage.getItem('films');
    return JSON.parse(filmsArr) || [];
  } catch (error) {
    console.error(error);
  }
};

const parsedFilms = getParsedFilms();

const parsedFilmsGenreIds = [
  ...new Set(parsedFilms.flatMap(({ genres }) => genres.map(({ id }) => id))),
];

export { parsedFilms, parsedFilmsGenreIds, addFilmToStorage, clearLibrary };
