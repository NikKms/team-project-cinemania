import Swiper from 'swiper/swiper-bundle';
import 'swiper/swiper-bundle.css';

import { renderTrailer, renderSlide, renderSwiper } from '../hero/heroUi';
import { getTrending, getMovie } from '../api';

heroRefs = {
  hero: document.querySelector('#hero'),
};

let swiper = null;

heroHandler();

async function heroHandler() {
  try {
    const movieArr = await getTopMoviesArr(5);

    if (movieArr.length === 0) console.log('sorry nothing found');

    renderSwiper();

    await movieArr.forEach(
      ({ backdrop_path, title, overview, vote_average, id }) => {
        renderSlide(backdrop_path, title, overview, vote_average, id);
      }
    );

    swiperInit();
  } catch (error) {
    console.log(error.message);
  }
}

async function getTopMoviesArr(numberOfMovies) {
  try {
    const data = await getTrending();
    return data.results.slice(0, numberOfMovies);
  } catch (error) {
    console.log(error.message);
  }
}

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

// ============================================================
heroRefs.hero.addEventListener('click', onWatchTrailer);

async function getTrailerByFilmId(id) {
  try {
    const movieData = await getMovie(id);
    const trailerKey = movieData.results[0].key;
    renderTrailer(trailerKey);
  } catch (err) {
    heroRefs.hero.insertAdjacentHTML(
      'beforeEnd',
      `
    <div style="position: absolute" class="player"><iframe width="150" height="75" src='http://www.youtube.com/embed/zwBpUdZ0lrQ' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
      `
    );
    console.log(err.message);
  }
}

function onWatchTrailer(e) {
  if (e.target.classList.contains('hero-btn-trailer')) {
    const dataId = e.target.dataset.id;
    getTrailerByFilmId(dataId);
    swiper.autoplay.stop();
    console.log('slider STOP!');
  }

  setTimeout(() => {
    swiper.autoplay.start();
    console.log('slider START!');
  }, 10000);
}
