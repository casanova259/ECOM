"use server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function uploadProductImage(
  file: File,
  productName: string,
  color: string
): Promise<{ url: string | null; error?: string }> {
  const ext = file.name.split(".").pop();
  const fileName = `${productName.toLowerCase().replace(/\s+/g, "-")}-${color}-${Date.now()}.${ext}`;
  const filePath = `products/${fileName}`;

  const { error } = await supabase.storage
    .from("product-images")
    .upload(filePath, file, { upsert: true });

  if (error) return { url: null, error: error.message };

  const { data } = supabase.storage
    .from("product-images")
    .getPublicUrl(filePath);

  return { url: data.publicUrl };
}