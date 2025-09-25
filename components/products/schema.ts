import * as z from "zod";
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/svg+xml",
];
const ACCEPTED_DOC_TYPES = [
  "application/x-zip-compressed", // .zip
  "application/x-rar-compressed", // .rar
];
// Schema for a single image file
const imageSchema = z.union([
  z
    .any() // para o File antes do upload
    .refine((file: File) => file.size <= MAX_FILE_SIZE, `Max 5MB`)
    .refine(
      (file: File) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Formato inválido"
    ),
  z.string(), // para a URL após upload
]);
const docs = z.union([
  z
    .any() // File
    .refine(
      (file: File) => ACCEPTED_DOC_TYPES.includes(file?.type),
      "Somente .zip ou .rar"
    ),
  z.string(), // URL
]);

export const docSchema = z
  .object({
    name: z.string().min(1, { message: "Campo obrigatorio" }),
    //  description: z.string().min(1, { message: "Campo obrigatorio" }),
    status: z.string().min(1, { message: "Por favor selecione um status" }),
    price: z
      .string()
      .min(1, "Campo obrigatório")
      .transform((val) => {
        const numericValue = val.replace(/\D/g, "");
        return (Number.parseInt(numericValue)).toFixed(2);
      }),
    emphasis: z.string().min(1, { message: "Selecione o campo de destaque" }),
    categoryIds: z.array(z.string()).min(1, "Selecione ao menos uma categoria"),
    images: z.array(imageSchema).optional(),
    description: z
      .string()
      .min(1, { message: "Por favor selecione um status" }),
    docs: docs.optional(),
  })
  .superRefine((data, ctx) => {
    console.log(data);
    if (data.status === "AVAILABLE") {
      if (!data.docs) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Documento obrigatório com Status Finalizado",
          path: ["docs"], // erro ligado só ao docs
        });
      }
      if (!data.images || data.images.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Selecione ao menos uma imagem com status Finalizado",
          path: ["images"],
        });
      }
    }
  });

export type DocType = z.infer<typeof docSchema>;
