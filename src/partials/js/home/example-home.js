import * as hero from '../../js/modal';
import { getWeeklyTrending } from '../api';
import { getUpcoming } from '../api';
import { getGenre } from '../api';

// ================ Weekly trends section ==============

async function getWeeklyTrends() {
  const data = await getWeeklyTrending();
  //   console.log(data);
  const firstThreeFilms = getFirstThreeElements(data.results);

  renderWeeklyThreeTrends(firstThreeFilms);
}

function getFirstThreeElements(array) {
  return array.slice(0, 3);
}

function renderWeeklyThreeTrends(firstThreeFilms) {
  const markup = firstThreeFilms.map(
    async ({ backdrop_path, title, release_date, genre_ids }) => {
      const listGenres = await getGenresById(genre_ids);
      console.log(listGenres);
      //   console.log(release_date.slice(0, 4));
    }
  );
}

async function getGenresById(ids) {
  const data = await getGenre();
  const genres = data.genres;

  const arrGenres = ids.map(id => {
    const genre = genres.find(genre => genre.id === id);
    return genre.name;
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

function renderUpcomingFilm(upcomingFilm) {
  console.log(upcomingFilm);
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

//  location.href = 'catalog.html';
