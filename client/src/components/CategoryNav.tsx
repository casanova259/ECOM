"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ProductCategory } from "@/types";

const CATEGORIES: { label: string; value: ProductCategory }[] = [
  { label: "Women", value: "women" },
  { label: "Men", value: "men" },
  { label: "Children", value: "children" },
];

const CategoryNav = () => {
  const searchParams = useSearchParams();
  const active = (searchParams.get("category") as ProductCategory) ?? "women";

  return (
    <nav className="flex items-center gap-1 mb-10 border-b border-gray-200">
      {CATEGORIES.map(({ label, value }) => {
        const isActive = active === value;

        return (
          <Link
            key={value}
            href={`/products?category=${value}`}
            className={`
              relative px-5 py-3 text-sm font-medium transition-colors
              ${isActive
                ? "text-gray-900 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gray-900"
                : "text-gray-500 hover:text-gray-800"
              }
            `}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
};

export default CategoryNav;