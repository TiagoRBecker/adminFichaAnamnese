import { DocType } from "@/components/products/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import useAxiosAuth from "../axios/useAxiosHook";
import { useSwal } from "../swall";

type Props = {
  id: string;
  data: DocType;
};
export const useDocumentsHook = () => {
  const  { show } = useSwal()
  const api = useAxiosAuth();
  const queryClient = useQueryClient();

  const docQuery = useQuery({
    queryKey: ["docs"],
    queryFn: async () => {
      const response = await api.get("/products");
      return response.data;
    },
  });

  const create = useMutation({
    mutationFn: async (data: DocType) => {
      const response = await api.post(
        "/products/create",
        data
      );

      return response.data;
    },
    async onSuccess(data, variables, context) {
      await queryClient.invalidateQueries({ queryKey: ["docs"] });
        await show(
          "Sucesso",
          "Documento criado com sucesso",
          "success"
        );
      return;
    },
    async onError(error, variables, context) {
        await show(
          "Erro ao criar",
          "Ocorreu um erro ao criar a documento",
          "error"
        );
        return;
    },
  });

  const updateDoc = useMutation({
    mutationFn: async ({ id, data }: Props) => {
      const response = await api.put(
        `/update/${id}`,
        data
      );

      return response.data;
    },
    async onSuccess(data, variables, context) {
      await queryClient.invalidateQueries({ queryKey: ["docs"] });
         await show(
          "Atualizado",
          "Documento atualizado com sucesso",
          "success"
        );
        return
    },
    async onError(error, variables, context) {
         await show(
          "Erro ao atualizar",
          "Erro ao  atualizar o  documento.",
          "error"
        );
        return 
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
