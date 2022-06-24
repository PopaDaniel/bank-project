import { useQuery } from "react-query";
import { axiosInstance } from "../../../config";

const useGetUserAccounts = async () => {
  // fetch all users

  const { data } = await axiosInstance({
    url: "/api/userAccounts",
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.jwt}`,
    },
  });
  return data.accounts.slice(0).reverse();
};

export default function useApi() {
  return useQuery(["users"], useGetUserAccounts, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
