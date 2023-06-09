import { refs } from '../refs';

export const createCards = dataCard => {
  const errorModule = document.querySelector('.no-movie-found');
  if (errorModule !== null) errorModule.remove();
  const markup = dataCard
    .map(card => {
      return `<li data-id="${card.id}" class="catalog-card is-id">
  <img
    src="https://image.tmdb.org/t/p/original${card.poster}"
    alt="${card.title}"
    loading="lazy"
  />
  <div class="catalog-overlay"></div>
  <div class="catalog-info">
    <h3 class="catalog-info-name">${card.title}</h3>
    <div class="catalog-info-date">
      <p class="catalog-info-details">${card.genres} | ${card.date}</p>
      <div
        class="Stars stars-five"
        style="--rating: ${card.rating}"
        aria-label="Rating of this product is 2.3 out of 5."
      ></div>
    </div>
  </div>
</li>`;
    })
    .join('');
  if (!markup.length) {
    const errorMarkup = createSearchErrors();
    refs.catalogFilms.insertAdjacentHTML('beforebegin', errorMarkup);
    refs.catalogFilms.innerHTML = '';
    return;
  }
  addHTML(markup);
};

const createSearchErrors = () => {
  const markupErrors = `<div class="no-movie-found">
    <p class="no-movie-found__text">
      <span class="no-movie-found__text-item">OOPS...</span>
      <span class="no-movie-found__text-item">We are very sorry!</span>
      <span class="no-movie-found__text-item">
        We don’t have any results matching your search.
      </span>
    </p>
  </div>`;

  return markupErrors;
};

function addHTML(cards) {
  refs.catalogFilms.innerHTML = cards;
}
