import Pagination from './pagination';
import { getByQuery } from '../api';
import { createDataCards, loadLocal } from './catalogUtils';
import axios from 'axios';

const API_KEY = '88b8a7c5d221d3120fb29d734050dc7d';

export const getMoviesByQuery = async (chosenPage = 1) => {
  const searchTerm = loadLocal('searchTerm');
  console.log(chosenPage, searchTerm);
  const { results, total_pages, page } = await getByQuery(
    searchTerm,
    chosenPage
  );
  createDataCards(results);
  return {
    results,
    total_pages,
    page,
  };
};

export const showNewestMovies = async currentPage => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${currentPage}&language=en-US`
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
