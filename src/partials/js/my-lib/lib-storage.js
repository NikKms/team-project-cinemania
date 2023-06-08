import { Report } from 'notiflix';
const localMoviesArr = JSON.parse(localStorage.getItem('films')) || [];

const addFilmToStorage = ({
  poster_path,
  title,
  name,
  first_air_date,
  release_date,
  vote_average,
  id,
  genres,
  genre_ids,
}) => {
  const genresIds =
    genres && genres.length > 0 ? genres.map(genre => genre.id) : genre_ids;

  const isFilmExists = localMoviesArr.some(movie => movie.id === id);

  if (!isFilmExists) {
    localMoviesArr.unshift({
      poster_path,
      title,
      name,
      first_air_date,
      release_date,
      vote_average,
      id,
      genresIds,
    });
    localStorage.setItem('films', JSON.stringify(localMoviesArr));
    Report.success(
      'Film was added to the library',
      'Go to the library and check it :)'
    );
    return;
  }
  Report.failure(
    'Is added already',
    "Sorry, but you've already added this film to your library "
  );
  // removeItemFromLocalStorage(film.id);
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
  ...new Set(parsedFilms.flatMap(film => film.genresIds)),
];

console.log('parsedFilmsGenreIds: ', parsedFilmsGenreIds);

export { parsedFilms, parsedFilmsGenreIds, addFilmToStorage };
