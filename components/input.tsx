import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

// forwardRef garante que o ref do RHF funcione
export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      ref={ref} // ref do RHF
      {...props} // todas as props do input
      className="w-full outline-none border-1 border-gray-400 h-11 rounded-md pl-3 bg-white"
    />
  );
});

Input.displayName = "Input";
