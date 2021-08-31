import { BASE_API_URL } from "../shared/helpers";
import apiClient from "./apiClient";

export default {
  getAllScreenings: (
    searchInput: string,
    rowsPerPage: number,
    currentPage: number,
    startDate: string,
    endDate: string
  ) =>
    apiClient.get(
      `${BASE_API_URL}/screenings/all?sq=${searchInput}&rpp=${rowsPerPage}&cp=${currentPage}&startDate=${startDate}&endDate=${endDate}`
    ),
  getNonAuthAllScreenings: (
    searchInput: string,
    rowsPerPage: number,
    currentPage: number,
    startDate: string,
    endDate: string
  ) =>
    apiClient.get(
      `${BASE_API_URL}/web/movies/allScreenings?sq=${searchInput}&rpp=${rowsPerPage}&cp=${currentPage}&startDate=${startDate}&endDate=${endDate}`
    ),
  getMovieScreeningTimeline: (startDate?: string, endDate?: string) =>
    apiClient.get(`${BASE_API_URL}/screenings/timeline?startDate=${startDate}&endDate=${endDate}`),
  getScreening: (screeningId) => apiClient.get(`${BASE_API_URL}/screenings/${screeningId}`),
  add: (body) => apiClient.post(`${BASE_API_URL}/screenings`, body),
  archive: (screeningId) => apiClient.delete(`${BASE_API_URL}/screenings/archive/${screeningId}`),
};
