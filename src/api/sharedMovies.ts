import apiClient from "./apiClient";
import { BASE_API_URL } from "../shared/helpers";

export default {
  getAllMovies: () => apiClient.get(`${BASE_API_URL}/web/movies/all`),
  getAllVerboseMovies: () => apiClient.get(`${BASE_API_URL}/web/movies/verboseAll`),
};
