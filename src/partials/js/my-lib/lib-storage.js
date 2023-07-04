import { Report } from 'notiflix';

const getParsedFilms = () => {
  try {
    const filmsArr = localStorage.getItem('films');
    return JSON.parse(filmsArr) || [];
  } catch (error) {
    console.error(error);
  }
};

const parsedFilms = getParsedFilms() || [];

const handleFilmInStorage = (
  {
    poster_path,
    title,
    name,
    first_air_date,
    release_date,
    vote_average,
    id,
    genres,
    genre_ids,
  },
  btnEl
) => {
  const films = parsedFilms;
  let currentUrl = window.location.href;
  if (currentUrl.includes('my-lib-page.html')) {
    window.location.reload();
  }
  const genresIds =
    genres && genres.length > 0 ? genres.map(genre => genre.id) : genre_ids;

  const film = {
    poster_path,
    title,
    name,
    first_air_date,
    release_date,
    vote_average,
    id,
    genresIds,
  };
  const isFilmExists = films.some(film => film.id === id);

  if (!isFilmExists) {
    addMovieToLib(film);
    btnEl.textContent = 'Remove from my library';
    return;
  }

  removeMovieFromLib(id);
  btnEl.textContent = 'Add to my library';
};

const isFilmInLocalStorage = (id, btnEl) => {
  try {
    const films = parsedFilms;
    const filmExists = films.some(film => film.id === id);
    if (filmExists) {
      btnEl.textContent = 'Remove from the library';
    }
  } catch (error) {
    console.log(error);
  }
};

const addMovieToLib = film => {
  const movie = film;
  parsedFilms.unshift(movie);
  localStorage.setItem('films', JSON.stringify(parsedFilms));
  Report.success(
    'Film was added to the library',
    'Go to the library and check it :)'
  );
};

const removeMovieFromLib = id => {
  const index = parsedFilms.findIndex(film => film.id === id);
  parsedFilms.splice(index, 1);

  if (index !== -1) {
    localStorage.setItem('films', JSON.stringify(parsedFilms));
  }

  Report.info(
    'Film was removed',
    'You can find something else in our catalog!'
  );
};

const parsedFilmsGenreIds = [
  ...new Set(parsedFilms.flatMap(film => film.genresIds)),
];

export {
  handleFilmInStorage,
  isFilmInLocalStorage,
  parsedFilms,
  parsedFilmsGenreIds,
};
