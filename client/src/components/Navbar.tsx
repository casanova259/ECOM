"use client";

import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { Bell, Home } from "lucide-react";
import ShoppingCartIcon from "./ShoppingCartIcon";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-sm  "
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">

        {/* LEFT — Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/logo.png"
            alt="Wooltis"
            width={36}
            height={36}
            className="w-7 h-7 md:w-9 md:h-9"
          />
          <span className="hidden md:block text-sm font-semibold tracking-[0.15em] text-gray-900">
            WOOLTIS
          </span>
        </Link>

        {/* RIGHT — Actions */}
        <div className="flex items-center gap-5">
          <SearchBar />
          <Link href="/" className="text-gray-700 hover:text-gray-900 transition-colors">
            <Home className="w-5 h-5" />
          </Link>
          <button className="text-gray-700 hover:text-gray-900 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <ShoppingCartIcon />
          <Link
            href="/login"
            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            Sign in
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;