import { swiper, swiperInit, renderSwiper } from './swiper';
import { renderSlide } from '../hero/heroUi';
import { onWatchTrailer } from './trailer-modal';
import { getTrending } from '../api';

const heroRefs = {
  hero: document.querySelector('.hero'),
  backDropRef: document.querySelector('.hero-trailer-backdrop'),
  trailerRef: document.querySelector('.trailer-container'),
  trailerBtn: document.querySelector('.modal-trailer-btn'),
};

heroHandler();

async function heroHandler() {
  try {
    const movieArr = await getTopMoviesArr(5);
    if (movieArr.length === 0) console.log('sorry nothing found');
    renderSwiper();
    const markup = movieArr
      .map(({ backdrop_path, title, overview, vote_average, id, name }) => {
        return renderSlide(
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
