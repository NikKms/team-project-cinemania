import { getInfoByMovie } from './api';
import { getGenre } from './api';

const refs = {
  openModal: document.querySelector('[data-modal-open]'),
  closeModal: document.querySelector('[data-modal-close]'),
  backdrop: document.querySelector('[data-modal]'),
  upcomingWrapLi: document.querySelector('.upcoming_modal'),
};

refs.openModal.addEventListener('click', onOpenModal);
refs.closeModal.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onBackdropClick);

function onOpenModal(event) {
  const cardId = event.target.closest('Li').dataset.id;
  getMovieById(cardId);

  window.addEventListener('keydown', onEscKeyPress);
  refs.backdrop.classList.remove('is-hidden');
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  refs.backdrop.classList.add('is-hidden');
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') onCloseModal();
}

async function getMovieById(id) {
  const data = await getInfoByMovie(id);
  renderFilmInModal(data);
}

function renderFilmInModal(film) {
  console.log(film);
  const {
    backdrop_path,
    poster_path,
    genres,
    overview,
    popularity,
    title,
    vote_average,
    vote_count,
  } = film;
  const genresList = genres.map(genre => genre.name);
  const formatedGenres = genresList.join(', ');

  const markup = `<div class="upcoming-card">

            <img class="modal-img" src="https://image.tmdb.org/t/p/original/${poster_path}" alt=" " />

          <div class="upcoming-card-wrap">
            <h3 class="upcoming-card-title">${title}</h3>

            <div class="upcoming-card-numbers-wrap-top">

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
                <span class="upcoming-card-genre-data">${formatedGenres}</span>
              </div>
            </div>

            <span class="upcoming-card-about-title">About</span>

            <p class="upcoming-card-about-text">${overview}</p>

            <button class="upcoming-button" type="button">
              Add to my library
            </button>
          </div>
        </div>`;
  refs.upcomingWrapLi.innerHTML = markup;
}
