import * as hero from '../../js/modal';
import { getWeeklyTrending } from '../api';
import { getUpcoming } from '../api';
import { getGenre } from '../api';

const listOfFilms = document.querySelector('.weekly-cards-wrap');
const upcomingWrapEl = document.querySelector('.upcoming_wrap');
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
        name,
        first_air_date,
        vote_average,
      }) => {
        genre_ids = filterGenres(genre_ids);
        const listGenres = await getGenresById(genre_ids);

        return `<li class="weekly-card is-id" data-id=${id}>
        <div class="weekly-container-image">
          <img
            class="weekly-card-image"
           src="https://image.tmdb.org/t/p/original/${poster_path}"
            alt=""
          />
         <div class="overlay"></div>       
        </div>
  <div class="weekly-card-description">
    <h3 class="weekly-card-description-title">${title || name}</h3>
    <div class='weekly-card-description-wrap'>
       <p class="weekly-card-description-other">${listGenres} | ${
          release_date
            ? release_date.substring(0, 4)
            : first_air_date.substring(0, 4)
        }</p>

     <div class="Stars" style="--rating: ${parseFloat(
       (vote_average / 2).toFixed(1)
     )};" aria-label="Rating of this product is 2.3 out of 5."></div>
      </div>
  </div>
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
    upcomingWrapEl.insertAdjacentHTML(
      'beforeend',
      '<p class="upcoming-not-found">OOPS...We are very sorry! We don’t have any results</p>'
    );
  }
}

async function renderUpcomingFilm(upcomingFilm) {
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
  let imagePath = getImagePath(backdrop_path, poster_path, isMobile);

  const markup = `<div class="upcoming-card">

            <img class="upcoming-card-img" src="${imagePath}" alt=" " />

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
  upcomingWrapEl.insertAdjacentHTML('beforeend', markup);
}

// Функція для визначення шляху зображення на основі ширини екрану

function getImagePath(backdropPath, posterPath, isMobile) {
  if (isMobile === true && posterPath !== null) {
    return `https://image.tmdb.org/t/p/original/${posterPath}`;
  } else if (isMobile === false && backdropPath !== null) {
    return `https://image.tmdb.org/t/p/original/${backdropPath}`;
  } else if (
    isMobile === false &&
    backdropPath === null &&
    posterPath !== null
  ) {
    return `https://image.tmdb.org/t/p/original/${posterPath}`;
  } else if (
    isMobile === true &&
    posterPath === null &&
    backdropPath !== null
  ) {
    return `https://image.tmdb.org/t/p/original/${backdropPath}`;
  } else {
    return 'https://d2ths1nqi4sbhh.cloudfront.net/images/no-image.png?v=3884857787';
  }
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

export { getGenresById, filterGenres };
