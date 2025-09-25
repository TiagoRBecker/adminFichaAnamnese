import { uploadHook } from "@/lib/queries/upload";
import { useCategoriesHook } from "@/lib/queries/useCategories";
import { useDocumentsHook } from "@/lib/queries/useDocuments";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { docSchema, DocType } from "./schema";
import { Products } from "@/lib/types/products";
import Swal from "sweetalert2";
type Props = {
  product: Products;
  handleCloseModal: () => void;
};
export const useProducthookForm = ({ product, handleCloseModal }: Props) => {
  const { useUploadDocs, useUploadImages } = uploadHook();
  const { create, updateDoc } = useDocumentsHook();
  const { categoryQuery } = useCategoriesHook();
  const form = useForm<DocType>({
    resolver: zodResolver(docSchema),
    defaultValues: {
      images: [],
      docs: "",
      categoryIds: [],
      status: "AVAILABLE",
      name: "",
      price: "",
      emphasis: "false",
    },
  });
  const status = form.watch("status");

  useEffect(() => {
    if (product) {
      form.reset({
        ...product,
        categoryIds: product.categories.map((cat: { id: string }) => cat.id),
        docs: product?.doc?.key ? product.name : null,
        emphasis: product.highlight.toString(),
        price: (product.price / 100).toFixed(2),
        images: product.images,
      });
    }
  }, []);
  useEffect(() => {
    handleClearFiles();
  }, [status]);
  const { mutateAsync: uploadDocsFile } = useUploadDocs();
  const { mutateAsync: uploadImagesFiles } = useUploadImages();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const handleClearImages = (field: any, index: any) => {
    const newFiles = field.value.filter((_: File, i: number) => i !== index);

    field.onChange(newFiles);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClearDoc = (field: any) => {
    field.onChange("");
    if (pdfInputRef.current) pdfInputRef.current.value = "";
    return;
  };
  const handleClearFiles = () => {
    if (
      (status === "UNAVAILABLE" && fileInputRef.current?.value !== "") ||
      pdfInputRef.current?.value !== ""
    ) {
      return null;
    }
  };
  const uploadDocs = async (docs: File) => {
    if (docs instanceof File) {
      return await uploadDocsFile({ file: docs });
    }
  };
  const uploadImages = async (images: File[] | string[]) => {
    const files = images.filter((img): img is File => img instanceof File);

    if (!files.length) {
      return images;
    }
    const urls = await uploadImagesFiles(images as File[]);
    return urls.urls;
  };
  const handleCreateDocs = async (data: DocType) => {
    const docs = await uploadDocs(data.docs);
    const images = await uploadImages(data.images as File[]);

    create.mutate({
      ...data,
      docs: docs ?? null,
      images: images ? images : [],
    });
    handleCloseModal();
  };
  const handleUpdateDocs = async (data: DocType) => {
    const docs = await uploadDocs(data.docs);
    const images = await uploadImages(data.images as File[]);
    console.log(docs);
    console.log(product.doc.key);
    updateDoc.mutate({
      id: product.id,
      data: {
        ...data,
        docs: docs ?? product.doc.key,
        images: images ?? data.images,
      },
    });
    handleCloseModal();
  };
  const onSubmit = form.handleSubmit(async (data) => {
    if (product?.id) {
      return handleUpdateDocs(data);
    }
    return handleCreateDocs(data);
  });

  return {
    onSubmit,
    handleClearDoc,
    handleClearImages,
    categoryQuery,
    fileInputRef,
    pdfInputRef,
    status,
    form,
  };
};
