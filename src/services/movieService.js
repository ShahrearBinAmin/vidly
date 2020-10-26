import http from "./httpService";
import { baseUrl } from "../config/config.json";

export function getMovies() {
  return http.get(`${baseUrl}/movies`);
}

export function getMovie(movieId) {
  return http.get(`${baseUrl}/movies/${movieId}`);
}

export function deleteMovie(movieId) {
  console.log(movieId);
  return http.delete(`${baseUrl}/movies/${movieId}`);
}

export async function saveMovie(movie) {
  return http.post(`${baseUrl}/movies`, movie);
}
