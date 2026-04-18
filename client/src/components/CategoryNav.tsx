"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ProductCategory } from "@/types";

const CATEGORIES: { label: string; value: ProductCategory; available: boolean }[] = [
    { label: "Women", value: "women", available: true },
    { label: "Men", value: "men", available: false },
    { label: "Children", value: "children", available: false },
];

const CategoryNav = () => {
    const searchParams = useSearchParams();
    const active = (searchParams.get("category") as ProductCategory) ?? "women";

    return (
        <nav className="flex items-center gap-1 mb-10 border-b border-gray-200">
            {CATEGORIES.map(({ label, value, available }) => {
                const isActive = active === value;

                if (!available) {
                    return (
                        <span
                            key={value}
                            className="relative px-5 py-3 text-sm font-medium text-gray-300 cursor-not-allowed select-none group"
                        >
                            {label}
                            {/* "Coming soon" tooltip */}
                            <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 rounded bg-gray-800 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                Coming soon
                            </span>
                        </span>
                    );
                }

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
