"use client";

import Swal, { SweetAlertIcon } from "sweetalert2";

export const useSwal = () => {
  const show = (
    title: string,
    text?: string,
    icon: SweetAlertIcon = "info"
  ) => {
    return Swal.fire({
      title,
      text,
      icon,

      confirmButtonText: "Ok",
      customClass: {
        container: "z-[20000]",
      },

      target: document.body,
    });
  };
  const isConfirmed = async (
    title: string,
    text: string,
    icon: SweetAlertIcon = "info"
  ) => {
    const isOk = await Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Deletar",
      reverseButtons: true,
    });
    if (isOk.isConfirmed) return true;
  };

  return { show, isConfirmed };
};
