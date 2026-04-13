import ProductList from "@/components/ProductList";

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) => {
  const category = (await searchParams).category;
  return (
    <div className="pt-20 max-w-[1400px] mx-auto px-6">
      <ProductList category={category} params="products" />
    </div>
  );
};



export default ProductsPage;
