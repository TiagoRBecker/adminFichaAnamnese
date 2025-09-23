"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { axiosConfig } from "./index";
import { useRouter } from "next/navigation";

const useAxiosAuth = () => {
  const router = useRouter();

  const publicRoutes = ["/auth/signin"];
  const { data: session, status } = useSession();


  useEffect(() => {
    if (status === "loading") return;
    const requestIntercept = axiosConfig.interceptors.request.use(
      async (config) => {
        const isPublicRoute = publicRoutes.some((route) =>
          config.url?.startsWith(route)
        );

        if (!isPublicRoute && session?.user?.accessToken) {
          config.headers.authorization = `Bearer ${session.user.accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // Interceptor para respostas (tratar erros)
    const responseIntercept = axiosConfig.interceptors.response.use(
      (response) => response, // sucesso: apenas retorna a resposta

      async (error) => {
        console.log(error);
        const originalRequest = error.config;
        if (error.code === "ERR_NETWORK") {
          await signOut({ redirect: false });
          return router.push("/error");
        }

        if (session?.user?.error === "RefreshAccessTokenError") {
          await Swal.fire(
            `Sua sessão expirou. Por favor, faça login novamente.`,
            "Clique no botão para continuar!",
            "error"
          );
          await signOut({ redirect: false, callbackUrl:"/" });

          return new Promise(() => {});
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosConfig.interceptors.request.eject(requestIntercept);
      axiosConfig.interceptors.response.eject(responseIntercept);
    };
  }, [session]);

  return axiosConfig;
};

export default useAxiosAuth;
