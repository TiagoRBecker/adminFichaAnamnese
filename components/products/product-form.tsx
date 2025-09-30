"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, FileText, ImageIcon } from "lucide-react";
import { emphasisvalues, stockValues } from "@/lib/mock";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "../input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "../ui/form";
import { Products } from "@/lib/types/products";
import { useProducthookForm } from "./use-forms-hook";
import { useEffect } from "react";

type Props = {
  product: Products;
  handleCloseModal: () => void;
};
export function ProductForm({ product, handleCloseModal }: Props) {
  const {
    handleClearDoc,
    handleClearImages,
    onSubmit,
    form,
    categoryQuery,
    fileInputRef,
    pdfInputRef,
    status,
  } = useProducthookForm({ product, handleCloseModal });
  useEffect(() => {
    if (
      status === "UNAVAILABLE" &&
      (fileInputRef.current?.value !== "" || pdfInputRef.current?.value !== "")
    ) {
      form.setValue("images", []);
      form.setValue("docs", "");
      return;
    }
  }, [status, fileInputRef, pdfInputRef]);

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="w-full  h-full flex flex-col gap-5">
        <div className="w-full grid grid-cols-2 gap-10">
          <div
            className={
              status === "UNAVAILABLE"
                ? "w-full flex flex-col gap-3 col-span-2"
                : "w-full flex flex-col gap-3"
            }
          >
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Produto</Label>
              <Input
                {...form.register("name")}
                placeholder="Digite o nome do produto"
                required
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="R$ 0,00"
                        value={field.value ? `R$ ${field.value}` : ""}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/\D/g, "");
                          const formatted = (Number(raw) / 100).toLocaleString(
                            "pt-BR",
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          );

                          field.onChange(formatted);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="status"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={product?.doc?.key ? true : false}
                    >
                      {stockValues?.map(
                        (option: {
                          id: number;
                          name: string;
                          value: string;
                        }) => {
                          return (
                            <FormItem
                              key={option.id}
                              className="flex items-center gap-2"
                            >
                              <FormControl>
                                <div className="flex items-center space-x-2 ">
                                  <RadioGroupItem
                                    className="border-1 border-black"
                                    value={option.value}
                                    id={option.value}
                                  />
                                </div>
                              </FormControl>
                              <FormLabel className="text-sm">
                                {option.name}
                              </FormLabel>
                            </FormItem>
                          );
                        }
                      )}
                    </RadioGroup>
                    {fieldState.error && (
                      <>
                        {console.log(fieldState)}
                        <span className="text-red-500 text-sm">
                          {fieldState.error.message}
                        </span>
                      </>
                    )}
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="categoryIds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categorias</FormLabel>
                    {categoryQuery.data?.map(
                      (cat: { id: string; name: string }) => {
                        const isChecked = field.value?.includes(cat.id);
                        return (
                          <FormItem
                            key={cat.id}
                            className="flex items-center gap-2"
                          >
                            <FormControl>
                              <Checkbox
                                checked={isChecked}
                                className="border-1 border-black"
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    //Adiciona itens ao array
                                    field.onChange([...field.value, cat.id]);
                                  } else {
                                    //Remove caso ja tenha sido  adicionado ao  array
                                    field.onChange(
                                      field.value.filter((v) => v !== cat.id)
                                    );
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm">
                              {cat.name}
                            </FormLabel>
                          </FormItem>
                        );
                      }
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="emphasis"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Destacar produto</FormLabel>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      {emphasisvalues?.map(
                        (option: {
                          id: number;
                          name: string;
                          value: string;
                        }) => {
                          return (
                            <FormItem
                              key={option.id}
                              className="flex items-center gap-2"
                            >
                              <FormControl>
                                <div className="flex items-center space-x-2 ">
                                  <RadioGroupItem
                                    className="border-1 border-black"
                                    value={option.value}
                                    id={option.value}
                                  />
                                </div>
                              </FormControl>
                              <FormLabel className="text-sm">
                                {option.name}
                              </FormLabel>
                            </FormItem>
                          );
                        }
                      )}
                    </RadioGroup>
                    {fieldState.error && (
                      <>
                        {console.log(fieldState)}
                        <span className="text-red-500 text-sm">
                          {fieldState.error.message}
                        </span>
                      </>
                    )}
                  </FormItem>
                )}
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
          </div>
          <div className="w-full flex flex-col gap-3">
            {status === "AVAILABLE" && (
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Imagem do Produto</FormLabel>
                      <Card className="border-dashed border-2 border-muted-foreground/25">
                        <CardContent className="p-6">
                          {field.value && field.value.length > 0 ? (
                            <div className="grid grid-cols-5 gap-4">
                              {field.value.map(
                                (file: string | File, index: number) => (
                                  <div key={index} className="relative group">
                                    <img
                                      src={
                                        typeof file === "string"
                                          ? file // URL existente
                                          : URL.createObjectURL(file) // File novo
                                      }
                                      alt="Preview"
                                      className="w-16 h-16 rounded-lg object-cover"
                                    />
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => {
                                        handleClearImages(field, index);
                                      }}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                )
                              )}
                            </div>
                          ) : (
                            <div className="text-center">
                              <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                              <div className="mt-4">
                                <Button
                                  type="button"
                                  variant="ghost"
                                  onClick={() => fileInputRef.current?.click()}
                                >
                                  <Upload className="mr-2 h-4 w-4" />
                                  Carregar Imagem
                                </Button>
                              </div>
                              <p className="text-xs text-muted-foreground mt-2">
                                PNG, JPG até 10MB, máximo 10 imagens
                              </p>
                            </div>
                          )}

                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={(e) => {
                              const files = Array.from(e.target.files || []);
                              if (files.length > 10) {
                                return;
                              }
                              field.onChange(
                                [...(field.value as any), ...files].slice(0, 10)
                              );
                            }}
                          />
                        </CardContent>
                      </Card>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            {status === "AVAILABLE" && (
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="docs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Arquivo PPTX</FormLabel>
                      <Card className="border-dashed border-2 border-muted-foreground/25">
                        <CardContent className="p-6">
                          {field.value ? (
                            <div className="flex items-center gap-4">
                              <FileText className="h-8 w-8 text-muted-foreground" />
                              <div className="flex-1">
                                <p className="text-sm font-medium">
                                  {field.value.name || field.value}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Clique para alterar
                                </p>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => handleClearDoc(field)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <div className="text-center">
                              <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                              <div className="mt-4">
                                <Button
                                  type="button"
                                  variant="ghost"
                                  onClick={() => pdfInputRef.current?.click()}
                                >
                                  <Upload className="mr-2 h-4 w-4" />
                                  Carregar arquivo
                                </Button>
                              </div>
                              <p className="text-xs text-muted-foreground mt-2">
                                PDF até 50MB
                              </p>
                            </div>
                          )}
                          <input
                            ref={pdfInputRef}
                            type="file"
                            accept=".pdf"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];

                              if (file) field.onChange(file); // atualiza o field
                            }}
                          />
                        </CardContent>
                      </Card>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>
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
