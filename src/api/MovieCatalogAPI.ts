import axios from "axios";
import { BASE_API_URL } from "../shared/helpers";
import apiClient from "./apiClient";

export interface IAddMovieDTO {
  title: string;
  description: string;
  overviewLink: string;
  releaseYear: string;
  runningTimeInMinutes: number;
  ageRating: number;
  genres: string[];
  hasLocalAudio: boolean;
  hasLocalSubtitles: boolean;
  has3D: boolean;
  profitPercentageShare: number;
  videoLink: string;
  imageLink: string;
  backdropImageURL: string;
}

export default {
  getMovieDropdownValues: (searchInput: string) =>
    apiClient.get(`${BASE_API_URL}/web/movies/dropdown?sq=${searchInput}`),
  getAllMovies: (searchInput: string, rowsPerPage: number, currentPage: number) =>
    apiClient.get(
      `${BASE_API_URL}/web/movies/verboseAll?sq=${searchInput}&rpp=${rowsPerPage}&cp=${currentPage}`
    ),
  getMovieDetails: (id: number) => apiClient.get(`${BASE_API_URL}/web/movies/${id}`),
  getAllWithScreenings: (rowsPerPage: number, currentPage: number) =>
    apiClient.get(`${BASE_API_URL}/web/movies/screenings?rpp=${rowsPerPage}&cp=${currentPage}`),
  addMovie: (formData) =>
    apiClient.post(`${BASE_API_URL}/web/movies`, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    }),
  getLatest: () => apiClient.get(`${BASE_API_URL}/web/movies/latest`),
  getBestRated: () => apiClient.get(`${BASE_API_URL}/web/movies/bestRated`),
  getSimilarMoviesByGenre: (currentMovieId: number, genres: string) =>
    apiClient.post(`${BASE_API_URL}/web/movies/similarGenres/${currentMovieId}`, {
      genres: genres,
    }),
  archive: (movieId: number) => apiClient.delete(`${BASE_API_URL}/web/movies/archive/${movieId}`),
};
