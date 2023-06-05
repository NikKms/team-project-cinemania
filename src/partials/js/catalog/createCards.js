import { refs } from '../refs';

export const createCards = dataCard => {
  const markup = dataCard
    .map(card => {
      return `<div data-id=${card.id} class="catalog-card">
      <img src='https://image.tmdb.org/t/p/original${card.poster}' alt="${card.title}" loading="lazy" />
      <ul class="catalog-info">
        <li>
          <p class="catalog-info-name">
            <b>${card.title}</b>
          </p>
          <p class="catalog-info-details">
            <span>${card.genres}</span>
            <span class="catalog-info-border">${card.date}</span>
          </p>
        </li>
        <li
          class="Stars"
          style="--rating: ${card.rating}"
          aria-label="Rating of this product is 2.3 out of 5."
        ></li>
      </ul>
    </div>`;
    })
    .join('');
  addHTML(markup);
};

function addHTML(cards) {
  refs.catalogFilms.innerHTML = cards;
}
