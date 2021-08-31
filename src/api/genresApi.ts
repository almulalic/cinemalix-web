import { BASE_API_URL } from "../shared/helpers";
import apiClient from "./apiClient";

export default {
  getAll: () => apiClient.get(`${BASE_API_URL}/web/genres/all`),
  getAllGenres: () => apiClient.get(`${BASE_API_URL}/web/genres/allGenres`),
};
