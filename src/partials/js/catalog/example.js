import { createPagination } from '../pagination';
import { getMoviesByQuery, showNewestMovies } from './catalogApi';

const searchForm = document.querySelector('.search-form');

const submitHandler = e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const { searchMovies } = Object.fromEntries(formData.entries());
  if (!searchMovies.length) {
    afterLoad();
    return;
  }
  afterSearching(searchMovies);
};

const afterLoad = async () => {
  const { results, page, total_pages } = await showNewestMovies();
  //createPagination(results, total_pages);
};

const afterSearching = async searchMovies => {
  const { results, page, total_pages } = await getMoviesByQuery(searchMovies);
};

searchForm.addEventListener('submit', submitHandler);
window.addEventListener('load', afterLoad);

export { createDataCards };
