import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "../axios/useAxiosHook";

export const useCarts = () => {
  const api = useAxiosAuth();

  return useQuery({
    queryKey: ["carts-all"],
    queryFn: async () => {
      const response = await api.get("/cart/all");
      return response.data;
    },
  });
};
