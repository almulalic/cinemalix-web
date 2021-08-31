import { BASE_API_URL } from "../shared/helpers";
import apiClient from "./apiClient";

export default {
  grid: (rowsPerPage: number, currentPage: number, searchInput: string) =>
    apiClient.get(`${BASE_API_URL}/hall/grid?rpp=${rowsPerPage}&cp=${currentPage}&sq=${searchInput}`),
  getAll: () => apiClient.get(`${BASE_API_URL}/hall/all`),
  add: (body) => apiClient.post(`${BASE_API_URL}/hall`, body),
  archive: (id) => apiClient.delete(`${BASE_API_URL}/hall/archive/${id}`),
};
