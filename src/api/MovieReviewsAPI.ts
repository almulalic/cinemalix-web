import { BASE_API_URL } from "../shared/helpers";
import apiClient from "./apiClient";

export default {
  getAllReviews: (rowsPerPage: number, currentPage: number, searchInput: string) =>
    apiClient.get(`${BASE_API_URL}/movieReviews/all?rpp=${rowsPerPage}&cp=${currentPage}&sq=${searchInput}`),
  getMovieReviews: (movieId: number) => apiClient.get(`${BASE_API_URL}/movieReviews/web/movie/${movieId}`),
  postReviews: (body: any) => apiClient.post(`${BASE_API_URL}/movieReviews`, body),
  archive: (reviewsId) => apiClient.delete(`${BASE_API_URL}/movieReviews/archive/${reviewsId}`),
};
