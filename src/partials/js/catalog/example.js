import axios from 'axios';
import { getByQuery, getMovie } from '../api';

const API_KEY = '88b8a7c5d221d3120fb29d734050dc7d';

const createDataCards = async () => {
  //////////////////////////////////////////
  const str = 'ghosted';
  const res = await getByQuery(str, 1);
  const { results } = res;
  //////////////////////////////////////////

  const genre = await fetchGenre();
  const newCardsDate = results.map(
    ({
      id,
      title,
      //original_language,
      poster_path,
      vote_average,
      genre_ids,
      release_date,
    }) => {
      return {
        id: id,
        title: title,
        //language: original_language,
        poster: poster_path,
        rating: vote_average,
        genres: createGenreStr(genre, genre_ids),
        date: createMovieDate(release_date),
      };
    }
  );
  return newCardsDate;
};

const fetchGenre = async () => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
  );
  const { genres } = data;
  return genres;
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

createDataCards().then(res => console.log(res));

export { createDataCards };
