import { refs } from '../refs';

export const createCards = dataCard => {
  const markup = dataCard
    .map(card => {
      return `<li data-id=${card.id} class="catalog-card">
      <img src='https://image.tmdb.org/t/p/original${card.poster}' alt="${
        card.title
      }" loading="lazy" />
      <div class="catalog-info">
      <p class="catalog-info-name">${card.title}</p>
        <div class="catalog-info-container">
          <p class="catalog-info-details">
            <span>${card.genres}</span>
            <span>${card.date}</span>
          </p>
          <div
          class="Stars"
          style="--rating: ${card.rating / 2}"
          aria-label="Rating of this product is 2.3 out of 5."
        ></div>
        </div>
      </div>
      <div class="overlay"></div>
    </li>`;
    })
    .join('');
  addHTML(markup);
  //console.log(markup);
  //   dataCard.map(el => console.log(el));
};

function addHTML(cards) {
  refs.catalogFilms.innerHTML = cards;
}
