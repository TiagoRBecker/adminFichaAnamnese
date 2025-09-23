import { useMutation } from "@tanstack/react-query";
import useAxiosAuth from "../axios/useAxiosHook";

export const uploadHook = () => {
  const api = useAxiosAuth();
  const useUploadImages = () => {
    return useMutation({
      mutationFn: async (files: File[]) => {
        const formData = new FormData();
        files.forEach((file) => formData.append("images", file));
        const response = await api.post(
          "http://localhost:3001/upload/images",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        return response.data;
      },
      async onSuccess(data, variables, context) {
       return 
      },
      async onError(error, variables, context) {
        
      },
    });
  };
  const useUploadDocs = () => {
    return useMutation({
      mutationFn: async (data: { file: File; key?: string }) => {
        const formData = new FormData();
        formData.append("docs", data.file);
        formData.append("key", data.key as string);
        console.log(formData.get("docs"));
        const response = await api.post(
          "/upload/docs",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        return response.data;
      },
      async onSuccess(data, variables, context) {
       return 
      },
      async onError(error, variables, context) {},
    });
  };
  return {
    useUploadImages,
    useUploadDocs,
  };
};
