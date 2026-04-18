import { z } from "zod";

export type ProductType = {
  id: number | string; // number now, string UUID when on Supabase
  name: string;
  category: ProductCategory;
  shortDescription: string;
  description: string;
  price: number;
  sizes: ProductSize[];
  colors: string[];
  images: ProductImages;
};

export type ProductsType = ProductType[];


export type CartItemType = ProductType & {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
};

export type CartItemsType = CartItemType[];

export const shippingFormSchema = z.object({
  name: z.string().min(1, "Name is required!"),
  email: z.email().min(1, "Email is required!"),
  phone: z
    .string()
    .min(7, "Phone number must be between 7 and 10 digits!")
    .max(10, "Phone number must be between 7 and 10 digits!")
    .regex(/^\d+$/, "Phone number must contain only numbers!"),
  address: z.string().min(1, "Address is required!"),
  city: z.string().min(1, "City is required!"),
});

export type ShippingFormInputs = z.infer<typeof shippingFormSchema>;

export const paymentFormSchema = z.object({
  cardHolder: z.string().min(1, "Card holder is required!"),
  cardNumber: z
    .string()
    .min(16, "Card Number is required!")
    .max(16, "Card Number is required!"),
  expirationDate: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      "Expiration date must be in MM/YY format!"
    ),
  cvv: z.string().min(3, "CVV is required!").max(3, "CVV is required!"),
});

export type PaymentFormInputs = z.infer<typeof paymentFormSchema>;

export type CartStoreStateType = {
  cart: CartItemsType;
  hasHydrated: boolean;
};

export type CartStoreActionsType = {
  addToCart: (product: CartItemType) => void;
  removeFromCart: (product: CartItemType) => void;
  clearCart: () => void;
};


// ─── Product Types ────────────────────────────────────────────────────────────
// Extend this as more fields come from Supabase (e.g. stock, tags, discount)

export type ProductCategory = "women" | "men" | "children";

export type ProductSize = string; // "s" | "m" | "l" | "xl" | "xxl" | shoe sizes

export type ProductImages = {
  [color: string]: string; // color name → image path / Supabase Storage URL
};



