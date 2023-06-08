import { Report } from 'notiflix';
import { libRefs } from './lib-refs';

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
console.log('parsedFilms: ', parsedFilms);

const parsedFilmsGenreIds = [
  ...new Set(
    parsedFilms.flatMap(film =>
      film.genresIds && film.genresIds.length > 0 ? film.genresIds : []
    )
  ),
];

console.log('parsedFilmsGenreIds: ', parsedFilmsGenreIds);

export { parsedFilms, parsedFilmsGenreIds, addFilmToStorage };
