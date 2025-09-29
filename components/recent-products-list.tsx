import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  data: {
    id: string;
    name: string;
    price: number;
    images: string[];
    status: string;
  }[];
};
const RecentProducts = ({ data }: Props) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount / 100);
  };
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="font-heading font-bold">
          Produtos Recentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data?.map((items: any, index: number) => (
            <div key={items.id} className="flex items-center gap-4">
              <img
                src={
                  items?.images?.length > 0 ? items?.images[0] : "/caution.svg"
                }
                alt={items?.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{items?.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatCurrency(items?.price)}
                </p>
              </div>

              <p>
                {items?.status === "AVAILABLE" ? "Finalizado" : "Encomenda"}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentProducts;
