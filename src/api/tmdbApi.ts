import axios from "axios";
import { TMBD_BASE_API_URL, TMDB_API_KEY } from "../shared/helpers";

export default {
  getMovies: (query: string) =>
    axios.get(`${TMBD_BASE_API_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${query}`),
  getMovieDetails: (movieId: string) =>
    axios.get(`${TMBD_BASE_API_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}`),
  getMovieVideos: (movieId: string) =>
    axios.get(`${TMBD_BASE_API_URL}/movie/${movieId}/videos?api_key=${TMDB_API_KEY}`),
};
