
import Image from "next/image";
import Link from "next/link";

const values = [
    {
        number: "01",
        title: "Handcrafted with Care",
        description:
            "Every stitch is placed with intention. Our artisans bring decades of expertise to each piece, ensuring no two sweaters are ever quite alike.",
    },
    {
        number: "02",
        title: "Sustainably Sourced",
        description:
            "We partner with ethical farms across the highlands to source our wool — warm for you, kind to the planet, and fair to every hand in the chain.",
    },
    {
        number: "03",
        title: "Timeless, Not Trendy",
        description:
            "Fashion moves fast. We don't. Our designs are made to be worn for decades, passed down, and loved more with every wash.",
    },
];

const milestones = [
    { year: "2008", event: "Founded in a small studio in Punjab" },
    { year: "2012", event: "First collection launched across 12 cities" },
    { year: "2016", event: "Expanded to handmade dolls & artisan gifts" },
    { year: "2020", event: "Went online — reached customers in 30+ countries" },
    { year: "2024", event: "Over 50,000 pieces crafted and counting" },
];

const team = [
    {
        name: "Rashi Sharma",
        role: "Founder & Head Designer",
        bio: "Rashi learned to knit at age seven from her grandmother. That love for craft became a calling — and eventually, a company.",
        image: "/team-rashi.jpg",
    },
    {
        name: "Priya Mehta",
        role: "Lead Artisan",
        bio: "With 18 years of knitwear experience, Priya oversees every pattern, ensuring quality that stands the test of time.",
        image: "/team-priya.jpg",
    },
    {
        name: "Ankit Verma",
        role: "Sourcing & Sustainability",
        bio: "Ankit travels to farms personally to vet our wool suppliers — because the story of a sweater begins long before the needles.",
        image: "/team-ankit.jpg",
    },
];

export default function AboutPage() {
    return (
        <main className="bg-[#F5F0EA] min-h-screen font-sans">

            {/* ── HERO ── */}
            <section className="relative h-[90vh] overflow-hidden">
                <Image
                    src="/yarn.jpg"
                    alt="Knitting in progress"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Warm gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-[#F5F0EA]" />

                {/* Floating label */}
                <div className="absolute top-10 left-10 border border-white/60 text-white text-xs tracking-[0.35em] px-4 py-2 uppercase">
                    Our Story
                </div>

                {/* Hero text anchored to bottom */}
                <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-12">
                    <p className="text-xs tracking-[0.4em] text-[#8B6F5E] uppercase mb-3">
                        Est. 2008 · Punjab, India
                    </p>
                    <h1
                        className="text-6xl md:text-8xl lg:text-9xl font-black text-gray-800 leading-none tracking-tight"
                        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                    >
                        Knit with
                        <br />
                        <em className="italic font-light">purpose.</em>
                    </h1>
                </div>
            </section>

            {/* ── INTRO ── */}
            <section className="max-w-[1300px] mx-auto px-8 md:px-16 py-24 grid md:grid-cols-2 gap-16 items-center">
                <div>
                    <p className="text-xs tracking-[0.4em] text-[#8B6F5E] uppercase mb-6">
                        Who We Are
                    </p>
                    <h2
                        className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-8"
                        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                    >
                        A family workshop that became a
                        <em className="italic font-light"> beloved brand.</em>
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        Rashi Knitwear began in a modest studio with two knitting needles, a
                        dream, and a deep respect for the craft. What started as handmade
                        gifts for friends grew, stitch by stitch, into a full collection
                        worn by thousands across the globe.
                    </p>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        We make sweaters the way they were always meant to be made — slowly,
                        intentionally, and with genuine love. No fast fashion. No shortcuts.
                        Just beautiful knitwear built to last.
                    </p>
                </div>

                {/* Stacked image collage */}
                <div className="relative h-[500px]">
                    <div className="absolute top-0 right-0 w-[65%] h-[55%] rounded-sm overflow-hidden shadow-lg">
                        <Image
                            src="/yarn.jpg"
                            alt="Yarn collection"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="absolute bottom-0 left-0 w-[58%] h-[55%] rounded-sm overflow-hidden shadow-lg border-4 border-[#F5F0EA]">
                        <Image
                            src="/yarn.jpg"
                            alt="Knitting process"
                            fill
                            className="object-cover"
                        />
                    </div>
                    {/* Decorative accent */}
                    <div className="absolute top-[40%] left-[38%] w-16 h-16 rounded-full bg-[#C9A98A] opacity-40" />
                </div>
            </section>

            {/* ── VALUES ── */}
            <section className="bg-[#2C2420] py-24 px-8 md:px-16">
                <div className="max-w-[1300px] mx-auto">
                    <p className="text-xs tracking-[0.4em] text-[#C9A98A] uppercase mb-4">
                        What We Stand For
                    </p>
                    <h2
                        className="text-4xl md:text-5xl font-bold text-white leading-tight mb-16 max-w-xl"
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

            {/* ── TIMELINE ── */}
            <section className="max-w-[1300px] mx-auto px-8 md:px-16 py-24">
                <p className="text-xs tracking-[0.4em] text-[#8B6F5E] uppercase mb-4">
                    Our Journey
                </p>
                <h2
                    className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-16"
                    style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                    Sixteen years of craft.
                </h2>

                <div className="relative">
                    {/* vertical line */}
                    <div className="absolute left-[90px] top-0 bottom-0 w-px bg-[#D4B896] hidden md:block" />

                    <div className="space-y-10">
                        {milestones.map((m, i) => (
                            <div key={i} className="flex gap-10 items-start">
                                <span
                                    className="text-[#8B6F5E] text-sm font-mono w-[72px] shrink-0 pt-1 text-right"
                                    style={{ letterSpacing: "0.1em" }}
                                >
                                    {m.year}
                                </span>
                                {/* dot */}
                                <div className="relative z-10 w-3 h-3 rounded-full bg-[#C9A98A] shrink-0 mt-1.5 hidden md:block" />
                                <p className="text-gray-700 text-lg leading-relaxed">
                                    {m.event}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TEAM ── */}
            <section className="bg-[#EDE5DB] py-24 px-8 md:px-16">
                <div className="max-w-[1300px] mx-auto">
                    <p className="text-xs tracking-[0.4em] text-[#8B6F5E] uppercase mb-4">
                        The People
                    </p>
                    <h2
                        className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-16"
                        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                    >
                        Hands behind the craft.
                    </h2>

                    <div className="grid md:grid-cols-3 gap-10">
                        {team.map((member) => (
                            <div key={member.name} className="group">
                                <div className="relative h-80 overflow-hidden rounded-sm mb-6 bg-[#C9A98A]/20">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <p className="text-xs tracking-[0.3em] text-[#8B6F5E] uppercase mb-1">
                                    {member.role}
                                </p>
                                <h3
                                    className="text-xl font-semibold text-gray-800 mb-3"
                                    style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                                >
                                    {member.name}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {member.bio}
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
                        src="/yarn.jpg"
                        alt="Knitwear background"
                        fill
                        className="object-cover opacity-20"
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
                        Browse our latest collection of handcrafted sweaters — each one a
                        chapter in an ongoing love letter to knitwear.
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
