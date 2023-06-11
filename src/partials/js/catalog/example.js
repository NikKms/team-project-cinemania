import { refs } from '../refs';
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
  const { page, total_pages } = await showNewestMovies(1);
  const objPagOptions = {
    totalPages: total_pages,
    page: page,
    parentSection: refs.catalogSection,
  };
  const pagination = new Pagination(objPagOptions, showNewestMovies);
  pagination.createButton();
};

const afterSearching = async searchMovies => {
  const searchTerm = loadLocal('searchTerm');
  const { page, total_pages } = await getMoviesByQuery(1, searchTerm);

  const objPagOptions = {
    totalPages: total_pages,
    page: page,
    parentSection: refs.catalogSection,
  };

  const pagination = new Pagination(objPagOptions, getMoviesByQuery, [
    searchTerm,
    1,
  ]);
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

  const { total_pages, results } = await showNewestMovies(1, e.target.value);

  const pagination = new Pagination(total_pages, 1, showNewestMovies, [value]);
  pagination.createButton();
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
  const searchTerm = loadLocal('searchTerm');

  const { total_pages, page } = await getMoviesByQuery(1, searchTerm, value);

  const pagination = new Pagination(total_pages, 1, getMoviesByQuery, [
    searchTerm,
    value,
  ]);
  pagination.createButton();
};

searchForm.addEventListener('submit', submitHandler);
window.addEventListener('load', afterLoad);

window.addEventListener('load', filterSelectOptions);
window.addEventListener('load', dateSelectOptions);

selectGenres.addEventListener('change', setGenreFilter);
selectDate.addEventListener('change', setDateFilter);
searchForm.querySelector('input').addEventListener('input', e => {
  const value = e.target.value;
  selectGenres.disabled = true;
  if (!value.length) selectGenres.disabled = false;
});

export { createDataCards };
