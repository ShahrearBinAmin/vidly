import http from "./httpService";
import { baseUrl } from "../config/config.json";
import jwtDecode from "jwt-decode";

const apiEndpoint = baseUrl + "/auth";
const tokenKey = "token";

http.setJWT(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, {
    email,
    password,
  });

  localStorage.setItem(tokenKey, jwt);
  return jwt;
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
};
