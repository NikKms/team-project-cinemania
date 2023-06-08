// import { swiper } from '../../partials/js/hero/hero';
import { getInfoByMovie } from './api';
import { getGenre } from './api';
import { addFilmToStorage } from './my-lib/lib-storage';
import { onWatchTrailer } from './hero/trailer-modal';
import { getGenresById } from './my-lib/example-my-lib';

const refs = {
  openModal: document.querySelector('[data-modal-open]'),
  closeModal: document.querySelector('[data-modal-close]'),
  backdrop: document.querySelector('[data-modal]'),
  upcomingWrapLi: document.querySelector('.modal-info'),
  addToLibBtn: null,
};

document.addEventListener('click', onOpenModal);
refs.closeModal.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onBackdropClick);

function onOpenModal(event) {
  const cardEl = event.target.closest('.is-id');
  if (cardEl === null) return;

  const cardId = cardEl.dataset.id;
  getMovieById(cardId);

  // swiper.autoplay.stop();
  document.body.classList.add('not-scroll-body');
  window.addEventListener('keydown', onEscKeyPress);
  refs.backdrop.classList.remove('is-hidden');
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  // swiper.autoplay.start();
  document.body.classList.remove('not-scroll-body');
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

async function renderFilmInModal(film) {
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
    id,
  } = film;

  const genresListIds = genres.map(genre => genre.id);
  const formatedGenres = await getGenresById(genresListIds);

  let imagePath = '';
  if (poster_path !== null) {
    imagePath = `https://image.tmdb.org/t/p/original/${poster_path}`;
  } else if (backdrop_path !== null) {
    imagePath = `https://image.tmdb.org/t/p/original/${backdrop_path}`;
  } else {
    imagePath =
      'https://d2ths1nqi4sbhh.cloudfront.net/images/no-image.png?v=3884857787';
  }

  const markup = `
    <div class="modal-card">
      <img
        class="modal-img"
        src="${imagePath}"
        alt=" "
      />

      <div class="modal-card-wrap">
        <h3 class="modal-card-title">${title}</h3>

          <div class="modal-card-vote-wrap">
            <div class="modal-card-vote color-description"><span>Vote / Votes</span></div>
            <div class="modal-card-vote-data">
              <span>${vote_average.toFixed(
                1
              )}</span> / <span>${vote_count}</span>
            </div>
          </div>
        
          <div class="modal-card-popularity-wrap">
            <span class="modal-card-popularity-text color-description">Popularity</span>
            <span class="modal-card-popularity-data"
              >${popularity.toFixed(1)}</span
            >
          </div>

          <div class="modal-card-genre-wrap">
            <span class="modal-card-genre-text color-description">Genre</span>
            <span class="modal-card-genre-data">${formatedGenres}</span>
          </div>
        
        <span class="modal-card-about-title color-description">About</span>

        <p class="modal-card-about-text">${overview}</p>

        <button class="modal-button gap-right" id="add-to-lib-modal" type="button"><span>Add to my library</span></button>
         <button type="button" class="hero-btn modal-button hero-btn-trailer" id="hero-btn-trailer" data-id="${id}">
    Watch trailer
  </button>
      </div>
    </div>`;

  refs.upcomingWrapLi.innerHTML = markup;

  refs.addToLibBtn = document.getElementById('add-to-lib-modal');
  console.log('addToLibBtn: ', refs.addToLibBtn);

  const addToLib = evt => {
    addFilmToStorage(film);
  };

  refs.addToLibBtn.addEventListener('click', addToLib);
}

export { refs };
