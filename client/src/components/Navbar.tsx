"use client";

import Image from "next/image";
import Link from "next/link";
import { Home, UserCircle, LogOut } from "lucide-react";
import ShoppingCartIcon from "./ShoppingCartIcon";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import type { User } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <nav
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-sm" : "bg-transparent"
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
          <Link href="/" className="text-gray-700 hover:text-gray-900 transition-colors">
            <Home className="w-5 h-5" />
          </Link>
          <ShoppingCartIcon />

          {user ? (
            <>
              <Link
                href="/profile"
                className="text-gray-700 hover:text-gray-900 transition-colors"
                title={user.email}
              >
                <UserCircle className="w-6 h-6" />
              </Link>
              <button
                onClick={handleSignOut}
                className="text-gray-700 hover:text-red-500 transition-colors"
                title="Sign out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Sign in
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;