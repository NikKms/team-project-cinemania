import Pagination from './pagination';
import { getByQuery } from '../api';
import { createDataCards, loadLocal } from './catalogUtils';
import axios from 'axios';
import { refs } from '../refs';
import { onLoader, removeLoader } from '../loader';

const API_KEY = '88b8a7c5d221d3120fb29d734050dc7d';

async function fetchData(url) {
  try {
    onLoader();
    const data = await axios.get(url);
    removeLoader();
    return data;
  } catch (error) {
    console.log(error);
    removeLoader();
    return null;
  }
}

export const getMoviesByQuery = async (
  searchTerm,
  chosenPage = 1,
  date = ''
) => {
  refs.selectGenres.disabled = true;
  refs.selectDate.disabled = false;
  console.log(searchTerm, chosenPage, date);
  const { results, total_pages, page } = await getByQuery(
    searchTerm,
    chosenPage,
    date
  );
  createDataCards(results);
  return {
    results,
    total_pages,
    page,
  };
};

export const showNewestMovies = async (chosenPage, genre_id = 0) => {
  refs.selectGenres.disabled = false;
  refs.selectDate.disabled = true;

  const { data } = await fetchData(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${chosenPage}${
      genre_id ? `&with_genres=${genre_id}` : ''
    }&language=en-US`
  );
  console.log(data);
  const { results, page, total_pages } = data;
  console.log(results);
  createDataCards(results);
  return {
    results,
    page,
    total_pages,
  };
};

export const fetchGenre = async () => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
  );
  const { genres } = data;
  return genres;
};
