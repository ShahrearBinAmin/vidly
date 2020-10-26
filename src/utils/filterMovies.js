import _ from "lodash";

export function filterMovies(movies, genre) {
  return movies.filter((movie) => movie.genre._id === genre._id);
}
