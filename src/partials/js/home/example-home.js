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
  renderWeeklyThreeTrends(firstThreeFilms);
}

function getFirstThreeElements(array) {
  return array.slice(0, 3);
}

async function renderWeeklyThreeTrends(firstThreeFilms) {
  console.log(firstThreeFilms);
  const markup = await Promise.all(
    firstThreeFilms.map(
      async ({
        backdrop_path,
        title,
        release_date,
        genre_ids,
        id,
        poster_path,
        vote_average,
      }) => {
        const listGenres = await getGenresById(genre_ids);
        console.log(listGenres);

        return `<li class="weekly-card" data-id=${id}>
        <div class="weekly-container-image">
          <img
            class="weekly-card-image"
           src="https://image.tmdb.org/t/p/original/${poster_path}"
            alt=""
          />
         <div class="overlay"></div>       
        </div>
        <ul class="weekly-card-description">
        <li>
          <span class="weekly-card-description-title">${title}</span>
          <span class="weekly-card-description-other">${listGenres} | ${release_date.slice(
          0,
          4
        )}</span></li>
        <li class="Stars" style="--rating: ${
          vote_average / 2
        };" aria-label="Rating of this product is 2.3 out of 5."></li>
        </ul>
        
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
  const {
    backdrop_path,
    genre_ids,
    popularity,
    release_date,
    title,
    vote_average,
    vote_count,
    overview,
  } = upcomingFilm;

  const listGenres = await getGenresById(genre_ids);

  const markup = `<div class="upcoming-card">

            <img class="upcoming-card-img" src="https://image.tmdb.org/t/p/original/${backdrop_path}" alt=" " />

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
}

function getCurrentEndLastDayOfMonth() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0'); // Додаємо 1, оскільки номер місяця починається з 0
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
