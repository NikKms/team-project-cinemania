import { swiper } from './swiper';
import { renderHeroSlider } from '../hero/heroUi';
import { onWatchTrailer } from './trailer-modal';
import { getTrending } from '../api';
import { Notify } from 'notiflix';

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
    renderHeroSlider(movieArr);
  } catch (error) {
    heroRefs.heroImgRef.classList.add('hero-main');
  }
}

async function getTopMoviesArr(numberOfMovies) {
  try {
    const data = await getTrending();
    const moviesArr = data.results;
    return createRandomMoviesArr(moviesArr, numberOfMovies);
  } catch (error) {
    Notify.warning('OOPS... Something go wrong, please try again.');
  }
}

function createRandomMoviesArr(moviesArr, numberOfMovies) {
  let randomMoviesArr = [];
  for (let i = 0; i < numberOfMovies; i++) {
    let randomIndex = Math.floor(Math.random() * moviesArr.length);
    randomMoviesArr.push(moviesArr.splice(randomIndex, 1)[0]);
  }
  return randomMoviesArr;
}

document.addEventListener('click', onWatchTrailer);

export { heroRefs };
export { swiper };
