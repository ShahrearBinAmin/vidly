import http from "./httpService";
import { baseUrl } from "../config/config.json";

function movieUrl(movieId) {
  return `${baseUrl}/movies/${movieId}`;
}

export function getMovies() {
  return http.get(`${baseUrl}/movies`);
}

export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}

export async function saveMovie(movie) {
  console.log(movie);
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  }
  return http.post(`${baseUrl}/movies`, movie);
}
