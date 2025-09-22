import { useMutation } from "@tanstack/react-query";
import useAxiosAuth from "../axios/useAxiosHook";


type Props = {
    userId:string,
    prefix:string
}
export const useSendEmail = () => {
  const axios = useAxiosAuth();
  return useMutation({
    mutationFn: async ({prefix,userId }:Props) => {
      const response = await axios.post(`/emails/send`, {prefix,userId});

      return response.data;
    },
    async onSuccess(data, variables, context) {
     console.log(data)
      return;
    },
    async onError(error: any, variables, context) {
      console.log(error);
      return;
    },
  });
};
