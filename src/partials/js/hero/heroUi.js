import { heroRefs } from './hero';

function renderSlide(backdrop_path, title, overview, vote_average, id, name) {
  document.querySelector('.swiper-wrapper').insertAdjacentHTML(
    'beforeEnd',
    `
<div
  style="background-image: url('https://image.tmdb.org/t/p/original${backdrop_path}');"
  class="swiper-slide hero-img">
 <div class="hero-gradient">
  <div class="hero-title-wrap">
    <h1 class="hero-title" data-swiper-parallax="-300">${title || name}</h1>
  </div>
  <div data-swiper-parallax="-350" class="Stars" style="--rating: ${
    vote_average / 2
  }; " aria-label="Rating of this product is ${(vote_average / 2).toFixed(
      1
    )} out of 5.">
  </div>
  <div class="hero-description-wrap" data-swiper-parallax="-400">
    <p class="hero-description1">${overview}</p>
    <p class="hero-description2">${overview}</p>
  </div>
  <div class="hero-btn-wrap" data-swiper-parallax="-450">
  <button type="button" class="hero-btn hero-btn-trailer" id="hero-btn-trailer" data-id="${id}">
    Watch trailer
  </button>
  <button type="button" class="hero-btn hero-btn-more is-id" id="hero-btn-more"  data-id="${id}" data-modal-open>
    More details
  </button></div>
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

export { renderSlide, renderSwiper };
