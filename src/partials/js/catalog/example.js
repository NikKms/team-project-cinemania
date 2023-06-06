<<<<<<< HEAD
import { getMoviesByQuery, showNewestMovies } from './catalogApi';
import { loadLocal, saveLocal } from './catalogUtils';
import Pagination from './pagination';
=======
import axios from 'axios';
import { getByQuery, getMovie } from '../api';
import { refs } from '../refs';
import { createCards } from './createCards';
>>>>>>> main

const API_KEY = '88b8a7c5d221d3120fb29d734050dc7d';
const searchForm = document.querySelector('.search-form');

const submitHandler = e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const { searchMovies } = Object.fromEntries(formData.entries());
  if (!searchMovies.length) {
    showNewestMovies();
    return;
  }
<<<<<<< HEAD
  saveLocal('searchTerm', searchMovies);
  afterSearching(searchMovies);
};

const afterLoad = async () => {
  const { page, total_pages } = await showNewestMovies();
  const pagination = new Pagination(total_pages, page, showNewestMovies);
  pagination.createButton();
};

const afterSearching = async () => {
  const { page, total_pages } = await getMoviesByQuery();
  const pagination = new Pagination(total_pages, page, getMoviesByQuery);
  pagination.createButton();
=======
  getMoviesByQuery(searchMovies);
};

const getMoviesByQuery = async searchTerm => {
  const { results } = await getByQuery(searchTerm, 1);
  createDataCards(results).then(res => console.log(res));
};

const createDataCards = async moviesData => {
  console.log(moviesData);
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

const showNewestMovies = async () => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US`
  );
  const { results } = data;
  createDataCards(results);
  console.log(results);
>>>>>>> main
};

searchForm.addEventListener('submit', submitHandler);
window.addEventListener('load', showNewestMovies);

export { createDataCards };
