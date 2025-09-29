"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  FolderOpen,
  FileText,
  TrendingUp,
  ShoppingCart,
  AlertTriangle,
} from "lucide-react";
import { useSession } from "next-auth/react";
import ListCarts from "@/components/list-carts";
import { useDocumentsHook } from "@/lib/queries/useDocuments";
import { useCategoriesHook } from "@/lib/queries/useCategories";
import RecentProducts from "@/components/recent-products-list";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  const { docQuery, docQueryLastProducts } = useDocumentsHook();
  const { categoryQuery } = useCategoriesHook();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 my-10">
        <div className="flex items-center w-full justify-between">
          <div>
            <h1 className="font-heading font-black text-3xl text-foreground">
              Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Visão geral do seu sistema administrativo
            </p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-gray-300"> Olá </p>
            <p className="font-bold text-black uppercase truncate">
              {status === "loading" ? "carregando " : session?.user?.name}
            </p>
          </div>
        </div>
        {docQuery.isLoading ||
        docQueryLastProducts.isLoading ||
        categoryQuery.isLoading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <p>Carregando dados aguarde ...</p>
         </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total de Produtos
                  </CardTitle>
                  <Package className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-heading font-bold text-foreground">
                    {docQuery.data?.length} total{" "}
                  </div>
                  <p className="text-xs text-accent font-medium mt-1">
                    produtos em estoque
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Categorias
                  </CardTitle>
                  <FolderOpen className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-heading font-bold text-foreground">
                    {categoryQuery?.data?.length}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1"> ativas</p>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Documentos
                  </CardTitle>
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-heading font-bold text-foreground">
                    {docQuery?.data?.length}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Arquivos disponíveis
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Receita Total
                  </CardTitle>
                  <TrendingUp className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-heading font-bold text-foreground">
                    {formatCurrency(100)}
                  </div>
                  <p className="text-xs text-accent font-medium mt-1">
                    {100} vendas concluídas
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <RecentProducts data={docQueryLastProducts.data} />

              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="font-heading font-bold">
                    Status do Sistema
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShoppingCart className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Vendas Ativas</span>
                      </div>
                      <Badge variant="default">{10}</Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">Vendas Pendentes</span>
                      </div>
                      <Badge variant="secondary">{10}</Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-red-500" />
                        <span className="text-sm">
                          Produtos Fora de Estoque
                        </span>
                      </div>
                      <Badge>{10}</Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">
                          Documentos por Categoria
                        </span>
                      </div>
                      <Badge variant="outline">{}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <ListCarts />
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
