import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getProducts } from "@/lib/actions/products";

const ProductsPage = async () => {
  const data = await getProducts().catch(() => []);

  return (
    <div>
      <div className="mb-8 px-4 py-2 bg-secondary rounded-md flex items-center justify-between">
        <h1 className="font-semibold">All Products</h1>
        <span className="text-sm text-muted-foreground">{data.length} items</span>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default ProductsPage;
