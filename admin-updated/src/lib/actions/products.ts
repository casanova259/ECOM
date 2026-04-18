"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/client";
import { Product } from "@/lib/supabase/types";

// ─── READ ─────────────────────────────────────────────────────────────────────

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as Product[];
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data as Product;
}

// ─── CREATE ───────────────────────────────────────────────────────────────────

export async function createProduct(
  payload: Omit<Product, "id" | "created_at" | "updated_at">
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabaseAdmin.from("products").insert(payload);
  if (error) return { success: false, error: error.message };
  revalidatePath("/products");
  return { success: true };
}

// ─── UPDATE ───────────────────────────────────────────────────────────────────

export async function updateProduct(
  id: string,
  payload: Partial<Omit<Product, "id" | "created_at">>
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabaseAdmin
    .from("products")
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return { success: false, error: error.message };
  revalidatePath("/products");
  return { success: true };
}

// ─── DELETE ───────────────────────────────────────────────────────────────────

export async function deleteProduct(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabaseAdmin.from("products").delete().eq("id", id);
  if (error) return { success: false, error: error.message };
  revalidatePath("/products");
  return { success: true };
}

// ─── IMAGE UPLOAD ─────────────────────────────────────────────────────────────

export async function uploadProductImage(
  file: File,
  productName: string,
  color: string
): Promise<{ url: string | null; error?: string }> {
  const ext = file.name.split(".").pop();
  const fileName = `${productName.toLowerCase().replace(/\s+/g, "-")}-${color}.${ext}`;
  const filePath = `products/${fileName}`;

  const { error } = await supabaseAdmin.storage
    .from("product-images")
    .upload(filePath, file, { upsert: true });

  if (error) return { url: null, error: error.message };

  const { data } = supabaseAdmin.storage
    .from("product-images")
    .getPublicUrl(filePath);

  return { url: data.publicUrl };
}
