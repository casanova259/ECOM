import ProductList from "@/components/ProductList";
import Image from "next/image";
import Link from "next/link";
import BentoSection from "./bento";

const Homepage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) => {
  const category = (await searchParams).category;
  return (
    <div>
      {/* Full-screen hero */}
      <section className="w-full h-screen relative">
        <Image
          src="/yarn.jpg"
          alt="Featured Product"
          fill
          className="object-cover"
          priority
        />
      </section>

      {/* Content below — constrained width */}
      {/* Heading in the white space — upper center */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-6 mt-20">
        <p className="text-sm font-medium tracking-[0.4em] text-black uppercase mb-4">
          Premium Collection
        </p>
        <h1 className="text-8xl md:text-[10rem] lg:text-[9rem] font-black text-gray-800 leading-none tracking-tight">
          Craft with
        </h1>
        <h1 className="text-8xl md:text-[10rem] lg:text-[9rem] font-black text-gray-800 leading-none tracking-tight">
          Color.
        </h1>
        <p className="mt-6 text-gray-500 text-xl md:text-2xl tracking-widest">
          Handpicked yarns for every project
        </p>
        <Link
          href="/products"
          className="mt-10 inline-block bg-gray-800 text-white px-12 py-4 text-sm tracking-[0.3em] hover:bg-gray-700 transition-colors"
        >
          SHOP NOW
        </Link>
      </div>
      <BentoSection />
      <section className="max-w-[1400px] mx-auto px-6">


        <ProductList category={category} params="homepage" />
      </section>
    </div>
  );
};

export default Homepage;