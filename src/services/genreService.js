import http from "./httpService";
import { baseUrl } from "../config/config.json";

const apiEndpoint = "/genres";
export async function getGenres() {
  const genres = await http.get(apiEndpoint);
  return genres;
}
