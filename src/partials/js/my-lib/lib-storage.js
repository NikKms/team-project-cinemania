import { Report } from 'notiflix';
import { refs } from '../modal';
const localMoviesArr = JSON.parse(localStorage.getItem('films')) || [];

const handleFilmInStorage = ({
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

    if (!refs.addToLibBtn) {
      return;
    } else {
      refs.addToLibBtn.textContent = 'Remove from the library';
    }
    return;
  }

  if (!refs.addToLibBtn) {
    Report.error(
      "Sorry, you've added tis film already",
      'Go to the library and check it!'
    );
    return;
  } else {
    removeItemFromLocalStorage(id);
    refs.addToLibBtn.textContent = 'Add to the library';
    Report.info(
      'Film was removed',
      'You can find something else in our catalog!'
    );
  }
};

const removeItemFromLocalStorage = id => {
  const items = localMoviesArr || [];

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
  ...new Set(parsedFilms.flatMap(film => film.genresIds)),
];


export { parsedFilms, parsedFilmsGenreIds, handleFilmInStorage };
