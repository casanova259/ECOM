// ─── Supabase Database Types ──────────────────────────────────────────────────
// These types mirror your Supabase table schemas exactly.
// Run `npx supabase gen types typescript` to auto-generate these once connected.

export type ProductCategory = "women" | "men" | "children";

export type ProductColor =
  | "blue" | "green" | "red" | "yellow" | "purple"
  | "orange" | "pink" | "brown" | "gray" | "black" | "white";

export type ProductSize =
  | "xs" | "s" | "m" | "l" | "xl" | "xxl"
  | "34" | "35" | "36" | "37" | "38" | "39"
  | "40" | "41" | "42" | "43" | "44" | "45";

export type ProductClothingCategory =
  "Sweater" | "Scarf" | "Keychain" | "Doll" | "Cardigan";

// ─── Table: products ──────────────────────────────────────────────────────────
export type Product = {
  id: string;                           // uuid, primary key
  name: string;
  short_description: string;
  description: string;
  price: number;
  category: ProductCategory;            // women | men | children
  clothing_category: ProductClothingCategory;
  sizes: ProductSize[];                 // stored as text[] in Postgres
  colors: ProductColor[];               // stored as text[] in Postgres
  images: Record<ProductColor, string>; // stored as jsonb { color: url }
  created_at: string;
  updated_at: string;
};

// ─── Table: users ─────────────────────────────────────────────────────────────
export type User = {
  id: string;                           // uuid, primary key
  full_name: string;
  email: string;
  phone: string | null;
  address: string | null;
  city: string | null;
  avatar_url: string | null;
  status: "active" | "inactive";
  created_at: string;
};

// ─── Table: orders ────────────────────────────────────────────────────────────
export type Order = {
  id: string;                           // uuid, primary key
  user_id: string;                      // fk → users.id
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  created_at: string;
  // joined fields (from users table via select)
  users?: Pick<User, "full_name" | "email">;
};

// ─── Supabase SQL Migration (run this in Supabase SQL editor) ─────────────────
/*
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Products table
create table products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  short_description text not null,
  description text not null,
  price numeric not null,
  category text not null check (category in ('women','men','children')),
  clothing_category text not null,
  sizes text[] not null default '{}',
  colors text[] not null default '{}',
  images jsonb not null default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Users table
create table users (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  email text not null unique,
  phone text,
  address text,
  city text,
  avatar_url text,
  status text not null default 'active' check (status in ('active','inactive')),
  created_at timestamptz default now()
);

-- Orders table
create table orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete set null,
  amount numeric not null,
  status text not null default 'pending' check (status in ('pending','processing','success','failed')),
  created_at timestamptz default now()
);

-- Enable Row Level Security (RLS) — lock down for admin only
alter table products enable row level security;
alter table users enable row level security;
alter table orders enable row level security;

-- Storage bucket for product images
insert into storage.buckets (id, name, public) values ('product-images', 'product-images', true);
*/
