"use client";

import type React from "react";

import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CatType, catSchema } from "./schema";
import { Input } from "../input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { useCategoriesHook } from "@/lib/queries/useCategories";
import { useEffect } from "react";
import { Category } from "@/lib/types/category";

type Props = {
  category: Category;
  handleCloseModal: () => void;
};
export function CategoryForm({ category, handleCloseModal }: Props) {
  const { createCategory, updateCategory } = useCategoriesHook();
  const form = useForm<CatType>({
    resolver: zodResolver(catSchema),
    defaultValues: {
      description: "",
      name: "",
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = form;

  const onSubmit = handleSubmit(async (data) => {
    if (category?.id) {
      handleCloseModal();
      await updateCategory.mutate({ id: category.id, data });
    } else {
      handleCloseModal();
      await createCategory.mutate(data);
    }
  });

  useEffect(() => {
    if (category) {
      return reset(category);
    }
  }, [category, reset]);

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Nome da Categoria */}
        <div className="space-y-2">
          <Label htmlFor="name">Nome da Categoria</Label>
          <Input
            id="name"
            {...register("name")}
            placeholder="Digite o nome da categoria"
            required
          />
        </div>

        <div className="space-y-2">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="bg-white"
                    id="description"
                    placeholder="Descreva o produto..."
                    rows={4}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" className="flex-1">
            Criar
          </Button>
        </div>
      </form>
    </Form>
  );
}
