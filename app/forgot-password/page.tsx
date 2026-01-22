"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowLeft, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            // TODO: Call backend API
            // await authAPI.forgotPassword(email);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setIsSubmitted(true);
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-orange-50 via-white to-amber-50 p-4">
            {/* Background decorations */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl" />

            <Card className="w-full max-w-md relative z-10 shadow-xl border-border">
                <CardHeader className="text-center space-y-4">
                    <Link href="/" className="flex items-center justify-center gap-2 mb-2">
                        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-2xl">⚡</span>
                        </div>
                    </Link>

                    {isSubmitted ? (
                        <>
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                <Mail className="w-8 h-8 text-green-600" />
                            </div>
                            <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
                            <CardDescription className="text-base">
                                We&apos;ve sent a password reset link to{" "}
                                <span className="font-medium text-foreground">{email}</span>
                            </CardDescription>
                        </>
                    ) : (
                        <>
                            <CardTitle className="text-2xl font-bold">Forgot password?</CardTitle>
                            <CardDescription>
                                No worries, we&apos;ll send you reset instructions
                            </CardDescription>
                        </>
                    )}
                </CardHeader>

                <CardContent className="space-y-6">
                    {isSubmitted ? (
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground text-center">
                                Didn&apos;t receive the email? Check your spam folder or try again.
                            </p>
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => setIsSubmitted(false)}
                            >
                                Try another email
                            </Button>
                            <Link href="/login">
                                <Button variant="ghost" className="w-full">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to login
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg text-center">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="rider@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={isLoading}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    "Reset password"
                                )}
                            </Button>

                            <Link href="/login">
                                <Button variant="ghost" className="w-full">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to login
                                </Button>
                            </Link>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
