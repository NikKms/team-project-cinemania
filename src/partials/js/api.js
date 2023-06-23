import axios from 'axios';
import { onLoader, removeLoader } from './loader';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '88b8a7c5d221d3120fb29d734050dc7d';

async function fetchData(url) {
  try {
    onLoader();
    const response = await axios.get(url);
    removeLoader();
    return response.data;
  } catch (error) {
    removeLoader();
    return null;
  }
}

async function getTrending(page = 1) {
  const url = `${BASE_URL}/trending/all/day?api_key=${API_KEY}&language=en-US&page=${page}`;
  return await fetchData(url);
}

async function getByQuery(page, query, date) {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}&language=en-US${
    date ? `&primary_release_year=${date}` : ''
  }`;
  return await fetchData(url);
}

async function getInfoByMovie(movie_id) {
  const url = `${BASE_URL}/movie/${movie_id}?api_key=${API_KEY}&language=en-US`;
  return await fetchData(url);
}

async function getMovie(movie_id) {
  const url = `${BASE_URL}/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`;
  return await fetchData(url);
}

async function getArrMovies(arr) {
  const promises = arr.map(async movie_id => {
    const url = `${BASE_URL}/movie/${movie_id}?api_key=${API_KEY}&language=en-US`;
    return fetchData(url);
  });

  return await Promise.all(promises);
}

// ================== add =============

async function getWeeklyTrending(page = 1) {
  const url = `${BASE_URL}/trending/all/day?api_key=${API_KEY}&language=en-US&page=${page}`;
  return await fetchData(url);
}

async function getUpcoming(formattedStartDate, formattedEndDate) {
  const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&&primary_release_date.gte=${formattedStartDate}&primary_release_date.lte=${formattedEndDate}`;
  return await fetchData(url);
}

async function getGenre() {
  const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-USs`;
  return await fetchData(url);
}

// ==================================

export {
  getTrending,
  getByQuery,
  getInfoByMovie,
  getMovie,
  getArrMovies,
  getWeeklyTrending,
  getUpcoming,
  getGenre,
};
