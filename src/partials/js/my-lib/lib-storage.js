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

export { parsedFilms };
