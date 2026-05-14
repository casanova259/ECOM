import Image from "next/image";
import Link from "next/link";

const values = [
    {
        number: "01",
        title: "Handcrafted with Care",
        description:
            "Every stitch is placed with intention. No two pieces are ever quite alike — and that's exactly the point.",
    },
    {
        number: "02",
        title: "Premium Wool Only",
        description:
            "We use only high-quality wool — soft, warm, and built to last. Because what goes into a sweater matters as much as what comes out.",
    },
    {
        number: "03",
        title: "Made with Love",
        description:
            "This isn't a factory. It's a family. Every piece leaves our hands with genuine care for the person who'll wear it.",
    },
];

export default function AboutPage() {
    return (
        <main className="bg-[#F5F0EA] min-h-screen font-sans">

            {/* ── HERO + INTRO merged ── */}
            <section className="bg-[#2C2420] px-8 md:px-16 py-24 md:py-32">
                <div className="max-w-[1100px] mx-auto grid md:grid-cols-3 gap-12 items-center">

                    {/* LEFT — Headline */}
                    <div>
                        <p className="text-xs tracking-[0.4em] text-[#C9A98A] uppercase mb-4">
                            Handmade in India
                        </p>
                        <h1
                            className="text-6xl md:text-7xl font-black text-white leading-none tracking-tight"
                            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                        >
                            Knit with
                            <br />
                            <em className="italic font-light">love.</em>
                        </h1>
                    </div>

                    {/* CENTER — Logo */}
                    <div className="flex flex-col items-center justify-center gap-4">
                        <Image
                            src="/logo3.png"
                            alt="Rashi Knitwear"
                            width={120}
                            height={120}
                            className="object-contain opacity-90"
                        />
                        <p className="text-xs tracking-[0.5em] text-[#C9A98A] uppercase">
                            Our Story
                        </p>
                    </div>

                    {/* RIGHT — Text */}
                    <div className="flex flex-col gap-4">
                        <h2
                            className="text-2xl font-bold text-white leading-tight"
                            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                        >
                            A small beginning with a{" "}
                            <em className="italic font-light">big heart.</em>
                        </h2>
                        <p className="text-white/60 text-sm leading-relaxed">
                            Rashi Knitwear started the way the best things do — with a passion and a pair of knitting needles. We make handcrafted sweaters, scarves, and more for men, women, and children using premium wool, with care that no machine can replicate.
                        </p>
                        <p className="text-white/60 text-sm leading-relaxed">
                            We are just getting started — but every piece carries the same promise: real craft, real quality, made with love.
                        </p>
                    </div>

                </div>
            </section>

            {/* ── VALUES ── */}
            <section className="bg-[#2C2420] py-24 px-8 md:px-16">
                <div className="max-w-[1100px] mx-auto">
                    <p className="text-xs tracking-[0.4em] text-[#C9A98A] uppercase mb-4">
                        What We Stand For
                    </p>
                    <h2
                        className="text-4xl font-bold text-white leading-tight mb-16 max-w-xl"
                        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                    >
                        Values woven into every piece.
                    </h2>

                    <div className="grid md:grid-cols-3 gap-12">
                        {values.map((v) => (
                            <div key={v.number} className="border-t border-white/20 pt-8">
                                <span className="text-[#C9A98A] text-sm tracking-widest font-mono">
                                    {v.number}
                                </span>
                                <h3 className="text-white text-xl font-semibold mt-4 mb-4">
                                    {v.title}
                                </h3>
                                <p className="text-white/60 text-base leading-relaxed">
                                    {v.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="relative overflow-hidden py-32 px-8 md:px-16 text-center">
                <div className="absolute inset-0">
                    <Image
                        src="/sec.jpg"
                        alt="Knitwear background"
                        fill
                        className="object-cover opacity-30"
                    />
                </div>
                <div className="relative z-10 max-w-2xl mx-auto">
                    <p className="text-xs tracking-[0.4em] text-[#8B6F5E] uppercase mb-6">
                        Ready to Explore?
                    </p>
                    <h2
                        className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight mb-8"
                        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                    >
                        Wear the story.
                    </h2>
                    <p className="text-gray-600 text-lg mb-10">
                        Browse our handcrafted collection of sweaters, scarves, and more — made for men, women, and children with love in every stitch.
                    </p>
                    <Link
                        href="/products"
                        className="inline-block bg-[#2C2420] text-white px-12 py-4 text-sm tracking-[0.3em] uppercase hover:bg-[#8B6F5E] transition-colors duration-300"
                    >
                        Shop Now →
                    </Link>
                </div>
            </section>

        </main>
    );
}