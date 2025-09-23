import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CatType } from "@/components/categories/schema";
import { useSwal } from "../swall";
import useAxiosAuth from "../axios/useAxiosHook";
type PropsUpdate = {
  id: string;
  data: CatType;
};
export const useCategoriesHook = () => {
  const api = useAxiosAuth()
  const queryClient = useQueryClient();
  const { show } = useSwal();

    const categoryQuery =  useQuery({
      queryKey: ["categories"],
      queryFn: async () => {
        const response = await api("http://localhost:3001/categories");
        return response.data;
      },
    });
  


    const createCategory =  useMutation({
      mutationFn: async (data: { name: string; description: string }) => {
        const response = await api.post(
          "/categories/create",
          data
        );

        return response.data;
      },
      async onSuccess(data, variables, context) {
        await queryClient.invalidateQueries({ queryKey: ["categories"] });
        await show(
          "Criado com sucesso",
          "Sua categoria foi atualizada com sucesso",
          "success"
        );
        return;
      },
      async onError(error, variables, context) {
        await show(
          "Erro ao atualizar",
          "Ocorreu um erro ao ataulizar a categoria",
          "error"
        );
        return;
      },
    });
  

    const updateCategory =  useMutation({
      mutationFn: async ({ id, data }: PropsUpdate) => {
        const response = await api.put(
          `http://localhost:3001/categories/${id}`,
          data
        );

        return response.data;
      },
      async onSuccess(data, variables, context) {
        await queryClient.invalidateQueries({ queryKey: ["categories"] });
        await show(
          "Atualizado com sucesso",
          "Sua categoria foi atualizada com sucesso",
          "success"
        );
        return;
      },
      async onError(error, variables, context) {
        await show(
          "Erro ao atualizar",
          "Ocorreu um erro ao ataulizar a categoria",
          "error"
        );
        return;
      },
    });


    const deleteCategory =  useMutation({
      mutationFn: async (id: string) => {
        const response = await api.delete(
          `http://localhost:3001/categories/${id}`
        );

        return response.data;
      },
      async onSuccess(data, variables, context) {
        await queryClient.invalidateQueries({ queryKey: ["categories"] });
        await show(
          "Deletada com sucesso",
          "Sua categoria foi atualizada com sucesso",
          "success"
        );
        return;
      },
      async onError(error, variables, context) {
        await show(
          "Erro ao deletar",
          "Ocorreu um erro ao ataulizar a categoria",
          "error"
        );
        return;
      },
    });
      const getCachedCategory = () => {
    return queryClient.getQueryData<[]>(["categories"]);
  };

  return {
   categoryQuery,
   createCategory,
   updateCategory,
   deleteCategory,
   getCachedCategory


  };
};
