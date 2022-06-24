import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "https://banca-appx.herokuapp.com",
});
