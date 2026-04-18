import ProductList from "@/components/ProductList";

// ─── Products Page ────────────────────────────────────────────────────────────
// URL: /products?category=women  (default)
//      /products?category=men    (coming soon — will show empty state)
//      /products?category=children (coming soon — will show empty state)

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) => {
  const { category } = await searchParams;

  return (
    <div className="pt-20 max-w-[1400px] mx-auto px-6">
      <ProductList category={category} params="products" />
    </div>
  );
};

export default ProductsPage;
