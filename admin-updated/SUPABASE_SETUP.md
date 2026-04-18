# Supabase Setup Guide

## 1. Install the Supabase client

```bash
pnpm add @supabase/supabase-js
```

## 2. Create your Supabase project

Go to https://supabase.com → New Project.

## 3. Add environment variables

Create `.env.local` in the root of the admin project:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Find all three values in: Supabase dashboard → Project Settings → API.

> ⚠️ SUPABASE_SERVICE_ROLE_KEY must never be exposed to the browser.
> It is only used in Server Actions ("use server") and is never sent to the client.

## 4. Run the SQL migration

Go to Supabase dashboard → SQL Editor → paste the SQL block from the bottom of:
src/lib/supabase/types.ts

This creates the products, users, and orders tables plus the product-images Storage bucket.

## 5. File structure added

src/
  lib/
    supabase/
      client.ts     ← createClient (browser + admin instances)
      types.ts      ← DB types + SQL migration comment
    actions/
      products.ts   ← getProducts, createProduct, updateProduct, deleteProduct, uploadProductImage
      users.ts      ← getUsers, createUser, updateUser, deleteUser
      orders.ts     ← getOrders, createOrder, updateOrderStatus, deleteOrder, getDashboardStats

## 6. What changed in each file

app/page.tsx               → live stat cards (products, users, orders, revenue)
app/products/page.tsx      → fetches from Supabase products table
app/users/page.tsx         → fetches from Supabase users table
app/payments/page.tsx      → fetches from orders table with joined user data
app/products/columns.tsx   → uses Product type, delete action, shows category + clothing_category
app/users/columns.tsx      → uses User type (snake_case), shows city, handles missing avatar
app/payments/columns.tsx   → uses Order type, delete + status-change actions, shows date
components/AddProduct.tsx  → uploads images to Storage, inserts product into DB
components/AddUser.tsx     → inserts into users table
components/AddOrder.tsx    → inserts into orders table
components/AddCategory.tsx → updated with audience selector (women/men/children)
components/AppSidebar.tsx  → fixed Sheet/asChild nesting, fixed payments link
components/CardList.tsx    → accepts live data props, handles empty states

## 7. Connecting the storefront

In your storefront lib/products.ts, replace the hardcoded array with:

  import { createClient } from "@supabase/supabase-js";

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  export async function getProducts() {
    const { data, error } = await supabase
      .from("products").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  }

  export async function getProductsByCategory(category: string) {
    const { data, error } = await supabase
      .from("products").select("*").eq("category", category);
    if (error) throw error;
    return data;
  }

Both projects share the same Supabase project — admin writes, storefront reads.
