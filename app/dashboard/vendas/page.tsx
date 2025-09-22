"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SalesChart } from "@/components/sales-chart"
import { SalesNotifications } from "@/components/sales-notifications"
import { TrendingUp, DollarSign, ShoppingCart, Users, Bell } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Sale {
  id: string
  customerName: string
  productName: string
  amount: number
  timestamp: string
  status: "completed" | "pending" | "cancelled"
}

interface SalesData {
  date: string
  sales: number
  revenue: number
}

export default function SalesPage() {
  const { toast } = useToast()
  const [recentSales, setRecentSales] = useState<Sale[]>([
    {
      id: "1",
      customerName: "João Silva",
      productName: "Produto A",
      amount: 299.99,
      timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
      status: "completed",
    },
    {
      id: "2",
      customerName: "Maria Santos",
      productName: "Produto B",
      amount: 149.5,
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
      status: "completed",
    },
    {
      id: "3",
      customerName: "Pedro Costa",
      productName: "Produto C",
      amount: 89.9,
      timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
      status: "pending",
    },
  ])

  const [salesData] = useState<SalesData[]>([
    { date: "2024-01-01", sales: 12, revenue: 2400 },
    { date: "2024-01-02", sales: 19, revenue: 3800 },
    { date: "2024-01-03", sales: 8, revenue: 1600 },
    { date: "2024-01-04", sales: 15, revenue: 3000 },
    { date: "2024-01-05", sales: 22, revenue: 4400 },
    { date: "2024-01-06", sales: 18, revenue: 3600 },
    { date: "2024-01-07", sales: 25, revenue: 5000 },
  ])

  const [isSimulating, setIsSimulating] = useState(false)

  // Simular vendas em tempo real
  useEffect(() => {
    if (!isSimulating) return

    const interval = setInterval(() => {
      const customerNames = ["Ana Lima", "Carlos Oliveira", "Fernanda Rocha", "Roberto Alves", "Juliana Ferreira"]
      const productNames = ["Produto Premium", "Produto Standard", "Produto Básico", "Produto Especial"]

      const newSale: Sale = {
        id: Date.now().toString(),
        customerName: customerNames[Math.floor(Math.random() * customerNames.length)],
        productName: productNames[Math.floor(Math.random() * productNames.length)],
        amount: Math.floor(Math.random() * 500) + 50,
        timestamp: new Date().toISOString(),
        status: "completed",
      }

      setRecentSales((prev) => [newSale, ...prev.slice(0, 9)])

      // Mostrar toast de notificação
      toast({
        title: "Nova Venda!",
        description: `${newSale.customerName} comprou ${newSale.productName} por ${formatCurrency(newSale.amount)}`,
        duration: 3000,
      })
    }, 5000) // Nova venda a cada 5 segundos

    return () => clearInterval(interval)
  }, [isSimulating, toast])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount)
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const totalRevenue = recentSales.reduce((sum, sale) => sum + sale.amount, 0)
  const completedSales = recentSales.filter((sale) => sale.status === "completed").length
  const pendingSales = recentSales.filter((sale) => sale.status === "pending").length

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading font-black text-3xl text-foreground">Painel de Vendas</h1>
            <p className="text-muted-foreground mt-2">Acompanhe suas vendas em tempo real</p>
          </div>
          <Button
            onClick={() => setIsSimulating(!isSimulating)}
            variant={isSimulating ? "destructive" : "default"}
            className="gap-2"
          >
            <Bell className="h-4 w-4" />
            {isSimulating ? "Parar Simulação" : "Simular Vendas"}
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Receita Total</CardTitle>
              <DollarSign className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-heading font-bold text-foreground">{formatCurrency(totalRevenue)}</div>
              <p className="text-xs text-accent font-medium mt-1">+12% em relação ao mês anterior</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Vendas Concluídas</CardTitle>
              <ShoppingCart className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-heading font-bold text-foreground">{completedSales}</div>
              <p className="text-xs text-muted-foreground mt-1">Vendas finalizadas</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Vendas Pendentes</CardTitle>
              <Users className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-heading font-bold text-foreground">{pendingSales}</div>
              <p className="text-xs text-muted-foreground mt-1">Aguardando confirmação</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Crescimento</CardTitle>
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-heading font-bold text-foreground">+23%</div>
              <p className="text-xs text-accent font-medium mt-1">Comparado à semana passada</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sales Chart */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="font-heading font-bold">Vendas por Dia</CardTitle>
            </CardHeader>
            <CardContent>
              <SalesChart data={salesData} />
            </CardContent>
          </Card>

          {/* Recent Sales Notifications */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="font-heading font-bold">Vendas Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <SalesNotifications sales={recentSales} />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
