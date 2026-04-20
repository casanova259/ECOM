"use server";

import { supabase } from "@/lib/supabase/client";
import { CartItemType, ShippingFormInputs } from "@/types";

export async function createOrder(
  cart: CartItemType[],
  shipping: ShippingFormInputs,
  total: number
): Promise<{ success: boolean; orderId?: string; error?: string }> {
  // 1. Create or find user by email
  const { data: existingUser } = await supabase
    .from("users")
    .select("id")
    .eq("email", shipping.email)
    .single();

  let userId: string;

  if (existingUser) {
    userId = existingUser.id;
    // Update user info in case it changed
    await supabase
      .from("users")
      .update({
        full_name: shipping.name,
        phone: shipping.phone,
        address: shipping.address,
        city: shipping.city,
      })
      .eq("id", userId);
  } else {
    // Create new user
    const { data: newUser, error: userError } = await supabase
      .from("users")
      .insert({
        full_name: shipping.name,
        email: shipping.email,
        phone: shipping.phone,
        address: shipping.address,
        city: shipping.city,
        status: "active",
      })
      .select("id")
      .single();

    if (userError || !newUser) {
      return { success: false, error: userError?.message || "Failed to create user" };
    }
    userId = newUser.id;
  }

  // 2. Create the order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: userId,
      amount: total,
      status: "pending",
    })
    .select("id")
    .single();

  if (orderError || !order) {
    return { success: false, error: orderError?.message || "Failed to create order" };
  }

  return { success: true, orderId: order.id };
}