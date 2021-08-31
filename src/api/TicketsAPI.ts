import apiClient from "./apiClient";
import { BASE_API_URL } from "../shared/helpers";

export default {
  getAllTickets: (rowsPerPage: number, currentPage: number, searchInput: string) =>
    apiClient.get(`${BASE_API_URL}/tickets/grid?rpp=${rowsPerPage}&cp=${currentPage}&sq=${searchInput}`),
};
