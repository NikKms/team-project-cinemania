import Swiper from 'swiper/swiper-bundle';
import 'swiper/swiper-bundle.css';
import { heroRefs } from './hero';

let swiper = null;

function swiperInit() {
  swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    speed: 2000,
    parallax: true,
    spaceBetween: 0,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}

function renderSwiper() {
  const markup = `<div class="swiper container">
  <div class="swiper-wrapper"></div>
  <div style="color: orange" class="swiper-button-prev"></div>
  <div style="color: orange" class="swiper-button-next"></div>`;

  heroRefs.hero.innerHTML = markup;
}

export { swiper, swiperInit, renderSwiper };
