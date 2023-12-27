import axios from "axios";

const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";

const headers = {
  accept: "application/json",
  Authorization: "Bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url: string, params: string) => {
  try {
    const response = await axios.get(BASE_URL + url, { headers, params });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
