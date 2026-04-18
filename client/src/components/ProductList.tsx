import Link from "next/link";
import ProductCard from "./ProductCard";
import Filter from "./Filter";
import CategoryNav from "@/components/CategoryNav";
import { getProducts, getProductsByCategory } from "@/lib/products";
import { ProductCategory } from "@/types";

// ─── Constants ────────────────────────────────────────────────────────────────
const AVAILABLE_CATEGORIES: ProductCategory[] = ["women"];
// When men / children products are added, push them into this array ↑

// ─── Component ────────────────────────────────────────────────────────────────
interface ProductListProps {
  /** URL ?category= param. Defaults to "women" when on homepage. */
  category?: string;
  params: "homepage" | "products";
}

const ProductList = async ({ category, params }: ProductListProps) => {
  // Resolve the active category — default to "women" (only live category)
  const activeCategory: ProductCategory =
    category && AVAILABLE_CATEGORIES.includes(category as ProductCategory)
      ? (category as ProductCategory)
      : "women";

  // Data fetch — one-liner swap for Supabase later
  const products =
    params === "homepage"
      ? (await getProducts()).slice(0, 3)           // homepage: show 3 items
      : await getProductsByCategory(activeCategory); // products page: filtered

  const categoryLabel =
    activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1);

  return (
    <div className="w-full">
      {/* Category tab nav — only on full products page */}
      {params === "products" && <CategoryNav />}

      {/* Filters row */}
      {params === "products" && <Filter />}

      {/* Section header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          {params === "homepage" ? "Featured Products" : `${categoryLabel}'s Collection`}
        </h2>
        <span className="text-sm text-gray-400">{products.length} items</span>
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

      {/* View all link — homepage only */}
      {params === "homepage" && (
        <Link
          href="/products?category=women"
          className="flex justify-end mt-8 underline text-sm text-gray-400 hover:text-gray-900 transition-colors"
        >
          View all products →
        </Link>
      )}
    </div>
  );
};

// ─── Empty state (future-proof for when men/children tabs become active) ──────
const EmptyState = ({ category }: { category: string }) => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <span className="text-5xl mb-4">🛍️</span>
    <h3 className="text-lg font-semibold text-gray-700 mb-2">
      {category}&apos;s collection coming soon
    </h3>
    <p className="text-sm text-gray-400 max-w-xs">
      We&apos;re working on adding {category.toLowerCase()}&apos;s products. Check back soon!
    </p>
    <Link
      href="/products?category=women"
      className="mt-6 text-sm underline text-gray-500 hover:text-gray-900 transition-colors"
    >
      Browse Women&apos;s Collection →
    </Link>
  </div>
);

export default ProductList;
