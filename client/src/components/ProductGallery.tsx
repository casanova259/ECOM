"use client";

import Image from "next/image";
import { useState } from "react";

const ProductGallery = ({ images, selectedColor }: { images: Record<string, string>; selectedColor: string }) => {
    const allImages = Object.values(images);
    const [activeImage, setActiveImage] = useState(images[selectedColor] || allImages[0]);

    return (
        <div className="w-full lg:w-1/2 flex gap-3">
            <div className="flex flex-col gap-2.5 w-20 shrink-0">
                {allImages.map((src, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveImage(src)}
                        className={`relative w-20 h-24 rounded-2xl overflow-hidden bg-[#f0e8df] border-2 transition-all duration-200 shrink-0 ${activeImage === src
                                ? "border-[#2c2420] shadow-md"
                                : "border-transparent hover:border-[#c9917a]"
                            }`}
                    >
                        <Image src={src} alt={`View ${i + 1}`} fill className="object-contain p-2" />
                    </button>
                ))}
            </div>

            <div className="relative flex-1 aspect-[3/4] rounded-3xl overflow-hidden bg-[#f0e8df]">
                <Image
                    key={activeImage}
                    src={activeImage}
                    alt="Product"
                    fill
                    className="object-contain p-8 transition-opacity duration-300"
                    priority
                />
                <span className="absolute top-5 left-5 bg-[#2c2420] text-white text-xs tracking-[0.2em] px-4 py-1.5 rounded-full uppercase">
                    Handmade
                </span>
            </div>
        </div>
    );
};

export default ProductGallery;