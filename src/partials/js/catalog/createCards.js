import { refs } from '../refs';

export const createCards = dataCard => {
  const markup = dataCard
    .map(card => {
      return `<li data-id="${card.id}" class="catalog-card">
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
  addHTML(markup);
};

function addHTML(cards) {
  refs.catalogFilms.innerHTML = cards;
}
