"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
    Home,
    Users,
    MapPin,
    ShoppingBag,
    User,
    Plus,
    Bell,
    Search,
    LogOut,
    Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth, hasAnyRole } from "@/lib/use-auth";
import { signOut } from "@/lib/auth-client";
import { useEffect } from "react";

const navigation = [
    { name: "Feed", href: "/home", icon: Home },
    { name: "Clubs", href: "/clubs", icon: Users },
    { name: "Rides", href: "/rides", icon: MapPin },
    { name: "Market", href: "/marketplace", icon: ShoppingBag },
    { name: "Profile", href: "/profile", icon: User },
];

interface AppLayoutProps {
    children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, isPending } = useAuth();

    // Check if user has access to club management portal
    const hasManagerAccess = hasAnyRole(user, "CLUB_OWNER", "SELLER", "ADMIN");
    const isAdmin = hasAnyRole(user, "ADMIN");

    useEffect(() => {
        if (isPending) return;
        if (!user) {
            router.push("/login");
            return;
        }
        // If user doesn't have CLUB_OWNER, SELLER, or ADMIN role, redirect to login
        if (!hasManagerAccess) {
            router.push("/login");
            return;
        }
    }, [user, isPending, router, hasManagerAccess]);

    if (isPending) {
        return (
            <div className="min-h-screen bg-background flex">
                <aside className="hidden lg:flex lg:w-72 lg:flex-col border-r border-border bg-card">
                    <div className="flex h-16 items-center gap-2 px-6 border-b border-border">
                        <Skeleton className="w-10 h-10 rounded-xl" />
                        <Skeleton className="h-6 w-24" />
                    </div>
                    <div className="flex-1 p-4 space-y-2">
                        {[...Array(5)].map((_, i) => (
                            <Skeleton key={i} className="h-12 w-full rounded-2xl" />
                        ))}
                    </div>
                </aside>
                <main className="flex-1 p-6">
                    <Skeleton className="h-10 w-48 mb-6" />
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {[...Array(6)].map((_, i) => (
                            <Skeleton key={i} className="h-40 rounded-xl" />
                        ))}
                    </div>
                </main>
            </div>
        );
    }

    if (!user || !hasManagerAccess) {
        return null;
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:flex lg:w-72 lg:flex-col border-r border-border bg-card">
                {/* Logo */}
                <div className="flex h-16 items-center gap-2 px-6 border-b border-border">
                    <div className="w-10 h-10 bg-linear-to-br from-brand-red-light to-brand-red rounded-2xl flex items-center justify-center shadow-[0_0_15px_rgba(200,55,55,0.3)]">
                        <span className="text-white font-bold text-xl">⚡</span>
                    </div>
                    <span className="text-xl font-bold text-foreground uppercase tracking-wide">Zoomies</span>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-2">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href ||
                            (item.href !== "/app" && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all duration-300",
                                    isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                )}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Quick Actions */}
                <div className="p-4 border-t border-border space-y-2">
                    <Button className="w-full justify-start gap-2" variant="outline">
                        <Plus className="w-4 h-4" />
                        Create Ride
                    </Button>
                    <Button className="w-full justify-start gap-2" variant="outline">
                        <ShoppingBag className="w-4 h-4" />
                        New Listing
                    </Button>
                    {isAdmin && (
                        <Button
                            className="w-full justify-start gap-2"
                            variant="outline"
                            onClick={() => router.push("/admin")}
                        >
                            <Shield className="w-4 h-4" />
                            Admin Portal
                        </Button>
                    )}
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-2 text-destructive hover:text-destructive"
                        onClick={() => signOut().then(() => router.push("/"))}
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </Button>
                </div>

                {/* User Profile */}
                <div className="p-4 border-t border-border">
                    <Link
                        href="/profile"
                        className="flex items-center gap-3 p-2 rounded-2xl hover:bg-muted transition-colors"
                    >
                        <Avatar>
                            <AvatarFallback className="bg-primary text-primary-foreground">
                                {user.name?.charAt(0) || user.email?.charAt(0) || "U"}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{user.name || "User"}</p>
                            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        </div>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:pl-72">
                {/* Top Header - Mobile & Desktop */}
                <header className="sticky top-0 z-40 h-16 bg-background/80 backdrop-blur-md border-b border-border">
                    <div className="flex items-center justify-between h-full px-4 lg:px-6">
                        {/* Mobile Logo */}
                        <Link href="/home" className="flex items-center gap-2 lg:hidden">
                            <div className="w-8 h-8 bg-linear-to-br from-brand-red-light to-brand-red rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-lg">⚡</span>
                            </div>
                            <span className="text-lg font-bold text-foreground">Zoomies</span>
                        </Link>

                        {/* Page Title - Desktop */}
                        <div className="hidden lg:block">
                            <h1 className="text-xl font-semibold">
                                {navigation.find((n) =>
                                    pathname === n.href || (n.href !== "/home" && pathname.startsWith(n.href))
                                )?.name || "Zoomies"}
                            </h1>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="relative">
                                <Search className="w-5 h-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="relative">
                                <Bell className="w-5 h-5" />
                                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]">
                                    3
                                </Badge>
                            </Button>
                            <Avatar className="lg:hidden">
                                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                                    TR
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="pb-20 lg:pb-0">
                    {children}
                </main>
            </div>

            {/* Mobile Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background border-t border-border">
                <div className="flex items-center justify-around h-16">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href ||
                            (item.href !== "/home" && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors",
                                    isActive
                                        ? "text-primary"
                                        : "text-muted-foreground"
                                )}
                            >
                                <item.icon className={cn("w-5 h-5", isActive && "stroke-[2.5px]")} />
                                <span className="text-[10px] font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
}
