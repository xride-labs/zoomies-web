"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Settings,
    MapPin,
    Calendar,
    Users,
    Bike,
    Edit,
    Share2,
    Grid3X3,
    BookmarkIcon,
    ShoppingBag
} from "lucide-react";
import Link from "next/link";

// Mock user data
const mockUser = {
    id: "1",
    name: "Test Rider",
    username: "testrider",
    avatar: null,
    bio: "Living life on two wheels 🏍️ Sunset chaser. Mountain roads enthusiast. Always ready for the next adventure.",
    location: "Phoenix, Arizona",
    bikes: [
        { id: "b1", make: "Harley-Davidson", model: "Street Glide", year: 2023, nickname: "Black Thunder" },
        { id: "b2", make: "Honda", model: "CBR600RR", year: 2021, nickname: "Red Rocket" },
    ],
    clubs: [
        { id: "c1", name: "Desert Eagles MC", avatar: null, role: "member" as const },
        { id: "c2", name: "Phoenix Riders", avatar: null, role: "officer" as const },
    ],
    ridesCount: 47,
    followersCount: 234,
    followingCount: 156,
    isVerified: true,
    joinedAt: "2024-06-15",
};

const mockStats = [
    { label: "Rides", value: mockUser.ridesCount },
    { label: "Followers", value: mockUser.followersCount },
    { label: "Following", value: mockUser.followingCount },
];

type TabType = "posts" | "saved" | "listings";

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<TabType>("posts");

    return (
        <div className="max-w-2xl mx-auto">
            {/* Profile Header */}
            <div className="px-4 py-6">
                {/* Avatar and Actions */}
                <div className="flex items-start justify-between mb-4">
                    <Avatar className="w-24 h-24 border-4 border-background shadow-lg">
                        <AvatarFallback className="bg-linear-to-br from-primary to-amber-500 text-white text-2xl font-bold">
                            {mockUser.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-1.5">
                            <Share2 className="w-4 h-4" />
                            Share
                        </Button>
                        <Link href="/app/settings">
                            <Button variant="outline" size="icon" className="h-9 w-9">
                                <Settings className="w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Name and Username */}
                <div className="mb-3">
                    <div className="flex items-center gap-2">
                        <h1 className="text-xl font-bold">{mockUser.name}</h1>
                        {mockUser.isVerified && (
                            <Badge className="bg-blue-500 text-white border-0">Verified</Badge>
                        )}
                    </div>
                    <p className="text-muted-foreground">@{mockUser.username}</p>
                </div>

                {/* Bio */}
                <p className="text-sm mb-4">{mockUser.bio}</p>

                {/* Location and Joined */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {mockUser.location}
                    </span>
                    <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Joined {new Date(mockUser.joinedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </span>
                </div>

                {/* Stats */}
                <div className="flex gap-6 mb-4">
                    {mockStats.map((stat) => (
                        <button key={stat.label} className="text-center">
                            <div className="text-lg font-bold">{stat.value}</div>
                            <div className="text-xs text-muted-foreground">{stat.label}</div>
                        </button>
                    ))}
                </div>

                {/* Edit Profile Button */}
                <Button className="w-full gap-2">
                    <Edit className="w-4 h-4" />
                    Edit Profile
                </Button>
            </div>

            <Separator />

            {/* Clubs */}
            <div className="px-4 py-4">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-semibold flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Clubs
                    </h2>
                    <Link href="/app/clubs" className="text-sm text-primary">See all</Link>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
                    {mockUser.clubs.map((club) => (
                        <Link
                            key={club.id}
                            href={`/app/clubs/${club.id}`}
                            className="shrink-0"
                        >
                            <Card className="w-40 hover:border-primary/50 transition-colors">
                                <CardContent className="p-3 text-center">
                                    <Avatar className="w-12 h-12 mx-auto mb-2">
                                        <AvatarFallback className="bg-secondary text-secondary-foreground text-sm">
                                            {club.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <p className="font-medium text-sm truncate">{club.name}</p>
                                    <Badge variant="outline" className="mt-1 text-[10px] capitalize">
                                        {club.role}
                                    </Badge>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>

            <Separator />

            {/* Bikes */}
            <div className="px-4 py-4">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-semibold flex items-center gap-2">
                        <Bike className="w-4 h-4" />
                        My Bikes
                    </h2>
                    <Button variant="ghost" size="sm" className="text-primary">
                        Add Bike
                    </Button>
                </div>
                <div className="space-y-3">
                    {mockUser.bikes.map((bike) => (
                        <Card key={bike.id}>
                            <CardContent className="p-3 flex items-center gap-4">
                                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                                    <Bike className="w-8 h-8 text-muted-foreground/50" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium">{bike.nickname || `${bike.make} ${bike.model}`}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {bike.year} {bike.make} {bike.model}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            <Separator />

            {/* Content Tabs */}
            <div className="sticky top-16 z-30 bg-background border-b border-border">
                <div className="flex">
                    <button
                        onClick={() => setActiveTab("posts")}
                        className={`flex-1 py-3 flex items-center justify-center gap-2 border-b-2 transition-colors ${activeTab === "posts"
                                ? "border-primary text-primary"
                                : "border-transparent text-muted-foreground"
                            }`}
                    >
                        <Grid3X3 className="w-5 h-5" />
                        <span className="hidden sm:inline">Posts</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("saved")}
                        className={`flex-1 py-3 flex items-center justify-center gap-2 border-b-2 transition-colors ${activeTab === "saved"
                                ? "border-primary text-primary"
                                : "border-transparent text-muted-foreground"
                            }`}
                    >
                        <BookmarkIcon className="w-5 h-5" />
                        <span className="hidden sm:inline">Saved</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("listings")}
                        className={`flex-1 py-3 flex items-center justify-center gap-2 border-b-2 transition-colors ${activeTab === "listings"
                                ? "border-primary text-primary"
                                : "border-transparent text-muted-foreground"
                            }`}
                    >
                        <ShoppingBag className="w-5 h-5" />
                        <span className="hidden sm:inline">Listings</span>
                    </button>
                </div>
            </div>

            {/* Tab Content */}
            <div className="p-4">
                {activeTab === "posts" && (
                    <div className="grid grid-cols-3 gap-1">
                        {[...Array(9)].map((_, i) => (
                            <div
                                key={i}
                                className="aspect-square bg-muted rounded-sm flex items-center justify-center"
                            >
                                <span className="text-muted-foreground/30 text-2xl">🏍️</span>
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === "saved" && (
                    <div className="text-center py-12 text-muted-foreground">
                        <BookmarkIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No saved posts yet</p>
                    </div>
                )}
                {activeTab === "listings" && (
                    <div className="text-center py-12 text-muted-foreground">
                        <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No listings yet</p>
                        <Button className="mt-4" variant="outline">
                            Create Listing
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
