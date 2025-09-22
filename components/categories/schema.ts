import z from "zod"
export const catSchema = z.object({
  name: z.string().min(1, { message: "Campo obrigatorio" }),
  //  description: z.string().min(1, { message: "Campo obrigatorio" }),
  description: z.string().min(1, { message: "Por favor insira a descrição" }),
});

export type CatType = z.infer<typeof catSchema>;
