"use client";
import { Send, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useCarts } from "@/lib/queries/useCart";
import {
  parseISO,
  format,
  formatDistanceToNow,
  differenceInHours,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { useSendEmail } from "@/lib/queries/useSendEmail";

const ListCarts = () => {
  const { data } = useCarts();
  console.log(data?.carts);

  const STATUS_CLASSES: Record<
    string,
    { color: string; text: string; title: string; bg: string }
  > = {
    EXPIRED: {
      color: "text-red-600 ",
      text: "Carrinhos abandonados",
      title: "EXPIRADO",
      bg: "bg-red-600",
    },
    PENDING: {
      color: "text-black ",
      text: "Carrinhos não finalizados",
      title: "PENDENTE",
      bg: "bg-black",
    },
    CONVERTED: {
      color: "text-blue-600",
      text: "Carrinhos convertidos",
      title: "CONVERTIDO",
      bg: "bg-blue-600",
    },
    FINALIZED: {
      color: "text-green-600 ",
      text: "Carrinhos finalizados",
      title: "FINALIZADO",
      bg: "bg-green-600",
    },
  };
  const calcLastUpdate = (date: string) => {
    const timeAgo = formatDistanceToNow(parseISO(date), {
      addSuffix: true,
      locale: ptBR,
    });

    return timeAgo;
  };
  const handleTypeName = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Badge className="bg-green-800 text-white">Pendente</Badge>;
        break;
      case "ABANDONED":
        return <Badge className="bg-red-800 text-white">Abandonado</Badge>;
        break;
      default:
        return <Badge className="bg-red-800 text-white">Abandonado</Badge>;
    }
  };
  const total = (cartItems: { price: number }[]) => {
    const totalValues = cartItems.reduce(
      (acc: number, currenvalue: { price: number }) => acc + currenvalue.price,
      0
    );
    return formatCurrency(totalValues);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount  / 100);
  };
  return (
    <section className="w-full h-full flex flex-col gap-10">
      <div className="w-full gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
        {data?.sumary?.map(
          (
            metrics: { status: string; totalcount: number; totalvalue: number },
            index: number
          ) => (
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Receita Total
                </CardTitle>
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div
                  className={`text-2xl font-heading font-bold  ${
                    STATUS_CLASSES[metrics.status]?.color
                  }`}
                >
                  {formatCurrency(metrics.totalvalue)}
                </div>
                <p
                  className={`text-xs  font-medium mt-1  ${
                    STATUS_CLASSES[metrics.status]?.color
                  } uppercase`}
                >
                  {STATUS_CLASSES[metrics.status]?.text} {metrics.totalcount}
                </p>
              </CardContent>
            </Card>
          )
        )}
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="font-heading font-bold">
            Carrinhos de Compras
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="border-separate border-spacing-y-4">
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Ultima Atualização</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="space-y-3 p-2 my-4">
              {data?.carts.map(
                (
                  cart: {
                    id: string;
                    user: { name: string };
                    status: string;
                    updatedAt: string;
                    cartItems: { price: number }[];
                  },
                  index: number
                ) => (
                  <TableRow key={cart.id}>
                    <TableCell>{cart.user.name}</TableCell>
                    <TableCell>
                      <p
                        className={`${
                          STATUS_CLASSES[cart.status].bg
                        }  text-white w-[150px] rounded-md text-center py-1 `}
                      >
                        {calcLastUpdate(cart.updatedAt)}
                      </p>
                    </TableCell>

                    <TableCell>{total(cart.cartItems)}</TableCell>
                    <TableCell>
                      <p
                        className={`${
                          STATUS_CLASSES[cart.status].bg
                        }  text-white w-[150px] rounded-md text-center py-1 `}
                      >
                        {STATUS_CLASSES[cart.status].title}
                      </p>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
};

export default ListCarts;

/*

*/
