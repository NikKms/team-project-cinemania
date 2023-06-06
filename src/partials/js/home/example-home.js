import * as hero from '../../js/modal';
import { getWeeklyTrending } from '../api';
import { getUpcoming } from '../api';
import { getGenre } from '../api';

const listOfFilms = document.querySelector('.weekly-cards-wrap');
const upcomingWrapLi = document.querySelector('.upcoming_wrap');
const seeAll = document.querySelector('.weekly-title-link');

// ================See all=================

seeAll.addEventListener('click', () => {
  location.href = 'catalog.html';
});

// ================ Weekly trends section ==============

async function getWeeklyTrends() {
  const data = await getWeeklyTrending();

  const firstThreeFilms = getFirstThreeElements(data.results);
  console.log(firstThreeFilms);
  renderWeeklyThreeTrends(firstThreeFilms);
}

function getFirstThreeElements(array) {
  return array.slice(0, 3);
}

async function renderWeeklyThreeTrends(firstThreeFilms) {
  const markup = await Promise.all(
    firstThreeFilms.map(
      async ({
        backdrop_path,
        title,
        release_date,
        genre_ids,
        id,
        poster_path,
        name,
        first_air_date,
      }) => {
        genre_ids = filterGenres(genre_ids);
        const listGenres = await getGenresById(genre_ids);

        return `<li class="weekly-card" >
        <div class="weekly-container-image">
          <img
            class="weekly-card-image"
           src="https://image.tmdb.org/t/p/original/${poster_path}"
            alt=""
          />
         <div class="overlay is-id" data-id=${id}></div>       
        </div>
        <div class="weekly-card-description">
          <span class="weekly-card-description-title">${title || name}</span>
          <span class="weekly-card-description-other">${listGenres} | ${
          release_date
            ? release_date.substring(0, 4)
            : first_air_date.substring(0, 4)
        }</span>
        </div>
        <div class="weekly-card-raiting">Stars5*</div>
      </li>`;
      }
    )
  );

  listOfFilms.innerHTML = markup.join('');
}

async function getGenresById(ids) {
  const data = await getGenre();
  const genres = data.genres;

  const arrGenres = ids.map(id => {
    const genre = genres.find(genre => genre.id === id);
    return genre ? genre.name : '';
  });
  return arrGenres.join(', ');
}

// ================ Upcoming this month section ==============

async function getUpcomingFilm() {
  const { formattedStartDate, formattedEndDate } =
    getCurrentEndLastDayOfMonth();
  try {
    const data = await getUpcoming(formattedStartDate, formattedEndDate);
    const randomValue = getRandomValue(data.results);
    renderUpcomingFilm(randomValue);
  } catch (error) {
    console.log(error.message);
  }
}

async function renderUpcomingFilm(upcomingFilm) {
  console.log(upcomingFilm);
  let {
    backdrop_path,
    poster_path,
    genre_ids,
    popularity,
    release_date,
    title,
    vote_average,
    vote_count,
    overview,
  } = upcomingFilm;

  genre_ids = filterGenres(genre_ids);

  const listGenres = await getGenresById(genre_ids);

  const isMobile = window.innerWidth < 767;
  const imagePath = getImagePath(backdrop_path, poster_path, isMobile);

  const markup = `<div class="upcoming-card">

            <img class="upcoming-card-img" src="https://image.tmdb.org/t/p/original/${imagePath}" alt=" " />

          <div class="upcoming-card-wrap">
            <h3 class="upcoming-card-title">${title}</h3>

            <div class="upcoming-card-numbers-wrap-top">
              <div class="upcoming-card-release-wrap">
                <span class="upcoming-card-release-text">Release date</span>
                <span class="upcoming-card-release-data">${release_date}</span>
              </div>

              <div class="upcoming-card-vote-wrap">
                <div class="upcoming-card-vote"><span>Vote / Votes</span></div>
                <div class="upcoming-card-vote-data">
                  <span>${vote_average}</span> / <span>${vote_count}</span>
                </div>
              </div>
            </div>

            <div class="upcoming-card-numbers-wrap-down">
              <div class="upcoming-card-popularity-wrap">
                <span class="upcoming-card-popularity-text">Popularity</span>
                <span class="upcoming-card-popularity-data">${popularity.toFixed(
                  1
                )}</span>
              </div>

              <div class="upcoming-card-genre-wrap">
                <span class="upcoming-card-genre-text">Genre</span>
                <span class="upcoming-card-genre-data">${listGenres}</span>
              </div>
            </div>

            <span class="upcoming-card-about-title">About</span>

            <p class="upcoming-card-about-text">${overview}</p>

            <button class="upcoming-button" type="button">
              Add to my library
            </button>
          </div>
        </div>`;
  upcomingWrapLi.insertAdjacentHTML('beforeend', markup);

  window.addEventListener('resize', () => {
    updateImagePaths(backdrop_path, poster_path);
  });
}

// Функція для визначення шляху зображення на основі ширини екрану

function getImagePath(backdropPath, posterPath, isMobile) {
  return isMobile ? posterPath : backdropPath;
}
// Функція для оновлення шляхів зображень при зміні ширини екрану

function updateImagePaths(backdropPath, posterPath) {
  const isMobile = window.innerWidth < 767;
  const imagePath = getImagePath(backdropPath, posterPath, isMobile);

  const imgElement = document.querySelector('.upcoming-card-img');
  imgElement.src = `https://image.tmdb.org/t/p/original/${imagePath}`;
}

function filterGenres(genre_ids) {
  if (genre_ids.length > 2) {
    return genre_ids.slice(0, 2);
  }

  return genre_ids;
}

function getCurrentEndLastDayOfMonth() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
  const currentDay = String(currentDate.getDate()).padStart(2, '0');

  const formattedStartDate = `${currentYear}-${currentMonth}-${currentDay}`;

  const nextMonthFirstDay = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(nextMonthFirstDay - 1).getDate();
  const lastDayOfMonthFormatted = String(lastDayOfMonth).padStart(2, '0');

  const formattedEndDate = `${currentYear}-${currentMonth}-${lastDayOfMonthFormatted}`;

  return { formattedStartDate, formattedEndDate };
}

// =========== function getRandomValue =============

function getRandomValue(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

window.addEventListener('DOMContentLoaded', getUpcomingFilm);
window.addEventListener('DOMContentLoaded', getWeeklyTrends);
