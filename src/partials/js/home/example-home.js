import * as hero from '../../js/modal';
import { getWeeklyTrending, getUpcoming, getGenre } from '../api';
import { renderUpcomingFilm, renderWeeklyThreeTrends } from './home-markups';
import { homeRefs } from './home-refs';

const { seeAll, upcomingWrapEl } = homeRefs;

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
      '<p class="upcoming-not-found">OOPS...<br>We are very sorry!<br>We don’t have any results</p>'
    );
  }
}

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

function getRandomValue(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

window.addEventListener('DOMContentLoaded', getUpcomingFilm);
window.addEventListener('DOMContentLoaded', getWeeklyTrends);

export { getGenresById, filterGenres, getImagePath };
