"use server";

import { createClient } from "@supabase/supabase-js";
import { ProductType, ProductsType, ProductCategory } from "@/types";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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

export async function getProducts(): Promise<ProductsType> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data.map(mapProduct);
}

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

export async function getProductById(id: string): Promise<ProductType | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return mapProduct(data);
}