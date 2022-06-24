import { useQuery } from "react-query";
import { axiosInstance } from "../../../config";

const useGetAccounts = async () => {
  // fetch all accounts

  const { data } = await axiosInstance({
    url: "/api/listAccounts/",
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.jwt}`,
    },
  });
  return data.accounts.slice(0).reverse();
};

export default function useApi() {
  return useQuery(["accounts"], useGetAccounts, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
