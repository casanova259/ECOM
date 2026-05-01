"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const SignInPage = () => {
    const router = useRouter();

    const [mode, setMode] = useState<"signin" | "signup">("signin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccessMsg("");
        setLoading(true);

        try {
            if (mode === "signup") {
                if (password !== confirmPassword) {
                    setError("Passwords do not match.");
                    setLoading(false);
                    return;
                }

                const { error } = await supabase.auth.signUp({ email, password });
                if (error) throw error;
                setSuccessMsg("Check your email for a confirmation link!");
            } else {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                router.push("/");
                router.refresh();
            }
        } catch (err: any) {
            setError(err.message ?? "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#faf7f2] flex">

            {/* Left panel — decorative */}
            <div className="hidden lg:flex lg:w-1/2 bg-[#2c2420] flex-col items-center justify-center relative overflow-hidden px-12">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#3d3230_0%,_#2c2420_70%)]" />
                <div className="absolute top-12 left-12 w-32 h-32 rounded-full border border-[#b5a090]/20" />
                <div className="absolute top-16 left-16 w-20 h-20 rounded-full border border-[#b5a090]/10" />
                <div className="absolute bottom-16 right-16 w-48 h-48 rounded-full border border-[#c9917a]/15" />
                <div className="absolute bottom-24 right-24 w-24 h-24 rounded-full border border-[#c9917a]/10" />

                <div className="relative z-10 text-center max-w-sm">
                    <p className="text-xs tracking-[0.5em] text-[#b5a090] uppercase mb-6">RASHI KNITWEAR</p>
                    <h2
                        className="text-4xl font-black text-white leading-tight mb-6"
                        style={{ fontFamily: "var(--font-playfair)" }}
                    >
                        Handcrafted with love, delivered to you.
                    </h2>
                    <p className="text-sm text-[#b5a090] leading-relaxed">
                        Join our community of wool lovers and discover handmade sweaters, scarves, cardigans, and more — crafted one stitch at a time.
                    </p>
                    <div className="flex justify-center gap-6 mt-10">
                        {["🧶 Handmade", "🌿 Eco", "🔒 Secure"].map((badge) => (
                            <span key={badge} className="text-xs text-[#b5a090]/70">{badge}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right panel — form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16">
                <div className="w-full max-w-md">

                    <p className="text-xs tracking-[0.5em] text-[#b5a090] uppercase mb-2 lg:hidden">RASHI KNITWEAR</p>

                    <h1
                        className="text-4xl font-black text-[#2c2420] mb-2"
                        style={{ fontFamily: "var(--font-playfair)" }}
                    >
                        {mode === "signin" ? "Welcome back." : "Create account."}
                    </h1>
                    <p className="text-sm text-[#b5a090] mb-8">
                        {mode === "signin"
                            ? "Sign in to your RASHI KNITWEAR account."
                            : "Join RASHI KNITWEAR and start shopping handmade woolens."}
                    </p>

                    {/* Mode toggle */}
                    <div className="flex bg-[#f0e8df] rounded-2xl p-1 mb-8">
                        {(["signin", "signup"] as const).map((m) => (
                            <button
                                key={m}
                                onClick={() => { setMode(m); setError(""); setSuccessMsg(""); }}
                                className={`flex-1 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 ${
                                    mode === m
                                        ? "bg-[#2c2420] text-white shadow-sm"
                                        : "text-[#b5a090] hover:text-[#2c2420]"
                                }`}
                            >
                                {m === "signin" ? "Sign In" : "Sign Up"}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Email */}
                        <div>
                            <label className="block text-xs font-semibold text-[#2c2420] mb-1.5 tracking-wide">
                                Email
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 rounded-2xl border border-[#e8ddd4] bg-white text-sm text-[#2c2420] placeholder:text-[#c9b8ad] focus:outline-none focus:ring-2 focus:ring-[#2c2420]/20 focus:border-[#2c2420] transition-all"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-semibold text-[#2c2420] mb-1.5 tracking-wide">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 pr-11 rounded-2xl border border-[#e8ddd4] bg-white text-sm text-[#2c2420] placeholder:text-[#c9b8ad] focus:outline-none focus:ring-2 focus:ring-[#2c2420]/20 focus:border-[#2c2420] transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#b5a090] hover:text-[#2c2420] transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password (signup only) */}
                        {mode === "signup" && (
                            <div>
                                <label className="block text-xs font-semibold text-[#2c2420] mb-1.5 tracking-wide">
                                    Confirm Password
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 rounded-2xl border border-[#e8ddd4] bg-white text-sm text-[#2c2420] placeholder:text-[#c9b8ad] focus:outline-none focus:ring-2 focus:ring-[#2c2420]/20 focus:border-[#2c2420] transition-all"
                                />
                            </div>
                        )}

                        {/* Forgot password */}
                        {mode === "signin" && (
                            <div className="flex justify-end">
                                <Link
                                    href="/forgot-password"
                                    className="text-xs text-[#b5a090] hover:text-[#2c2420] transition-colors underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                        )}

                        {/* Error / Success */}
                        {error && (
                            <div className="bg-[#fdf0ee] border border-[#f5c5be] text-[#c0504a] text-xs rounded-2xl px-4 py-3">
                                {error}
                            </div>
                        )}
                        {successMsg && (
                            <div className="bg-[#edf7f0] border border-[#b6dfc5] text-[#3a7d56] text-xs rounded-2xl px-4 py-3">
                                {successMsg}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#2c2420] hover:bg-[#3d3230] disabled:bg-[#e8ddd4] disabled:text-[#b5a090] disabled:cursor-not-allowed text-white py-3.5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors mt-2"
                        >
                            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                            {loading
                                ? mode === "signin" ? "Signing in..." : "Creating account..."
                                : mode === "signin" ? "Sign In" : "Create Account"}
                        </button>
                    </form>

                    <p className="text-center text-xs text-[#b5a090] mt-8">
                        <Link href="/" className="hover:text-[#2c2420] transition-colors underline">
                            ← Back to store
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;