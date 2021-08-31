import axios from "axios";
import { BASE_API_URL } from "../shared/helpers";

export interface ICurrentUser {
  id: number;
  name: string;
  surname: string;
  username: string;
  email: string;
  contactPhone: string;
  role: number;
}

export default {
  login: (credential: string, password: string) =>
    axios.post(BASE_API_URL + "/auth/login", {
      credential: credential,
      password: password,
    }),
  validateToken: (token: string) => axios.post(BASE_API_URL + `/auth/isTokenValid/${token}`),
  setCurrentUser: (body: string) => {
    localStorage.setItem("currentUser", body);
  },
  getCurrentUser: () => {
    let currentUser = localStorage.getItem("currentUser");
    if (currentUser && localStorage.getItem("api_token") != null) {
      let parsed = JSON.parse(currentUser);

      if (
        parsed.name != null &&
        parsed.surname != null &&
        parsed.username != null &&
        parsed.contactPhone != null &&
        parsed.email != null &&
        parsed.role != null
      )
        return parsed;
    } else return false;
  },
  getToken: () => {
    return localStorage.getItem("api_token");
  },
  setToken: (newToken: string) => {
    localStorage.setItem("api_token", newToken);
  },
};
