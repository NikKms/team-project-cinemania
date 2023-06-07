import { fetchGenre, getMoviesByQuery, showNewestMovies } from './catalogApi';
import { createDataCards, loadLocal, saveLocal } from './catalogUtils';
import Pagination from './pagination';

const searchForm = document.querySelector('.search-form');
const selectGenres = document.querySelector('#selectGenres');
const selectDate = document.querySelector('#selectDate');

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
  localStorage.removeItem('searchTerm');
};

const afterSearching = async searchMovies => {
  const { page, total_pages } = await getMoviesByQuery();
  const pagination = new Pagination(total_pages, page, getMoviesByQuery);
  pagination.createButton();
  selectDate.removeAttribute('disabled');
};

const filterSelectOptions = async () => {
  const genres = await fetchGenre();
  let arrOptions = genres.map(option => {
    return `<option value="${option.id}">${option.name}</option>`;
  });
  arrOptions.unshift(`<option value='all'>All</option>`);
  selectGenres.innerHTML = arrOptions.join('');
  selectGenres.removeAttribute('disabled');
};

const setGenreFilter = async e => {
  const value = e.target.value;
  const currentPage = loadLocal('currentPage');
  const searchTerm = loadLocal('searchTerm');

  if (searchTerm) {
    if (value === 'all') {
      getMoviesByQuery(currentPage, 0);
      return;
    }
    const { results } = await getMoviesByQuery(currentPage, value);
    createDataCards(results);
    console.log(results);
    return;
  }
  const { results } = await showNewestMovies(currentPage, value);
  console.log(results);
  createDataCards(results);
};

const dateSelectOptions = () => {
  const endDate = 1970;
  const startDate = new Date().getFullYear();

  const yearList = [];

  for (let i = startDate; i >= endDate; i--) {
    yearList.push(`<option value="${i}">${i}</option>`);
  }

  selectDate.innerHTML = yearList.join('');
};

const setDateFilter = async e => {
  const value = e.target.value;
  const currentPage = loadLocal('currentPage');
  const searchTerm = loadLocal('searchTerm');

  console.log(searchTerm);
  if (searchTerm) {
    if (value === 'all') {
      getMoviesByQuery(currentPage, 0);
      return;
    }
  }
};

searchForm.addEventListener('submit', submitHandler);
window.addEventListener('load', afterLoad);
window.addEventListener('load', filterSelectOptions);
window.addEventListener('load', dateSelectOptions);
selectGenres.addEventListener('change', setGenreFilter);
selectDate.addEventListener('change', setDateFilter);

export { createDataCards };
