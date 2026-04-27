"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { Product } from "@/lib/supabase/types";

// ─── GET ALL ──────────────────────────────────────────────────────────────────
export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as Product[];
}

// ─── GET BY ID ────────────────────────────────────────────────────────────────
export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data as Product;
}

// ─── GET BY CATEGORY ──────────────────────────────────────────────────────────
export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("category", category)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as Product[];
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
  const { error } = await supabaseAdmin
    .from("products")
    .delete()
    .eq("id", id);

  if (error) return { success: false, error: error.message };
  revalidatePath("/products");
  return { success: true };
}