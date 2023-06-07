import { libRefs } from './lib-refs';

const { libSelectEl, libMoviesListEl } = libRefs;

const createLibSelectMarkup = genre => {
  return `<option value="${genre.id}">${genre.name}</option>`;
};

const createLibMoviesListMarkup = ({
  title,
  name,
  release_date,
  first_air_date,
  genres,
  poster_path,
  vote_average,
  id,
}) => {
  const genreNames = genres.map(genre => genre.name).slice(0, 2);

  const movieTitle = title || name;
  const movieReleaseYear = release_date || first_air_date;
  return ` <li class="weekly-card is-id" data-id=${id}>
  <div class="weekly-container-image">
    <img
      class="weekly-card-image"
     src="https://image.tmdb.org/t/p/original/${poster_path}"
      alt=""
    />
   <div class="overlay"></div>       
  </div>
  <div class="weekly-card-description">
    <div>
      <title class="weekly-card-description-title">${movieTitle}</title>
      <p class="weekly-card-description-other">${genreNames} | ${movieReleaseYear.substring(
    0,
    4
  )}</p>
    </div>
   <div class="Stars" style="--rating: ${parseFloat(
     (vote_average / 2).toFixed(1)
   )};" aria-label="Rating of this product is 2.3 out of 5."></div> 
  </div>
  
</li>`;
};

const renderLibSelectMarkup = genresArr => {
  const libSelectMarkupEls = genresArr.map(genre =>
    createLibSelectMarkup(genre)
  );
  libSelectEl.insertAdjacentHTML('beforeend', libSelectMarkupEls.join(' '));
};

const renderLibMoviesListMarkup = movies => {
  const libMovieListMarkup = movies.map(movie =>
    createLibMoviesListMarkup(movie)
  );
  libMoviesListEl.insertAdjacentHTML('beforeend', libMovieListMarkup.join(' '));
};

export { renderLibMoviesListMarkup, renderLibSelectMarkup };

