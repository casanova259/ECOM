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

                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${window.location.origin}/auth/callback`,
                    },
                });

                if (error) throw error;
                setSuccessMsg("Check your email for a confirmation link!");
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

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

    const handleGoogleSignIn = async () => {
        setError("");
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
        if (error) setError(error.message);
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
                    <p className="text-xs tracking-[0.5em] text-[#b5a090] uppercase mb-6">Wooltis</p>
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

                    <p className="text-xs tracking-[0.5em] text-[#b5a090] uppercase mb-2 lg:hidden">Wooltis</p>

                    <h1
                        className="text-4xl font-black text-[#2c2420] mb-2"
                        style={{ fontFamily: "var(--font-playfair)" }}
                    >
                        {mode === "signin" ? "Welcome back." : "Create account."}
                    </h1>
                    <p className="text-sm text-[#b5a090] mb-8">
                        {mode === "signin"
                            ? "Sign in to your Wooltis account."
                            : "Join Wooltis and start shopping handmade woolens."}
                    </p>

                    {/* Mode toggle */}
                    <div className="flex bg-[#f0e8df] rounded-2xl p-1 mb-8">
                        {(["signin", "signup"] as const).map((m) => (
                            <button
                                key={m}
                                onClick={() => { setMode(m); setError(""); setSuccessMsg(""); }}
                                className={`flex-1 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 ${mode === m
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

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-[#e8ddd4]" />
                        <span className="text-xs text-[#b5a090]">or</span>
                        <div className="flex-1 h-px bg-[#e8ddd4]" />
                    </div>

                    {/* Google OAuth */}
                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full border border-[#e8ddd4] bg-white hover:bg-[#faf7f2] text-[#2c2420] py-3.5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-3 transition-colors"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                    </button>

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