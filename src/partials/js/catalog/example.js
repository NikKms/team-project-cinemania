import { getMoviesByQuery, showNewestMovies } from './catalogApi';
import { loadLocal, saveLocal } from './catalogUtils';
import Pagination from './pagination';

const searchForm = document.querySelector('.search-form');

const submitHandler = e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const { searchMovies } = Object.fromEntries(formData.entries());
  if (!searchMovies.length) {
    afterLoad();
    return;
  }
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
};

searchForm.addEventListener('submit', submitHandler);
window.addEventListener('load', afterLoad);

export { createDataCards };
