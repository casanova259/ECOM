import Link from "next/link";

const ComingSoon = ({ category }: { category: string }) => (
    <div className="flex flex-col items-center justify-center py-32 text-center">
        <span className="text-6xl mb-6">🧶</span>
        <p className="text-xs tracking-[0.4em] text-[#b5a090] uppercase mb-3">
            Coming Soon
        </p>
        <h3
            className="text-3xl font-black text-[#2c2420] mb-3"
            style={{ fontFamily: "var(--font-playfair)" }}
        >
            {category}&apos;s Collection
        </h3>
        <p className="text-sm text-[#b5a090] max-w-xs leading-relaxed">
            We&apos;re handcrafting our {category.toLowerCase()}&apos;s woolen line with care.
            Sign up to be notified when it drops.
        </p>
        <Link
            href="/products?category=women"
            className="mt-8 text-xs tracking-[0.3em] uppercase underline text-[#b5a090] hover:text-[#2c2420] transition-colors"
        >
            Browse Women&apos;s Woolens →
        </Link>
    </div>
);