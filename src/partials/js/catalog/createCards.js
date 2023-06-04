import { refs } from '../refs';

export const createCards = dataCard => {
  const markup = dataCard
    .map(card => {
      return `<div data-id=${card.id} class="catalog-card">
      <img src='https://image.tmdb.org/t/p/original${card.poster}' alt="${card.title}" loading="lazy" />
      <div class="catalog-info">
        <div>
          <p class="catalog-info-name">
            <b>${card.title}</b>
          </p>
          <p class="catalog-info-details">
            <span>${card.genres}</span>
            <span class="catalog-info-border" >${card.date}</span>
          </p>
        </div>
        <div
          class="Stars"
          style="--rating: ${card.rating}"
          aria-label="Rating of this product is 2.3 out of 5."
        ></div>
      </div>
    </div>`;
    })
    .join('');
  addHTML(markup);
  console.log(markup);
  //   dataCard.map(el => console.log(el));
};

function addHTML(cards) {
  refs.catalogFilms.innerHTML = cards;
}
