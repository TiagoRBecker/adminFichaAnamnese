"use client"

import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, CheckCircle, AlertCircle } from "lucide-react"

interface Sale {
  id: string
  customerName: string
  productName: string
  amount: number
  timestamp: string
  status: "completed" | "pending" | "cancelled"
}

interface SalesNotificationsProps {
  sales: Sale[]
}

export function SalesNotifications({ sales }: SalesNotificationsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount)
  }

  const formatTime = (timestamp: string) => {
    const now = new Date()
    const saleTime = new Date(timestamp)
    const diffInMinutes = Math.floor((now.getTime() - saleTime.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Agora mesmo"
    if (diffInMinutes < 60) return `${diffInMinutes}m atrás`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h atrás`

    return saleTime.toLocaleDateString("pt-BR")
  }

  const getStatusIcon = (status: Sale["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "cancelled":
        return <AlertCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusBadge = (status: Sale["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="default" className="text-xs">
            Concluída
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary" className="text-xs">
            Pendente
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="destructive" className="text-xs">
            Cancelada
          </Badge>
        )
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <ScrollArea className="h-80">
      <div className="space-y-4">
        {sales.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground mt-2">Nenhuma venda recente</p>
          </div>
        ) : (
          sales.map((sale) => (
            <div
              key={sale.id}
              className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <Avatar className="h-10 w-10">
                <AvatarFallback className="text-xs font-medium">{getInitials(sale.customerName)}</AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium truncate">{sale.customerName}</p>
                  {getStatusIcon(sale.status)}
                </div>
                <p className="text-xs text-muted-foreground truncate">{sale.productName}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-bold text-foreground">{formatCurrency(sale.amount)}</span>
                  {getStatusBadge(sale.status)}
                </div>
              </div>

              <div className="text-right">
                <p className="text-xs text-muted-foreground">{formatTime(sale.timestamp)}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </ScrollArea>
  )
}
