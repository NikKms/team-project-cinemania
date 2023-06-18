import { Notify } from 'notiflix';
import { swiper } from './hero';
import { getMovie } from '../api';

const trailerErrorKey = 'DB68T2s7gfI';

const trailerRefs = {
  backDropRef: document.querySelector('.trailer-backdrop'),
  trailerRef: document.querySelector('.trailer-container'),
  trailerImg: document.querySelector('#trailer-img-err'),
};

function onWatchTrailer(e) {
  if (e.target.classList.contains('hero-btn-trailer')) {
    const dataId = e.target.dataset.id;
    getTrailerByFilmId(dataId);
    if (!window.location.href.includes('/my-lib-page.html'))
      swiper.autoplay.stop();
  }
}

async function getTrailerByFilmId(id) {
  try {
    const movieData = await getMovie(id);
    const trailerKey = movieData.results[0].key;
    renderTrailer(trailerKey);
  } catch (err) {
    renderTrailer(trailerErrorKey);
    Notify.warning(
      'OOPS... We are very sorry! But we couldn’t find the trailer.'
    );
  }
}

function renderTrailer(movieKey) {
  document.body.classList.add('is-scroll-block');

  trailerRefs.backDropRef.classList.remove('is-trailer-hidden');
  trailerRefs.trailerRef.innerHTML = `<iframe class="trailer-iframe" src='https://www.youtube.com/embed/${movieKey}
  'frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  <p>Oops! Trailer not found...</p>`;

  trailerRefs.backDropRef.addEventListener('click', listenBackdropClick);
  document.body.addEventListener('keydown', listenKeyDawn);
}

const listenBackdropClick = event => {
  if (event.target.classList.contains('trailer-backdrop')) {
    closeTrailer();
  }
};

const listenKeyDawn = event => {
  if (event.key === 'Escape' || event.keyCode === 27) {
    closeTrailer();
  }
};

const closeTrailer = () => {
  document.body.classList.remove('is-scroll-block');
  trailerRefs.backDropRef.classList.add('is-trailer-hidden');

  trailerRefs.trailerRef.innerHTML = '';

  if (!window.location.href.includes('/my-lib-page.html'))
    swiper.autoplay.start();

  document.body.removeEventListener('keydown', listenKeyDawn);
  trailerRefs.backDropRef.removeEventListener('click', listenBackdropClick);
};

export { renderTrailer, getTrailerByFilmId, onWatchTrailer };
