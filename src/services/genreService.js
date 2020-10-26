import http from "./httpService";
import { baseUrl } from "../config/config.json";

export async function getGenres() {
  const genres = await http.get(`${baseUrl}/genres`);
  return genres;
}
