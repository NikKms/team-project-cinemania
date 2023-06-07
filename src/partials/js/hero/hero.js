import { swiper, swiperInit, renderSwiper } from './swiper';
import { crateSlideMarkup } from '../hero/heroUi';
import { onWatchTrailer } from './trailer-modal';
import { getTrending } from '../api';

const heroRefs = {
  hero: document.querySelector('.hero'),
  backDropRef: document.querySelector('.hero-trailer-backdrop'),
  trailerRef: document.querySelector('.trailer-container'),
  trailerBtn: document.querySelector('.modal-trailer-btn'),
  heroBtn: document.querySelector('.hero-btn'),
  heroImgRef: document.querySelector('.hero-img'),
};

heroHandler();

async function heroHandler() {
  if (window.location.href.includes('/my-lib-page.html')) {
    heroRefs.heroImgRef.classList.add('hero-lib');
    heroRefs.heroBtn.style.display = 'none';
    return;
  }
  try {
    const movieArr = await getTopMoviesArr(5);
    if (movieArr.length === 0) console.log('sorry nothing found');
    renderSwiper();
    const markup = movieArr
      .map(({ backdrop_path, title, overview, vote_average, id, name }) => {
        return crateSlideMarkup(
          backdrop_path,
          title,
          overview,
          vote_average,
          id,
          name
        );
      })
      .join(' ');
    document.querySelector('.swiper-wrapper').innerHTML = markup;

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

document.addEventListener('click', onWatchTrailer);

export { heroRefs };
export { swiper };
