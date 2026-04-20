import Link from "next/link";
import ProductCard from "./ProductCard";
import Filter from "./Filter";
import CategoryNav from "@/components/CategoryNav";
import { getProducts, getProductsByCategory } from "@/lib/products";
import { ProductCategory } from "@/types";

// ─── Constants ────────────────────────────────────────────────────────────────
const AVAILABLE_CATEGORIES: ProductCategory[] = ["women", "men", "children"];

// ─── Component ────────────────────────────────────────────────────────────────
interface ProductListProps {
  category?: string;
  params: "homepage" | "products";
}

const ProductList = async ({ category, params }: ProductListProps) => {
  const activeCategory: ProductCategory =
    category && AVAILABLE_CATEGORIES.includes(category as ProductCategory)
      ? (category as ProductCategory)
      : "women";

  let products;
  try {
    products =
      params === "homepage"
        ? (await getProducts()).slice(0, 3)
        : await getProductsByCategory(activeCategory);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    products = [];
  }

  const categoryLabel =
    activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1);

  return (
    <div className="w-full">
      {params === "products" && <CategoryNav />}
      {params === "products" && <Filter />}

      {/* Section header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs tracking-[0.3em] text-[#b5a090] uppercase mb-1">
            {params === "homepage" ? "Hand-crafted with love" : `${categoryLabel}'s Collection`}
          </p>
          <h2 className="text-2xl font-bold text-[#2c2420]">
            {params === "homepage" ? "Featured Woolens" : `${categoryLabel}'s Woolens`}
          </h2>
        </div>
        <span className="text-sm text-[#b5a090]">{products.length} items</span>
      </div>

      {/* Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <EmptyState category={categoryLabel} />
      )}

      {/* View all — homepage only */}
      {params === "homepage" && (
        <Link
          href="/products?category=women"
          className="flex justify-end mt-8 underline text-sm text-[#b5a090] hover:text-[#2c2420] transition-colors"
        >
          View all woolens →
        </Link>
      )}
    </div>
  );
};

// ─── Empty State ──────────────────────────────────────────────────────────────
const EmptyState = ({ category }: { category: string }) => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <span className="text-5xl mb-4">🧶</span>
    <h3 className="text-lg font-semibold text-[#2c2420] mb-2">
      {category}&apos;s collection coming soon
    </h3>
    <p className="text-sm text-[#b5a090] max-w-xs">
      We&apos;re handcrafting {category.toLowerCase()}&apos;s woolen products. Check back soon!
    </p>
    <Link
      href="/products?category=women"
      className="mt-6 text-sm underline text-[#b5a090] hover:text-[#2c2420] transition-colors"
    >
      Browse Women&apos;s Woolens →
    </Link>
  </div>
);

export default ProductList;