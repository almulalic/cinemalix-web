import { BASE_API_URL } from "../shared/helpers";
import apiClient from "./apiClient";

export interface CreateUserDTO {
  name: string;
  surname: string;
  username: string;
  email: string;
  contactPhone: string;
  password: string;
  passwordRepeat: string;
}
export interface UpdateBodyDTO {
  name: string;
  surname: string;
  username: string;
  email: string;
  contactPhone: string;
}

export interface UpdatePasswordDTO {
  oldPassword: string;
  newPassword: string;
  newPasswordRepeat: string;
}

export default {
  getAllUsers: (rowsPerPage: number, currentPage: number, searchInput: string) =>
    apiClient.get(`${BASE_API_URL}/users/all?rpp=${rowsPerPage}&cp=${currentPage}&sq=${searchInput}`),
  getReviews: (rowsPerPage: number, currentPage: number) =>
    apiClient.get(`${BASE_API_URL}/users/reviews?rpp=${rowsPerPage}&cp=${currentPage}`),
  create: (body: CreateUserDTO) => apiClient.post(`${BASE_API_URL}/auth/signup`, body),
  update: (body: UpdateBodyDTO) => apiClient.put(`${BASE_API_URL}/users`, body),
  updatePassword: (body: UpdatePasswordDTO) => apiClient.put(`${BASE_API_URL}/users/updatePassword`, body),
  lock: (id: number) => apiClient.put(`${BASE_API_URL}/users/lock/${id}`),
  unlock: (id: number) => apiClient.put(`${BASE_API_URL}/users/unlock/${id}`),
  archive: (id: number) => apiClient.delete(`${BASE_API_URL}/users/archive/${id}`),
  delete: (id: number) => apiClient.delete(`${BASE_API_URL}/users/${id}`),
};
