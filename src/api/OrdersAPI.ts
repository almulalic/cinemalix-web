import apiClient from "./apiClient";
import { BASE_API_URL } from "../shared/helpers";

export default {
  getAllOrders: (rowsPerPage: number, currentPage: number, searchInput: string) =>
    apiClient.get(`${BASE_API_URL}/orders/grid?rpp=${rowsPerPage}&cp=${currentPage}&sq=${searchInput}`),
  archiveOrder: (id) => apiClient.delete(`${BASE_API_URL}/orders/finalize/${id}`),
};
