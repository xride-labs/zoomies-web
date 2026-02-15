"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn as betterAuthSignIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2, Shield, Store } from "lucide-react";
import { motion } from "framer-motion";

type LoginTab = "admin" | "manager";

export default function LoginPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<LoginTab>("manager");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const result = await betterAuthSignIn.email({
                email,
                password,
            });

            if (result.error) {
                setError(result.error.message || "Invalid email or password");
            } else {
                router.push(activeTab === "admin" ? "/admin" : "/home");
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        await betterAuthSignIn.social({
            provider: "google",
            callbackURL: activeTab === "admin" ? "/admin" : "/home",
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-canvas relative overflow-hidden p-4">
            {/* Background decorations */}
            <motion.div
                className="absolute top-20 left-10 w-72 h-72 bg-brand-red-light/10 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-20 right-10 w-96 h-96 bg-teal/10 rounded-full blur-3xl"
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 10, repeat: Infinity }}
            />

            <motion.div
                className="w-full max-w-md relative z-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="rounded-3xl bg-surface/80 backdrop-blur-xl border border-[#444444]/50 shadow-atmospheric overflow-hidden">
                    {/* Top gradient bar */}
                    <div className="h-1 bg-linear-to-r from-brand-red-light via-neon-green to-teal" />

                    <div className="p-8">
                        {/* Logo */}
                        <div className="text-center mb-8">
                            <Link href="/" className="inline-flex items-center justify-center gap-2 mb-4">
                                <div className="w-12 h-12 bg-linear-to-br from-brand-red-light to-brand-red rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(200,55,55,0.3)]">
                                    <span className="text-white font-bold text-2xl">⚡</span>
                                </div>
                            </Link>
                            <h1 className="text-2xl font-bold text-white uppercase tracking-wide">
                                Welcome back
                            </h1>
                            <p className="text-text-secondary text-sm mt-2">
                                Sign in to the Zoomies web portal
                            </p>
                        </div>

                        {/* Tab Switcher */}
                        <div className="flex rounded-2xl bg-[#1a1a1a] p-1 gap-1 mb-6">
                            <button
                                type="button"
                                onClick={() => { setActiveTab("manager"); setError(""); }}
                                className={`flex-1 flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${activeTab === "manager"
                                    ? "bg-surface text-white shadow-md"
                                    : "text-text-secondary/60 hover:text-text-secondary"
                                    }`}
                            >
                                <Store className="w-4 h-4" />
                                Manager
                            </button>
                            <button
                                type="button"
                                onClick={() => { setActiveTab("admin"); setError(""); }}
                                className={`flex-1 flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${activeTab === "admin"
                                    ? "bg-linear-to-r from-brand-red-light to-brand-red text-white shadow-md"
                                    : "text-text-secondary/60 hover:text-text-secondary"
                                    }`}
                            >
                                <Shield className="w-4 h-4" />
                                Admin
                            </button>
                        </div>

                        <p className="text-xs text-text-secondary/60 text-center mb-6">
                            {activeTab === "admin"
                                ? "For platform administrators only"
                                : "For club owners & marketplace sellers"}
                        </p>

                        {/* Google Sign In */}
                        <Button
                            variant="outline"
                            className="w-full h-12 rounded-2xl bg-[#1a1a1a] border-[#444444]/50 text-white hover:bg-[#252525] hover:text-white transition-colors"
                            onClick={handleGoogleSignIn}
                            disabled={isLoading}
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continue with Google
                        </Button>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[#444444]/50" />
                            </div>
                            <div className="relative flex justify-center">
                                <span className="bg-surface/80 px-3 text-xs text-text-secondary/50 uppercase tracking-wider">
                                    or continue with email
                                </span>
                            </div>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="bg-brand-red/15 text-brand-red-light text-sm p-3 rounded-2xl text-center border border-brand-red/20">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-text-secondary text-sm">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder={activeTab === "admin" ? "admin@zoomies.com" : "manager@example.com"}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={isLoading}
                                    className="h-12 rounded-2xl bg-[#1a1a1a] border-[#444444]/50 text-white placeholder:text-text-secondary/40 focus:border-teal/60 focus:ring-teal/30"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-text-secondary text-sm">Password</Label>
                                    <Link
                                        href="/forgot-password"
                                        className="text-sm text-teal hover:text-teal/80 transition-colors"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={isLoading}
                                        className="h-12 rounded-2xl bg-[#1a1a1a] border-[#444444]/50 text-white placeholder:text-text-secondary/40 focus:border-teal/60 focus:ring-teal/30 pr-10"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary/50 hover:text-white transition-colors"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className={`w-full h-12 rounded-2xl font-bold uppercase tracking-wide text-sm ${activeTab === "admin"
                                        ? "bg-linear-to-r from-brand-red-light to-brand-red hover:shadow-[0_10px_30px_rgba(200,55,55,0.3)]"
                                        : "bg-linear-to-r from-brand-red-light to-brand-red hover:shadow-[0_10px_30px_rgba(200,55,55,0.3)]"
                                    } text-white transition-shadow`}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    `Sign In${activeTab === "admin" ? " as Admin" : ""}`
                                )}
                            </Button>
                        </form>

                        {activeTab === "manager" && (
                            <p className="text-center text-sm text-text-secondary/60 mt-6">
                                Want to sell or manage a club?{" "}
                                <Link href="/signup" className="text-teal font-medium hover:text-teal/80 transition-colors">
                                    Sign up
                                </Link>
                            </p>
                        )}

                        <p className="text-center text-xs text-text-secondary/40 mt-4">
                            Riders? Download the{" "}
                            <span className="font-medium text-neon-green">Zoomies mobile app</span>{" "}
                            instead.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
