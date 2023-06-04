import { getTrending } from '../api';

getTrending().then(response =>
  localStorage.setItem('test', JSON.stringify(response.results))
);

const getParsedFilms = () => {
  try {
    const filmsArr = localStorage.getItem('test');
    return JSON.parse(filmsArr);
  } catch (error) {
    console.error(error);
  }
};

const parsedFilms = getParsedFilms();
console.log('parsedFilms: ', parsedFilms);
const parsedFilmsGenreIds = parsedFilms.flatMap(({ genre_ids }) => genre_ids);

export { parsedFilms, parsedFilmsGenreIds };
