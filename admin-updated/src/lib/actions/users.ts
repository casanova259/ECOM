"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/client";
import { User } from "@/lib/supabase/types";

export async function getUsers(): Promise<User[]> {
  const { data, error } = await supabaseAdmin
    .from("users")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as User[];
}

export async function getUserById(id: string): Promise<User | null> {
  const { data, error } = await supabaseAdmin
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data as User;
}

export async function createUser(
  payload: Omit<User, "id" | "created_at">
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabaseAdmin.from("users").insert(payload);
  if (error) return { success: false, error: error.message };
  revalidatePath("/users");
  return { success: true };
}

export async function updateUser(
  id: string,
  payload: Partial<Omit<User, "id" | "created_at">>
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabaseAdmin
    .from("users")
    .update(payload)
    .eq("id", id);

  if (error) return { success: false, error: error.message };
  revalidatePath("/users");
  return { success: true };
}

export async function deleteUser(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabaseAdmin.from("users").delete().eq("id", id);
  if (error) return { success: false, error: error.message };
  revalidatePath("/users");
  return { success: true };
}
