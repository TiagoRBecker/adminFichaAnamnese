"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash2, FolderOpen } from "lucide-react";
import { CategoryForm } from "@/components/categories/category-form";
import { useCategoriesHook } from "@/lib/queries/useCategories";
import { Category } from "@/lib/types/category";
import { useSwal } from "@/lib/swall";

export default function CategoriesPage() {
  const { isConfirmed } = useSwal();
  const { categoryQuery, deleteCategory } = useCategoriesHook();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [category, setCategory] = useState<Category | null>(null);
  const handleOpenEdit = (category: any) => {
    setCategory(category);
    setIsDialogOpen(true);
  };
  const handleCloseModal = () => {
    setIsDialogOpen(false);
  };
  const openAddDialog = () => {
    setIsDialogOpen(true);
  };
  const handleDeleteCategory = async (id: string) => {
    try {
      const isOk = await isConfirmed(
        "Deseja atualizar  a categoria?",
        "Sua categoria será excludia de toda a plataforma.",
        "question"
      );
      if (isOk) {
        deleteCategory.mutate(id);
        return;
      }
    } catch (error) {}
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading font-black text-3xl text-foreground">
              Categorias
            </h1>
            <p className="text-muted-foreground mt-2">
              Organize seus produtos por categorias
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAddDialog} className="gap-2">
                <Plus className="h-4 w-4" />
                Nova Categoria
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="font-heading font-bold">
                  Nova Categoria
                </DialogTitle>
              </DialogHeader>
              <CategoryForm
                category={category as Category}
                handleCloseModal={handleCloseModal}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Card */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Categorias
            </CardTitle>
            <FolderOpen className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-heading font-bold text-foreground">
              {categoryQuery.data?.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              total produtos categorizados
            </p>
          </CardContent>
        </Card>

        {/* Categories Table */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading font-bold">
              Lista de Categorias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Produtos</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categoryQuery.data?.map(
                  (category: {
                    id: string;
                    name: string;
                    description: string;
                    products: [];
                  }) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-mono text-sm">
                        {category.id}
                      </TableCell>
                      <TableCell className="font-medium">
                        {category.name}
                      </TableCell>
                      <TableCell>{category.products.length}</TableCell>
                      <TableCell>
                        <Badge>Ativa</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              handleOpenEdit(category);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteCategory(category.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
