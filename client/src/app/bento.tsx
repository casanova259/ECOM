// components/BentoGrid.tsx
"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Sparkles } from "lucide-react";

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    }),
};

const BentoGrid = () => {
    return (
        <section className="w-full bg-[#faf7f2] px-4 sm:px-8 py-20">
            {/* Section Header */}
            <div className="max-w-[1400px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
                >
                    <div>
                        <p className="text-xs tracking-[0.4em] text-[#b5a090] uppercase mb-3">
                            Crafted with love
                        </p>
                        <h2
                            className="text-5xl md:text-6xl font-black text-[#2c2420] leading-tight"
                            style={{ fontFamily: "var(--font-playfair)" }}
                        >
                            Our World
                            <br />
                            of Wool.
                        </h2>
                    </div>
                    <p className="max-w-xs text-sm text-[#2c2420 ] leading-relaxed">
                        Every stitch tells a story. Handcrafted pieces made by artisans who
                        pour their heart into every creation.
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 auto-rows-[280px] gap-4">

                    {/* 1. Large Featured Card — Sweaters (col-span-2, row-span-2) */}
                    <motion.div
                        custom={0}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="sm:col-span-2 xl:col-span-2 xl:row-span-2 relative rounded-3xl overflow-hidden bg-[#e8ddd4] group cursor-pointer"
                    >
                        <Link href="/products?category=sweaters" className="block w-full h-full">
                            {/* Background image */}
                            <div className="absolute inset-0">
                                <Image
                                    src="/bento-first.jpg"
                                    alt="Handmade Sweaters"
                                    fill
                                    className="object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                                {/* <div className="absolute inset-0 bg-gradient-to-t from-[#2c2420]/80 via-[#2c2420]/20 to-transparent" /> */}
                            </div>
                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                <span className="inline-block bg-white/20 backdrop-blur-sm text-#2c2420 text-xs tracking-[0.3em] px-3 py-1 rounded-full mb-4 uppercase">
                                    Featured
                                </span>
                                <h3
                                    className="text-4xl md:text-5xl font-black text-#2c2420 mb-2 leading-tight"
                                    style={{ fontFamily: "var(--font-playfair)" }}
                                >
                                    Handmade
                                    <br />
                                    Sweaters
                                </h3>
                                <p className="text-#2c2420 text-sm mb-6">
                                    Cozy, durable & timelessly stylish
                                </p>
                                <span className="inline-flex items-center gap-2 bg-white text-[#2c2420] text-xs font-semibold px-5 py-2.5 rounded-full group-hover:bg-[#f0e8e0] transition-colors duration-300">
                                    Shop Now <ArrowRight className="w-3.5 h-3.5" />
                                </span>
                            </div>
                        </Link>
                    </motion.div>

                    {/* 2. Scarves Card */}
                    <motion.div
                        custom={1}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="relative rounded-3xl overflow-hidden bg-[#f0e8df] group cursor-pointer"
                    >
                        <Link href="/products?category=scarves" className="block w-full h-full">
                            <div className="absolute inset-0">
                                <Image
                                    src="/bento-second.jpg"
                                    alt="Handmade Scarves"
                                    fill
                                    className="object-cover object-center opacity-60 group-hover:scale-105 transition-transform duration-500"
                                />
                                {/* <div className="absolute inset-0 bg-gradient-to-t from-[#c9a99a]/60 to-transparent" /> */}
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <p className="text-xs tracking-[0.3em] text-[#8a6058] uppercase mb-1">
                                    Soft & Colorful
                                </p>
                                <h3
                                    className="text-2xl font-black text-[#2c2420]"
                                    style={{ fontFamily: "var(--font-playfair)" }}
                                >
                                    Scarves
                                </h3>
                                <p className="text-[#5c4a44] text-xs mt-1">
                                    Winter essentials, reimagined
                                </p>
                            </div>
                            <div className="absolute top-4 right-4 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <ArrowRight className="w-3.5 h-3.5 text-[#2c2420]" />
                            </div>
                        </Link>
                    </motion.div>

                    {/* 3. Keychains Card */}
                    <motion.div
                        custom={2}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="relative rounded-3xl overflow-hidden bg-[#e4ede8] group cursor-pointer"
                    >
                        <Link href="/products?category=keychains" className="block w-full h-full">
                            <div className="absolute inset-0">
                                <Image
                                    src="/bento-3.png"
                                    alt="Handmade Keychains"
                                    fill
                                    className="object-cover object-center opacity-50 group-hover:scale-105 transition-transform duration-500"
                                />
                                {/* <div className="absolute inset-0 bg-gradient-to-t from-[#7a9a84]/50 to-transparent" /> */}
                            </div>
                            <div className="absolute top-5 left-5">
                                <Sparkles className="w-5 h-5 text-[#4a7a58]" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <p className="text-xs tracking-[0.3em] text-[#4a7a58] uppercase mb-1">
                                    Cute & Handmade
                                </p>
                                <h3
                                    className="text-2xl font-black text-[#1e3028]"
                                    style={{ fontFamily: "var(--font-playfair)" }}
                                >
                                    Keychains
                                </h3>
                                <p className="text-[#3a5a44] text-xs mt-1">
                                    Little gifts, big smiles
                                </p>
                            </div>
                            <div className="absolute top-4 right-4 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <ArrowRight className="w-3.5 h-3.5 text-[#1e3028]" />
                            </div>
                        </Link>
                    </motion.div>

                    {/* 4. Eco-Friendly Wide Card (col-span-2) */}
                    <motion.div
                        custom={3}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="sm:col-span-2 xl:col-span-2 relative rounded-3xl overflow-hidden bg-[#2c2420] group cursor-pointer flex items-center"
                    >
                        <Link href="/about" className="block w-full h-full">
                            <div className="absolute inset-0">
                                <Image
                                    src="/bento-1.png"
                                    alt="Eco Friendly Yarn"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="relative z-10 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 w-full">
                                <div className="flex items-start gap-5">
                                    {/* <div className="w-12 h-12 rounded-2xl bg-[#4a7a58]/30 flex items-center justify-center shrink-0 mt-1">
                                        <Leaf className="w-6 h-6 text-[#7ab88a]" />
                                    </div> */}
                                    {/* <div>
                                        <p className="text-xs tracking-[0.4em] text-[#7ab88a] uppercase mb-2">
                                            Sustainably Sourced
                                        </p>
                                        <h3
                                            className="text-3xl font-black text-white mb-2"
                                            style={{ fontFamily: "var(--font-playfair)" }}
                                        >
                                            Eco-Friendly Yarn
                                        </h3>
                                        <p className="text-[#a89a94] text-sm max-w-sm leading-relaxed">
                                            Every skein we use is ethically sourced and
                                            environmentally conscious — because beautiful things
                                            shouldn't cost the earth.
                                        </p>
                                    </div> */}
                                </div>
                                <span className="inline-flex items-center gap-2 border border-white/20 text-white text-xs font-medium px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors duration-300 whitespace-nowrap shrink-0">
                                    Our Story <ArrowRight className="w-3.5 h-3.5" />
                                </span>
                            </div>
                        </Link>
                    </motion.div>

                    {/* 5. CTA Card */}
                    <motion.div
                        custom={4}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="relative rounded-3xl overflow-hidden bg-[#c9917a] group cursor-pointer flex flex-col items-center justify-center text-center p-8"
                    >
                        <Link href="/products" className="block w-full h-full absolute inset-0 z-10" />
                        {/* Decorative rings */}
                        <div className="absolute w-48 h-48 rounded-full border border-white/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute w-32 h-32 rounded-full border border-white/15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-700" />
                        <div className="relative z-0">
                            <p className="text-xs tracking-[0.4em] text-white/60 uppercase mb-3">
                                Ready to explore?
                            </p>
                            <h3
                                className="text-3xl font-black text-white mb-6 leading-tight"
                                style={{ fontFamily: "var(--font-playfair)" }}
                            >
                                Explore
                                <br />
                                Collection
                            </h3>
                            <span className="inline-flex items-center gap-2 bg-white text-[#2c2420] text-xs font-bold px-6 py-3 rounded-full group-hover:bg-[#f5ede8] transition-colors duration-300">
                                Shop Now <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default BentoGrid;