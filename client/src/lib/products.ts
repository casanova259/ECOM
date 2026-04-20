"use server";

import { supabase } from "@/lib/supabase/client";
import { ProductType, ProductsType, ProductCategory } from "@/types";

// ─── Map Supabase row → client ProductType ────────────────────────────────────
// Supabase uses snake_case, our client types use camelCase
function mapProduct(p: Record<string, any>): ProductType {
  return {
    id: p.id,
    name: p.name,
    category: p.category,
    shortDescription: p.short_description,
    description: p.description,
    price: p.price,
    sizes: p.sizes,
    colors: p.colors,
    images: p.images,
  };
}

// ─── Get all products ─────────────────────────────────────────────────────────
export async function getProducts(): Promise<ProductsType> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data.map(mapProduct);
}

// ─── Get products by category ─────────────────────────────────────────────────
export async function getProductsByCategory(
  category: ProductCategory | string
): Promise<ProductsType> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data.map(mapProduct);
}

// ─── Get single product by ID ─────────────────────────────────────────────────
export async function getProductById(id: string): Promise<ProductType | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return mapProduct(data);
}