import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "../axios/useAxiosHook";

export const useCarts = () => {
  const api = useAxiosAuth();

  return useQuery({
    queryKey: ["abandoned-carts"],
    queryFn: async () => {
      const response = await api.get("/abandoned/all");
      return response.data;
    },
  });
};
