import { DocType } from "@/components/products/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import useAxiosAuth from "../axios/useAxiosHook";

type Props = {
  id: string;
  data: DocType;
};
export const useDocumentsHook = () => {
  const api = useAxiosAuth();
  const queryClient = useQueryClient();

  const docQuery = useQuery({
    queryKey: ["docs"],
    queryFn: async () => {
      const response = await api.get("http://localhost:3001/products");
      return response.data;
    },
  });

  const create = useMutation({
    mutationFn: async (data: DocType) => {
      const response = await api.post(
        "http://localhost:3001/products/create",
        data
      );

      return response.data;
    },
    async onSuccess(data, variables, context) {
      await queryClient.invalidateQueries({ queryKey: ["docs"] });
      return;
    },
    async onError(error, variables, context) {
      console.log(error);
    },
  });

  const updateDoc = useMutation({
    mutationFn: async ({ id, data }: Props) => {
      const response = await api.put(
        `http://localhost:3001/products/update/${id}`,
        data
      );

      return response.data;
    },
    async onSuccess(data, variables, context) {
      await queryClient.invalidateQueries({ queryKey: ["docs"] });
    },
    async onError(error, variables, context) {
      console.log(error);
    },
  });

  const getCachedDocs = () => {
    return queryClient.getQueryData<[]>(["docs"]);
  };
  return {
    docQuery,
    create,
    updateDoc,
    getCachedDocs,
  };
};
