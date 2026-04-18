import Image from "next/image";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Product, Order } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";

interface CardListProps {
  title: string;
  products?: Product[];
  orders?: Order[];
}

const CardList = ({ title, products, orders }: CardListProps) => {
  return (
    <div>
      <h1 className="text-lg font-medium mb-6">{title}</h1>
      <div className="flex flex-col gap-2">
        {title === "Popular Products" && products
          ? products.map((product) => {
              const firstColor = product.colors?.[0];
              const imgSrc = firstColor ? product.images?.[firstColor] : "";
              return (
                <Card
                  key={product.id}
                  className="flex-row items-center justify-between gap-4 p-4"
                >
                  <div className="w-12 h-12 rounded-sm relative overflow-hidden bg-muted flex-shrink-0">
                    {imgSrc ? (
                      <Image
                        src={imgSrc}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                        —
                      </div>
                    )}
                  </div>
                  <CardContent className="flex-1 p-0 min-w-0">
                    <CardTitle className="text-sm font-medium truncate">
                      {product.name}
                    </CardTitle>
                    <span className="text-xs text-muted-foreground capitalize">
                      {product.category} · {product.clothing_category}
                    </span>
                  </CardContent>
                  <CardFooter className="p-0 text-sm font-semibold flex-shrink-0">
                    ${product.price.toFixed(2)}
                  </CardFooter>
                </Card>
              );
            })
          : orders?.map((order) => {
              const statusColors = {
                pending: "bg-yellow-500/30",
                processing: "bg-blue-500/30",
                success: "bg-green-500/30",
                failed: "bg-red-500/30",
              };
              return (
                <Card
                  key={order.id}
                  className="flex-row items-center justify-between gap-4 p-4"
                >
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    {(order.users?.full_name ?? "?").slice(0, 2).toUpperCase()}
                  </div>
                  <CardContent className="flex-1 p-0 min-w-0">
                    <CardTitle className="text-sm font-medium truncate">
                      {order.users?.full_name ?? "Unknown customer"}
                    </CardTitle>
                    <span
                      className={cn(
                        "text-xs px-1.5 py-0.5 rounded capitalize",
                        statusColors[order.status]
                      )}
                    >
                      {order.status}
                    </span>
                  </CardContent>
                  <CardFooter className="p-0 text-sm font-semibold flex-shrink-0">
                    ${order.amount.toFixed(2)}
                  </CardFooter>
                </Card>
              );
            })}

        {/* Empty state */}
        {((title === "Popular Products" && !products?.length) ||
          (title === "Latest Transactions" && !orders?.length)) && (
          <p className="text-sm text-muted-foreground text-center py-6">
            No data yet. Add some {title === "Popular Products" ? "products" : "orders"} to get started.
          </p>
        )}
      </div>
    </div>
  );
};

export default CardList;
