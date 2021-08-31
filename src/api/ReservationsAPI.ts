import { BASE_API_URL } from "../shared/helpers";
import apiClient from "./apiClient";

export default {
  getAllReservations: (rowsPerPage: number, currentPage: number, searchQuery: string) =>
    apiClient.get(`${BASE_API_URL}/reservations?rpp=${rowsPerPage}&cp=${currentPage}&sq=${searchQuery}`),
  archive: (reservationId: number) =>
    apiClient.delete(`${BASE_API_URL}/reservations/cancel/${reservationId}`),
};
