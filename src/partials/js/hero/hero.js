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
    if (movieArr.length === 0) return;
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
    const moviesArr = data.results;

    let randomMoviesArr = [];
    for (let i = 0; i < numberOfMovies; i++) {
      let randomIndex = Math.floor(Math.random() * moviesArr.length);
      randomMoviesArr.push(moviesArr.splice(randomIndex, 1)[0]);
    }
    return randomMoviesArr;
  } catch (error) {
    console.log(error.message);
  }
}

document.addEventListener('click', onWatchTrailer);

export { heroRefs };
export { swiper };
