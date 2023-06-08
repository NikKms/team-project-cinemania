import { libRefs } from './lib-refs';
import { handleDeleteFilm, getGenreName } from './lib-main';

const { libSelectEl, libMoviesListEl } = libRefs;

const createLibSelectMarkup = genre => {
  return `<option value="${genre.id}">${genre.name}</option>`;
};

const createLibMoviesListMarkup = async ({
  title,
  name,
  release_date,
  first_air_date,
  genresIds,
  poster_path,
  vote_average,
  id,
}) => {
  const genreName = await getGenreName(genresIds);
  const movieTitle = title || name;
  const movieReleaseYear = release_date || first_air_date;
  let imagePath;
  if (poster_path !== null) {
    imagePath = `https://image.tmdb.org/t/p/original/${poster_path}`;
  } else {
    imagePath =
      'https://d2ths1nqi4sbhh.cloudfront.net/images/no-image.png?v=3884857787';
  }
  return ` <li class="weekly-card  is-id" data-id=${id}>
  <div class="weekly-container-image">
    <img
      class="weekly-card-image"
     src="${imagePath}"
      alt=""
    />
   <div class="overlay"></div>      
   <button class="delete-film-btn">X</button> 
  </div>
  <div class="weekly-card-description">
    <div>
      <title class="weekly-card-description-title">${movieTitle}</title>
      <p class="weekly-card-description-other"> ${genreName} | ${movieReleaseYear.substring(
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

const renderLibSelectMarkup = async genresArr => {
  const libSelectMarkupEls = await Promise.all(
    genresArr.map(genre => createLibSelectMarkup(genre))
  );
  libSelectEl.insertAdjacentHTML('beforeend', libSelectMarkupEls.join(' '));
};

const renderLibMoviesListMarkup = async movies => {
  const libMovieListMarkup = await Promise.all(
    movies.map(movie => createLibMoviesListMarkup(movie))
  );
  libMoviesListEl.insertAdjacentHTML('beforeend', libMovieListMarkup.join(' '));

  const deleteFilmButtons =
    libMoviesListEl.querySelectorAll('.delete-film-btn');

  deleteFilmButtons.forEach(button => {
    button.addEventListener('click', handleDeleteFilm);
  });
};

export { renderLibMoviesListMarkup, renderLibSelectMarkup };
