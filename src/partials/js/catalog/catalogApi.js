import Pagination from './pagination';
import { getByQuery } from '../api';
import { createDataCards, loadLocal } from './catalogUtils';
import axios from 'axios';
import { refs } from '../refs';

const API_KEY = '88b8a7c5d221d3120fb29d734050dc7d';

export const getMoviesByQuery = async (chosenPage = 1, date = 0) => {
  refs.selectGenres.disabled = true;
  refs.selectDate.disabled = false;
  const searchTerm = loadLocal('searchTerm');
  console.log(chosenPage, searchTerm, date);
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

export const showNewestMovies = async (currentPage, genre_id = 0) => {
  console.log(genre_id);
  refs.selectGenres.disabled = false;
  refs.selectDate.disabled = true;
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${currentPage}${
      genre_id ? `&with_genres=${genre_id}` : ''
    }&language=en-US`
  );
  const { results, page, total_pages } = data;
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
