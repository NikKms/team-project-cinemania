import { swiper } from './hero';

const trailerRefs = {
  backDropRef: document.querySelector('.trailer-backdrop'),
  trailerRef: document.querySelector('.trailer-container'),
  trailerBtn: document.querySelector('.modal-trailer-btn'),
  trailerImg: document.querySelector('#trailer-img-err'),
};

function renderTrailer(movieKey) {
  document.body.classList.add('is-scroll-block');

  trailerRefs.backDropRef.classList.remove('is-trailer-hidden');
  trailerRefs.trailerRef.innerHTML = `<iframe class="trailer-iframe" src='https://www.youtube.com/embed/${movieKey}
  'frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  <p>Oops! Trailer not found...</p>`;

  trailerRefs.trailerBtn.addEventListener('click', closeTrailer);
  trailerRefs.backDropRef.addEventListener('click', listenBackdropClick);
  document.body.addEventListener('keydown', listenKeyDawn);
}

function onTrailerError() {
  console.log('NOTHHING FOUND');
  document.body.classList.add('is-scroll-block');
  trailerRefs.backDropRef.classList.remove('is-trailer-hidden');
  trailerRefs.trailerRef.innerHTML = `<iframe class="trailer-iframe" width="560" height="315" src='http://www.youtube.com/embed/zwBpUdZ0lrQ' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
`;
  trailerRefs.trailerBtn.addEventListener('click', closeTrailer);
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

  swiper.autoplay.start();

  document.body.removeEventListener('keydown', listenKeyDawn);
  trailerRefs.backDropRef.removeEventListener('click', listenBackdropClick);
  trailerRefs.trailerBtn.removeEventListener('click', closeTrailer);
};

export { renderTrailer, onTrailerError };
