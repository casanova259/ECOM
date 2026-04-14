import ProductInteraction from "@/components/ProductInteraction";
import { ProductType } from "@/types";
import Image from "next/image";
import Link from "next/link";

// TEMPORARY
const product: ProductType = {
  id: 1,
  name: "Adidas CoreFit T-Shirt",
  shortDescription:
    "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
  description:
    "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
  price: 59.9,
  sizes: ["xs", "s", "m", "l", "xl"],
  colors: ["gray", "purple", "green"],
  images: {
    gray: "/products/1g.png",
    purple: "/products/1p.png",
    green: "/products/1gr.png",
  },
};

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  // TODO:get the product from db
  // TEMPORARY
  return {
    title: product.name,
    describe: product.description,
  };
};

const ProductPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ color: string; size: string }>;
}) => {
  const { size, color } = await searchParams;

  const selectedSize = size || (product.sizes[0] as string);
  const selectedColor = color || (product.colors[0] as string);
  return (
    <div className="min-h-screen bg-[#faf7f2] pt-24 pb-16">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#b5a090] tracking-widest uppercase mb-10">
          <Link href="/" className="hover:text-[#2c2420] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#2c2420] transition-colors">Products</Link>
          <span>/</span>
          <span className="text-[#2c2420]">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">

          {/* IMAGE */}
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-[#f0e8df]">
              <Image
                src={product.images[selectedColor]}
                alt={product.name}
                fill
                className="object-contain p-8 hover:scale-105 transition-transform duration-500"
              />
              {/* Badge */}
              <span className="absolute top-5 left-5 bg-[#2c2420] text-white text-xs tracking-[0.2em] px-4 py-1.5 rounded-full uppercase">
                Handmade
              </span>
            </div>
          </div>

          {/* DETAILS */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6 py-4">

            {/* Name & Price */}
            <div>
              <p className="text-xs tracking-[0.4em] text-[#b5a090] uppercase mb-3">
                Wooltis Collection
              </p>
              <h1
                className="text-4xl md:text-5xl font-black text-[#2c2420] leading-tight mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {product.name}
              </h1>
              <p className="text-[#8a7b72] leading-relaxed text-sm">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-black text-[#2c2420]">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm text-[#b5a090] line-through">
                ${(product.price * 1.2).toFixed(2)}
              </span>
              <span className="bg-[#c9917a]/20 text-[#c9917a] text-xs font-semibold px-2 py-1 rounded-full">
                20% OFF
              </span>
            </div>

            <div className="w-full h-px bg-[#e8ddd4]" />

            {/* Product Interaction (colors, sizes, add to cart) */}
            <ProductInteraction
              product={product}
              selectedSize={selectedSize}
              selectedColor={selectedColor}
            />

            <div className="w-full h-px bg-[#e8ddd4]" />

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: "🧶", label: "100% Handmade" },
                { icon: "🌿", label: "Eco-Friendly" },
                { icon: "📦", label: "Free Shipping" },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="flex flex-col items-center gap-1.5 bg-white rounded-2xl p-3 text-center shadow-sm"
                >
                  <span className="text-xl">{badge.icon}</span>
                  <span className="text-xs text-[#8a7b72] font-medium">{badge.label}</span>
                </div>
              ))}
            </div>

            {/* Payment icons */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs text-[#b5a090]">Secure payments via</span>
              <Image src="/klarna.png" alt="klarna" width={50} height={25} className="rounded-md opacity-70 hover:opacity-100 transition-opacity" />
              <Image src="/cards.png" alt="cards" width={50} height={25} className="rounded-md opacity-70 hover:opacity-100 transition-opacity" />
              <Image src="/stripe.png" alt="stripe" width={50} height={25} className="rounded-md opacity-70 hover:opacity-100 transition-opacity" />
            </div>

            {/* Policy text */}
            <p className="text-[#b5a090] text-xs leading-relaxed">
              By clicking Pay Now, you agree to our{" "}
              <span className="underline hover:text-[#2c2420] cursor-pointer transition-colors">Terms & Conditions</span>{" "}
              and{" "}
              <span className="underline hover:text-[#2c2420] cursor-pointer transition-colors">Privacy Policy</span>.
              All sales are subject to our{" "}
              <span className="underline hover:text-[#2c2420] cursor-pointer transition-colors">Refund Policy</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ProductPage;
