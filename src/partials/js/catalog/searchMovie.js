import { refs } from '../refs';

const SEARCH_API_KEY = 'a085ac545112f176adc673a29d24631a';

refs.searchForm.addEventListener('submit', onSubmitForm);
console.log('Hi!');
export async function onSubmitForm(e) {
  console.log(e);
  //   e.preventDefault();
  //   searchMovie();
}

async function searchMovie() {
  try {
    const inputValue = document.querySelector('#search-form').value.trim();

    if (!inputValue) {
      console.log('Please enter something in the search.');
      return;
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${SEARCH_API_KEY}&query=${inputValue}`
    );

    if (!response.ok) {
      throw new Error('Unable to fetch movie data.');
    }

    const data = await response.json();

    if (data.results.length === 0) {
      console.log('No movies found for the given search query.');
      return;
    }

    const movie = data.results[0];

    console.log(`Movie found: ${movie.title}`);
  } catch (error) {
    console.log(error);
    console.log('An error occurred while fetching movie data.');
  }
}
