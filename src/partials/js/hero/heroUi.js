import { heroRefs } from './hero';
import { swiper } from './hero';

function renderTrailer(movieKey) {
  document.body.classList.add('is-scroll-block');

  heroRefs.backDropRef.classList.remove('is-trailer-hidden');
  heroRefs.trailerRef.insertAdjacentHTML(
    'beforeEnd',
    `
  <iframe class="trailer-iframe" src='https://www.youtube.com/embed/${movieKey}
  'frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
`
  );

  heroRefs.trailerBtn.addEventListener('click', closeTrailer);
  heroRefs.backDropRef.addEventListener('click', listenBackdropClick);
  document.body.addEventListener('keydown', listenKeyDawn);
}

const listenBackdropClick = event => {
  if (event.target.classList.contains('hero-trailer-backdrop')) {
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
  heroRefs.backDropRef.classList.add('is-trailer-hidden');

  heroRefs.trailerRef.innerHTML = '';

  swiper.autoplay.start();

  document.body.removeEventListener('keydown', listenKeyDawn);
  heroRefs.backDropRef.removeEventListener('click', listenBackdropClick);
  heroRefs.trailerBtn.removeEventListener('click', closeTrailer);
};

function renderSlide(backdrop_path, title, overview, vote_average, id) {
  document.querySelector('.swiper-wrapper').insertAdjacentHTML(
    'beforeEnd',
    `<div
    style="background-image: url('https://image.tmdb.org/t/p/original${backdrop_path}');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;"
    class="swiper-slide">

    <div class="hero-title-wrap">
      <h1 class="hero-title" data-swiper-parallax="-300">${title}</h1>
    </div>
    <div class="hero-star-raiting" data-swiper-parallax="-350">
      <span ><div class="Stars" style="--rating: ${
        vote_average / 2
      }; " aria-label="Rating of this product is ${(vote_average / 2).toFixed(
      1
    )} out of 5."></span>
    </div>
    <div class="hero-description-wrap">
      <p class="hero-description" data-swiper-parallax="-400">${overview}</p>

    </div>
    <button type="button" class="hero-btn hero-btn-trailer" id="hero-btn-trailer" data-id="${id}" data-swiper-parallax="-450">
      Watch trailer
    </button>
    <button type="button" class="hero-btn hero-btn-more" id="hero-btn-more" data-swiper-parallax="-450">
      More details
    </button>
    </div>`
  );
}

function renderSwiper() {
  const markup = `<div class="swiper container">
  <div class="swiper-wrapper"></div>
  <div style="color: orange" class="swiper-button-prev"></div>
  <div style="color: orange" class="swiper-button-next"></div>`;

  heroRefs.hero.innerHTML = markup;
}

export { renderTrailer, renderSlide, renderSwiper };
