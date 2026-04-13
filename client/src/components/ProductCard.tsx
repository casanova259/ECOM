"use client";

import useCartStore from "@/stores/cartStore";
import { ProductType } from "@/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const ProductCard = ({ product }: { product: ProductType }) => {
  const [productTypes, setProductTypes] = useState({
    size: product.sizes[0],
    color: product.colors[0],
  });

  const { addToCart } = useCartStore();

  const handleProductType = ({
    type,
    value,
  }: {
    type: "size" | "color";
    value: string;
  }) => {
    setProductTypes((prev) => ({ ...prev, [type]: value }));
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: 1,
      selectedSize: productTypes.size,
      selectedColor: productTypes.color,
    });
    toast.success("Product added to cart");
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      
      {/* IMAGE */}
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
          <Image
            src={product.images[productTypes.color]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Quick add overlay on hover */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <button
            onClick={(e) => { e.preventDefault(); handleAddToCart(); }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-gray-900 text-xs font-semibold px-6 py-2.5 rounded-full opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 shadow-lg whitespace-nowrap flex items-center gap-2 hover:bg-gray-900 hover:text-white"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Quick Add
          </button>
        </div>
      </Link>

      {/* DETAILS */}
      <div className="p-4 flex flex-col gap-3">
        
        {/* Name & Price */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2">
            {product.name}
          </h3>
          <span className="font-bold text-gray-900 text-sm shrink-0">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <p className="text-xs text-gray-400 line-clamp-1">{product.shortDescription}</p>

        {/* Colors */}
        <div className="flex items-center gap-1.5">
          {product.colors.map((color) => (
            <button
              key={color}
              onClick={() => handleProductType({ type: "color", value: color })}
              className={`rounded-full p-[2px] transition-all duration-200 ${
                productTypes.color === color
                  ? "ring-2 ring-offset-1 ring-gray-400"
                  : "ring-1 ring-gray-200"
              }`}
            >
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: color }}
              />
            </button>
          ))}
        </div>

        {/* Size & Cart */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-gray-100">
          <select
            name="size"
            className="text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-300"
            onChange={(e) => handleProductType({ type: "size", value: e.target.value })}
          >
            {product.sizes.map((size) => (
              <option key={size} value={size}>
                {size.toUpperCase()}
              </option>
            ))}
          </select>

          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 bg-gray-900 text-white text-xs font-medium px-4 py-1.5 rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductCard;