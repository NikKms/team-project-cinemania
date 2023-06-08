import { getGenre } from '../api';

async function getGenresById(ids) {
  const data = await getGenre();
  const genres = data.genres;

  const arrGenres = ids.map(id => {
    const genre = genres.find(genre => genre.id === id);
    return genre ? genre.name : '';
  });
  return arrGenres.join(', ');
}

export { getGenresById };
