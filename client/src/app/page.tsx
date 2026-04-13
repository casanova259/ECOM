import ProductList from "@/components/ProductList";
import Image from "next/image";

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
      <div className="max-w-[1400px] mx-auto px-6">
        <ProductList category={category} params="homepage" />
      </div>
    </div>
  );
};

export default Homepage;