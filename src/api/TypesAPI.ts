import { BASE_API_URL } from "../shared/helpers";
import apiClient from "./apiClient";

export default {
  // GENRES
  getGenreGrid: (rowsPerPage: number, currentPage: number, searchInput: string) =>
    apiClient.get(`${BASE_API_URL}/types/genre/grid?rpp=${rowsPerPage}&cp=${currentPage}&sq=${searchInput}`),
  getGenres: () => apiClient.get(`${BASE_API_URL}/types/genre/all`),
  addGenre: (body) => apiClient.post(`${BASE_API_URL}/types/genre`, body),
  archiveGenre: (code) => apiClient.delete(`${BASE_API_URL}/types/genre/${code}`),

  // TICKETS
  getTicketGrid: (rowsPerPage: number, currentPage: number, searchInput: string) =>
    apiClient.get(`${BASE_API_URL}/types/ticket/grid?rpp=${rowsPerPage}&cp=${currentPage}&sq=${searchInput}`),
  getTicketTypes: () => apiClient.get(`${BASE_API_URL}/types/ticket/all`),
  addTicket: (body) => apiClient.post(`${BASE_API_URL}/types/ticket`, body),
  archiveTicketType: (code) => apiClient.delete(`${BASE_API_URL}/types/ticket/${code}`),

  // RESERVATIONS
  getReservationGrid: (rowsPerPage: number, currentPage: number, searchInput: string) =>
    apiClient.get(
      `${BASE_API_URL}/types/reservation/grid?rpp=${rowsPerPage}&cp=${currentPage}&sq=${searchInput}`
    ),
  addReservationType: (body) => apiClient.post(`${BASE_API_URL}/types/reservation`, body),
  archiveReservationType: (code) => apiClient.delete(`${BASE_API_URL}/types/reservation/${code}`),

  // PAYMENTS
  getPaymentGrid: (rowsPerPage: number, currentPage: number, searchInput: string) =>
    apiClient.get(
      `${BASE_API_URL}/types/payment/grid?rpp=${rowsPerPage}&cp=${currentPage}&sq=${searchInput}`
    ),
  addPaymentType: (body) => apiClient.post(`${BASE_API_URL}/types/payment`, body),
  archivePaymentType: (code) => apiClient.delete(`${BASE_API_URL}/types/payment/${code}`),

  // DISCOUNT
  getDiscountGrid: (rowsPerPage: number, currentPage: number, searchInput: string) =>
    apiClient.get(
      `${BASE_API_URL}/types/discount/grid?rpp=${rowsPerPage}&cp=${currentPage}&sq=${searchInput}`
    ),
  addDiscountType: (body) => apiClient.post(`${BASE_API_URL}/types/discount`, body),
  archiveDiscountType: (code) => apiClient.delete(`${BASE_API_URL}/types/discount/${code}`),
};
