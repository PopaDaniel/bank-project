import { useQuery } from "react-query";
import { axiosInstance } from "../config";

const callApi = async (url, method, noAuth, body) => {
  const { data } = await axiosInstance({
    url: url,
    method: method,
    headers: {
      Authorization: !noAuth && `Bearer ${localStorage.jwt}`,
    },
    data: body,
  });
  return data;
};

export default function useApi(url, method, headers, body) {
  return useQuery(["call", url, method, headers, body], () =>
    callApi(url, method, headers, body)
  );
}
