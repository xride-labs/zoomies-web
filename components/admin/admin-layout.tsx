"use client";

import { useAuth, hasAnyRole } from "@/lib/use-auth";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Users,
    Shield,
    ShoppingBag,
    MapPin,
    Flag,
    Settings,
    LogOut,
    ChevronLeft,
    Bell,
    Search,
    Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const adminNavigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Clubs", href: "/admin/clubs", icon: Shield },
    { name: "Rides", href: "/admin/rides", icon: MapPin },
    { name: "Marketplace", href: "/admin/marketplace", icon: ShoppingBag },
    { name: "Reports", href: "/admin/reports", icon: Flag },
    { name: "Monitoring", href: "/admin/monitoring", icon: Activity },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

interface AdminLayoutProps {
    children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
    const { user, isPending } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    // Get user roles from the user object
    const userRoles: string[] = user?.roles || [];
    const isSuperAdmin = userRoles.includes("ADMIN");

    useEffect(() => {
        if (isPending) return;
        if (!user) {
            router.push("/login");
            return;
        }
        if (!hasAnyRole(user, "ADMIN")) {
            router.push("/home");
            return;
        }
    }, [user, isPending, router]);

    if (isPending) {
        return (
            <div className="min-h-screen bg-background flex">
                <aside className="hidden lg:flex lg:w-64 lg:flex-col border-r border-border bg-card">
                    <div className="flex h-16 items-center gap-2 px-6 border-b border-border">
                        <Skeleton className="w-10 h-10 rounded-xl" />
                        <Skeleton className="h-6 w-24" />
                    </div>
                    <div className="flex-1 p-4 space-y-2">
                        {[...Array(7)].map((_, i) => (
                            <Skeleton key={i} className="h-10 w-full rounded-lg" />
                        ))}
                    </div>
                </aside>
                <main className="flex-1 p-6">
                    <Skeleton className="h-10 w-48 mb-6" />
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {[...Array(4)].map((_, i) => (
                            <Skeleton key={i} className="h-32 rounded-xl" />
                        ))}
                    </div>
                </main>
            </div>
        );
    }

    if (!user || !hasAnyRole(user, "ADMIN")) {
        return null;
    }

    const navigationItems = adminNavigation;

    return (
        <div className="min-h-screen bg-background">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-50 hidden lg:flex w-64 flex-col border-r border-border bg-card">
                {/* Logo */}
                <div className="flex h-16 items-center gap-2 px-6 border-b border-border">
                    <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <span className="text-lg font-bold text-foreground">Zoomies</span>
                        <Badge variant="destructive" className="ml-2 text-[10px]">Admin</Badge>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-1">
                    {navigationItems.map((item) => {
                        const isActive = pathname === item.href ||
                            (item.href !== "/admin" && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-colors text-sm",
                                    isActive
                                        ? "bg-red-600 text-white"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                )}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Back to App */}
                <div className="p-4 border-t border-border space-y-2">
                    <Button
                        variant="outline"
                        className="w-full justify-start gap-2"
                        onClick={() => router.push("/home")}
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back to Manager
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => signOut().then(() => router.push("/"))}
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </Button>
                </div>

                {/* User Profile */}
                <div className="p-4 border-t border-border">
                    <div className="flex items-center gap-3 p-2 rounded-lg">
                        <Avatar>
                            <AvatarFallback className="bg-red-600 text-white">
                                {user.name?.charAt(0) || "A"}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{user.name}</p>
                            <p className="text-xs text-muted-foreground truncate">
                                {isSuperAdmin ? "Super Administrator" : "Administrator"}
                            </p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:pl-64">
                {/* Top Header */}
                <header className="sticky top-0 z-40 h-16 bg-background/80 backdrop-blur-md border-b border-border">
                    <div className="flex items-center justify-between h-full px-6">
                        <div>
                            <h1 className="text-xl font-semibold">
                                {navigationItems.find((n) =>
                                    pathname === n.href || (n.href !== "/admin" && pathname.startsWith(n.href))
                                )?.name || "Admin Dashboard"}
                            </h1>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                                <Search className="w-5 h-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="relative">
                                <Bell className="w-5 h-5" />
                                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-red-600">
                                    5
                                </Badge>
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
