import { BASE_API_URL } from "../shared/helpers";
import apiClient from "./apiClient";

export default {
  add: (body) => apiClient.post(`${BASE_API_URL}/identities/registration`, body),
};
