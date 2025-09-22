"use client";
import { Send } from "lucide-react";
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


  return (
    <section className="w-full h-full">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="font-heading font-bold">
            Carrinhos de Compras
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Ultima Atualização</TableHead>
                <TableHead>Status</TableHead>
            
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((cart: any, index: number) => (
                <TableRow key={cart.id}>
                  <TableCell className="font-medium">{cart.name}</TableCell>
                  <TableCell>{calcLastUpdate(cart.updatedAt)}</TableCell>

                  <TableCell>{handleTypeName(cart.status)}</TableCell>

                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
};

export default ListCarts;
