import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '88b8a7c5d221d3120fb29d734050dc7d';

async function fetchData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getTrending(page = 1) {
  const url = `${BASE_URL}/trending/all/day?api_key=${API_KEY}&language=en-US&page=${page}`;
  return await fetchData(url);
}

async function getByQuery(query, page) {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=${page}`;
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

export { getTrending, getByQuery, getInfoByMovie, getMovie, getArrMovies };
