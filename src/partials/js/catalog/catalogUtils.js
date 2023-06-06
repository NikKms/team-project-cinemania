import { fetchGenre } from './catalogApi';
import { createCards } from './createCards';

const createDataCards = async moviesData => {
  //console.log(moviesData);
  const genre = await fetchGenre();
  const newCardsDate = moviesData.map(
    ({ id, title, poster_path, vote_average, genre_ids, release_date }) => {
      return {
        id: id,
        title: title,
        poster: poster_path,
        rating: vote_average,
        genres: createGenreStr(genre, genre_ids),
        date: createMovieDate(release_date),
      };
    }
  );
  createCards(newCardsDate);
};

const createGenreStr = (genre, genre_ids) => {
  const genres = [];
  genre.map(({ id, name }) => {
    if (genre_ids.indexOf(id) !== -1) {
      genres.push(name);
    }
  });
  return genres.join(',');
};

const createMovieDate = dateString => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  return year;
};

const saveLocal = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const loadLocal = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

export {
  createDataCards,
  createGenreStr,
  createMovieDate,
  saveLocal,
  loadLocal,
};
