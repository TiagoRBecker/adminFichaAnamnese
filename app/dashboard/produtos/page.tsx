"use client";

import { useEffect, useState } from "react";
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
import { Plus, Edit, Package } from "lucide-react";
import { ProductForm } from "@/components/products/product-form";
import { useDocumentsHook } from "@/lib/queries/useDocuments";
import { Products } from "@/lib/types/products";
import { Input } from "@/components/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategoriesHook } from "@/lib/queries/useCategories";

export default function ProductsPage() {
  const { docQuery } = useDocumentsHook();
  const { categoryQuery } = useCategoriesHook();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [filterName, setFilterName] = useState("");
  const [selectName, setFilterSelectnName] = useState("");
  const [data, setData] = useState<[] | null>(null);

  const openEditDialog = (product: any) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleCloseModal = () => {
    setIsDialogOpen(false);
  };

  const openAddDialog = () => {
    setEditingProduct(null);
    setIsDialogOpen(true);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price / 100);
  };
  useEffect(() => {
    if (docQuery.data) {
      const filtered = docQuery.data.filter(
        (doc: { name: string; categories: { id: string; name: string }[] }) => {
          const matchesName = filterName
            ? doc.name.toLowerCase().includes(filterName.toLowerCase())
            : true;

          const matchesCategory =
            selectName === "all" || !selectName
              ? true
              : doc.categories.some(
                  (cat) => cat.name.toLowerCase() === selectName.toLowerCase()
                );

          return matchesName && matchesCategory;
        }
      );

      setData(filtered);
    }
  }, [filterName, selectName, docQuery.data]);

  return (
    <DashboardLayout>
      <div className="w-full flex flex-col gap-10 ">
        <div className="w-full flex items-center justify-between">
          <div>
            <h1 className="font-heading font-black text-3xl text-foreground">
              Produtos
            </h1>
            <p className="text-muted-foreground mt-2">
              Gerencie seu catálogo de produtos
            </p>
          </div>
          <div className="z-10 relative">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={openAddDialog} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Novo Produto
                </Button>
              </DialogTrigger>

              <DialogContent
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
      !max-w-6xl z-[50]"
              >
                <DialogHeader>
                  <DialogTitle>
                    {editingProduct ? "Editar Produto" : "Novo Produto"}
                  </DialogTitle>
                </DialogHeader>
                <ProductForm
                  product={editingProduct}
                  handleCloseModal={handleCloseModal}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Card */}
        <Card className="shadow-sm  ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Produtos
            </CardTitle>
            <Package className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-heading font-bold text-foreground">
              {docQuery?.data?.length} Total de Documentos
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm grid grid-cols-2 justify-center items-center px-2">
          <Input
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            placeholder="Filtrar por nome "
            type="text"
            className="w-1/2"
          />
          <Select onValueChange={(value) => setFilterSelectnName(value)}>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Selecione a categoria " />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categorias</SelectLabel>
                <SelectItem value="all">Todas as categorias</SelectItem>
                {categoryQuery.data?.map(
                  (cats: { id: string; name: string }, index: number) => (
                    <SelectItem key={index} value={cats.name}>
                      {cats.name}
                    </SelectItem>
                  )
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Card>
        {docQuery.isLoading ? (
          <p>Carregando </p>
        ) : (
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="font-heading font-bold">
                Lista de Produtos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Imagem</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Destacado</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Categorias</TableHead>

                    <TableHead>Views</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data &&
                    data.length > 0 &&
                    data.map((product: Products, index: number) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <img
                            src={
                              product?.images?.length > 0
                                ? product?.images[0]
                                : "/caution.svg"
                            }
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {product.name}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              product.highlight
                                ? "bg-green-500 text-white"
                                : "bg-red-500 text-white"
                            }
                          >
                            {product.highlight === true ? "Sim" : "Não"}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant={
                              product.status === "AVAILABLE"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {product.status === "AVAILABLE"
                              ? "Finalizado"
                              : "Sobe encomenda"}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          {formatPrice(product.price)}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {product.categories?.map(
                              (
                                category: { id: string; name: string },
                                index: number
                              ) => (
                                <Badge key={index} variant="secondary">
                                  {category.name}
                                </Badge>
                              )
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {product.views}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEditDialog(product)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
