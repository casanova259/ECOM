"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/client";
import { Order } from "@/lib/supabase/types";

export async function getOrders(): Promise<Order[]> {
  const { data, error } = await supabaseAdmin
    .from("orders")
    .select("*, users(full_name, email)")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as Order[];
}

export async function createOrder(
  payload: Omit<Order, "id" | "created_at" | "users">
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabaseAdmin.from("orders").insert(payload);
  if (error) return { success: false, error: error.message };
  revalidatePath("/payments");
  return { success: true };
}

export async function updateOrderStatus(
  id: string,
  status: Order["status"]
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabaseAdmin
    .from("orders")
    .update({ status })
    .eq("id", id);

  if (error) return { success: false, error: error.message };
  revalidatePath("/payments");
  return { success: true };
}

export async function deleteOrder(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabaseAdmin.from("orders").delete().eq("id", id);
  if (error) return { success: false, error: error.message };
  revalidatePath("/payments");
  return { success: true };
}

// ─── Dashboard stats ──────────────────────────────────────────────────────────
export async function getDashboardStats() {
  const [products, users, orders] = await Promise.all([
    supabaseAdmin.from("products").select("id", { count: "exact" }),
    supabaseAdmin.from("users").select("id", { count: "exact" }),
    supabaseAdmin.from("orders").select("amount, status, created_at"),
  ]);

  const totalRevenue = (orders.data ?? [])
    .filter((o) => o.status === "success")
    .reduce((sum, o) => sum + o.amount, 0);

  return {
    totalProducts: products.count ?? 0,
    totalUsers: users.count ?? 0,
    totalOrders: orders.data?.length ?? 0,
    totalRevenue,
  };
}
