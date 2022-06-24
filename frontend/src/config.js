import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "https://git.heroku.com/app-banca.git/",
});
