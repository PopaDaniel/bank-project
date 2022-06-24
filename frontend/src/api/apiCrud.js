import { axiosInstance } from "../config";
import popAlert from "../helpers/popAlert";

async function apiCrud(url, method, message, data, action) {
  await axiosInstance({
    url: url,
    method: method,
    headers: {
      Authorization: `Bearer ${localStorage.jwt}`,
    },
    data: data && data,
  })
    .then((res) => {
      console.log(res.data);
      message && popAlert(message);
      setTimeout(() => window.location.reload(), 1500);
      action && action();
      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        // Request made and server responded
        popAlert(error.response.data.message, "error");
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        popAlert("No response!", "error");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        popAlert("Somthing wrong!", "error");
      }
    });
}

export default apiCrud;
