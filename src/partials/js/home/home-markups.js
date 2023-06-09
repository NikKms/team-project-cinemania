import { homeRefs } from './home-refs';
import { addFilmToStorage } from '../my-lib/lib-storage';
import { getGenresById, getImagePath, filterGenres } from './example-home';
import { handleFilmInStorage } from '../my-lib/lib-storage';

const { upcomingWrapEl, listOfFilms } = homeRefs;
let addToLibBtnHome = null;

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

async function renderUpcomingFilm(upcomingFilm) {
  let {
    id,
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
  console.log('upcomingFilm: ', upcomingFilm);

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

            <button class="upcoming-button" id="add-to-lib" type="button">
              Add to my library
            </button>
          </div>
        </div>`;
  upcomingWrapEl.insertAdjacentHTML('beforeend', markup);

  addToLibBtnHome = document.getElementById('add-to-lib');

  const isFilmInLocalStorage = id => {
    const films = JSON.parse(localStorage.getItem('films')) || [];

    const filmExists = films.some(film => film.id === id);
    if (filmExists) {
      addToLibBtnHome.textContent = 'Remove from the library';
    }
  };

  isFilmInLocalStorage(id);

  const addToLib = evt => {
    handleFilmInStorage(upcomingFilm);
    let currentUrl = window.location.href;
    if (currentUrl.includes('my-lib-page.html')) {
      window.location.reload();
    }
  };

  addToLibBtnHome.addEventListener('click', addToLib);
}

export { renderUpcomingFilm, renderWeeklyThreeTrends, addToLibBtnHome };
