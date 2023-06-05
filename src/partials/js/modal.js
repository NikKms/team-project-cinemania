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
  console.log(event.target);
  if (event.target.classList.contains('is-id')) {
    const cardId = event.target.dataset.id;
    getMovieById(cardId);
  }

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
    poster_path,
    backdrop_path,
    genres,
    overview,
    popularity,
    title,
    vote_average,
    vote_count,
  } = film;
  const genresList = genres.map(genre => genre.name);
  const formatedGenres = genresList.join(', ');

  const imagePath =
    poster_path !== null
      ? `https://image.tmdb.org/t/p/original/${poster_path}`
      : `https://image.tmdb.org/t/p/original/${backdrop_path}`;

  const markup = `
    <div class="modal-card">
      <img
        class="modal-img"
        src="https://image.tmdb.org/t/p/original/${imagePath}"
        alt=" "
      />

      <div class="modal-card-wrap">
        <h3 class="modal-card-title">${title}</h3>

          <div class="modal-card-vote-wrap">
            <div class="modal-card-vote"><span>Vote / Votes</span></div>
            <div class="modal-card-vote-data">
              <span>${vote_average}</span> / <span>${vote_count}</span>
            </div>
          </div>
        
          <div class="modal-card-popularity-wrap">
            <span class="modal-card-popularity-text">Popularity</span>
            <span class="modal-card-popularity-data"
              >${popularity.toFixed(1)}</span
            >
          </div>

          <div class="modal-card-genre-wrap">
            <span class="modal-card-genre-text">Genre</span>
            <span class="modal-card-genre-data">${formatedGenres}</span>
          </div>
        
        <span class="modal-card-about-title">About</span>

        <p class="modal-card-about-text">${overview}</p>

        <button class="modal-button" type="button">Add to my library</button>
      </div>
    </div>`;

  refs.upcomingWrapLi.innerHTML = markup;
}
