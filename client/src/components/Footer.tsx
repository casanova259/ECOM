import Image from "next/image";
import Link from "next/link";
import { Instagram, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#2c2420] mt-24">
      <div className="max-w-[1400px] mx-auto px-6 py-16">

        {/* Top row */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-0 justify-between mb-16">

          {/* Brand */}
          <div className="flex flex-col gap-5 max-w-xs">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="Wooltis" width={36} height={36} />
              <span className="text-white font-semibold tracking-[0.15em] text-sm">WOOLTIS</span>
            </Link>
            <p className="text-[#8a7b72] text-sm leading-relaxed">
              Handcrafted woolen goods made with love, for people who appreciate the warmth of something real.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4 text-[#8a7b72]" />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
            {[
              {
                title: "Shop",
                links: ["All Products", "New Arrivals", "Best Sellers", "Sale"],
              },
              {
                title: "Company",
                links: ["About Us", "Our Story", "Blog", "Affiliate Program"],
              },
              {
                title: "Support",
                links: ["Contact", "Shipping Info", "Returns", "Privacy Policy"],
              },
            ].map((col) => (
              <div key={col.title} className="flex flex-col gap-4">
                <p className="text-xs tracking-[0.3em] text-[#c9917a] uppercase font-semibold">
                  {col.title}
                </p>
                {col.links.map((link) => (
                  <Link
                    key={link}
                    href="/"
                    className="text-sm text-[#8a7b72] hover:text-white transition-colors"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/5 mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5a4a44]">
          <p>© 2025 Wooltis. All rights reserved.</p>
          <p>Made with 🧶 by artisans who care.</p>
        </div>
      </div>
    </footer> 
  );
};

export default Footer;  