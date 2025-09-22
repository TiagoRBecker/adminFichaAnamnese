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

export default function DashboardPage() {
  const { data: session } = useSession();
  
  const  { getCachedDocs} = useDocumentsHook()
   const { getCachedCategory} = useCategoriesHook()
  const cacheDocs = getCachedDocs()
  const cacheCat = getCachedCategory()
 
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
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
            <p className="font-bold text-black uppercase">
              {session?.user?.name}
            </p>
          </div>
        </div>

        {/* Stats Cards */}
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
                {cacheDocs?.length} total{" "}
              </div>
              <p className="text-xs text-accent font-medium mt-1">
                {cacheDocs?.length} produtos em estoque
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
                {cacheCat?.length}
              </div>
              <p className="text-xs text-muted-foreground mt-1"> {cacheCat?.length} ativas</p>
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
                {cacheDocs?.length}
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

        {/* Quick Overview Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Products */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="font-heading font-bold">
                Produtos Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/*
              <div className="space-y-4">
                {recentProducts.map((product) => (
                  <div key={product.id} className="flex items-center gap-4">
                    <img
                      src={product.cover || "/placeholder.svg"}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{formatCurrency(product.price)}</p>
                    </div>
                    <Badge variant={product.inStock ? "default" : "secondary"}>
                      {product.inStock ? "Em Estoque" : "Fora de Estoque"}
                    </Badge>
                  </div>
                ))}
                {recentProducts.length === 0 && (
                  <p className="text-center text-muted-foreground py-4">Nenhum produto cadastrado</p>
                )}
              </div>
           
            */}
            </CardContent>
          </Card>

          {/* System Status */}
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
                    <span className="text-sm">Produtos Fora de Estoque</span>
                  </div>
                  <Badge>{10}</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Documentos por Categoria</span>
                  </div>
                  <Badge variant="outline">{}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <ListCarts />
      </div>
    </DashboardLayout>
  );
}
