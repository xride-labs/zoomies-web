"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    MapPin,
    Users,
    Calendar,
    ChevronRight,
    Plus
} from "lucide-react";
import Link from "next/link";

// Mock data
const mockMyClubs = [
    {
        id: "c1",
        name: "Desert Eagles MC",
        description: "Brotherhood of riders exploring the Arizona desert roads.",
        avatar: null,
        location: "Phoenix, AZ",
        membersCount: 128,
        ridesCount: 45,
        role: "member" as const,
        unreadMessages: 5,
    },
    {
        id: "c2",
        name: "Phoenix Riders",
        description: "Casual weekend riders. All skill levels welcome.",
        avatar: null,
        location: "Phoenix, AZ",
        membersCount: 67,
        ridesCount: 23,
        role: "officer" as const,
        unreadMessages: 0,
    },
];

const mockDiscoveredClubs = [
    {
        id: "c3",
        name: "Mountain Road Warriors",
        description: "Chasing twisties in the mountains. Experienced riders only.",
        avatar: null,
        location: "Flagstaff, AZ",
        membersCount: 89,
        ridesCount: 67,
    },
    {
        id: "c4",
        name: "Route 66 Legends",
        description: "Keeping the spirit of Route 66 alive, one ride at a time.",
        avatar: null,
        location: "Kingman, AZ",
        membersCount: 234,
        ridesCount: 112,
    },
    {
        id: "c5",
        name: "Night Riders AZ",
        description: "City lights and cool evening rides through the valley.",
        avatar: null,
        location: "Scottsdale, AZ",
        membersCount: 156,
        ridesCount: 78,
    },
];

export default function ClubsPage() {
    const [activeTab, setActiveTab] = useState<"my" | "discover">("my");

    return (
        <div className="max-w-2xl mx-auto px-4 py-6">
            {/* Tabs */}
            <div className="flex gap-2 mb-6">
                <Button
                    variant={activeTab === "my" ? "default" : "outline"}
                    onClick={() => setActiveTab("my")}
                    className="flex-1 rounded-full"
                >
                    My Clubs
                </Button>
                <Button
                    variant={activeTab === "discover" ? "default" : "outline"}
                    onClick={() => setActiveTab("discover")}
                    className="flex-1 rounded-full"
                >
                    Discover
                </Button>
            </div>

            {activeTab === "my" ? (
                <>
                    {/* My Clubs */}
                    {mockMyClubs.length > 0 ? (
                        <div className="space-y-4">
                            {mockMyClubs.map((club) => (
                                <Link key={club.id} href={`/app/clubs/${club.id}`}>
                                    <Card className="hover:border-primary/50 transition-colors">
                                        <CardContent className="p-4">
                                            <div className="flex items-start gap-4">
                                                <Avatar className="w-16 h-16">
                                                    <AvatarFallback className="bg-secondary text-secondary-foreground text-lg font-bold">
                                                        {club.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h3 className="font-semibold flex items-center gap-2">
                                                                {club.name}
                                                                {club.unreadMessages > 0 && (
                                                                    <Badge className="h-5 min-w-5 flex items-center justify-center">
                                                                        {club.unreadMessages}
                                                                    </Badge>
                                                                )}
                                                            </h3>
                                                            <Badge variant="outline" className="mt-1 text-[10px] capitalize">
                                                                {club.role}
                                                            </Badge>
                                                        </div>
                                                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                                                    </div>
                                                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                                        {club.description}
                                                    </p>
                                                    <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                                                        <span className="flex items-center gap-1">
                                                            <MapPin className="w-3 h-3" />
                                                            {club.location}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Users className="w-3 h-3" />
                                                            {club.membersCount} members
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="w-3 h-3" />
                                                            {club.ridesCount} rides
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <Users className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                            <h3 className="font-semibold mb-2">No clubs yet</h3>
                            <p className="text-muted-foreground mb-4">
                                Discover clubs through rider profiles or create your own!
                            </p>
                            <Button onClick={() => setActiveTab("discover")}>
                                Discover Clubs
                            </Button>
                        </div>
                    )}

                    {/* Create Club CTA */}
                    <Separator className="my-6" />
                    <Card className="bg-linear-to-r from-primary/10 to-amber-100/50 border-primary/20">
                        <CardContent className="p-6 text-center">
                            <h3 className="font-semibold mb-2">Start Your Own Club</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Build your motorcycle community from the ground up.
                            </p>
                            <Link href="/app/clubs/create">
                                <Button className="gap-2">
                                    <Plus className="w-4 h-4" />
                                    Create Club
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </>
            ) : (
                <>
                    {/* Discover Info */}
                    <div className="bg-muted/50 rounded-xl p-4 mb-6">
                        <p className="text-sm text-muted-foreground text-center">
                            💡 <strong>Tip:</strong> The best way to discover clubs is through rider profiles.
                            Click on someone&apos;s club badge to learn more!
                        </p>
                    </div>

                    {/* Discovered Clubs */}
                    <h2 className="font-semibold mb-4">Clubs Near You</h2>
                    <div className="space-y-4">
                        {mockDiscoveredClubs.map((club) => (
                            <Link key={club.id} href={`/app/clubs/${club.id}`}>
                                <Card className="hover:border-primary/50 transition-colors">
                                    <CardContent className="p-4">
                                        <div className="flex items-start gap-4">
                                            <Avatar className="w-14 h-14">
                                                <AvatarFallback className="bg-secondary text-secondary-foreground font-bold">
                                                    {club.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between">
                                                    <h3 className="font-semibold">{club.name}</h3>
                                                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                                                </div>
                                                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                                    {club.description}
                                                </p>
                                                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="w-3 h-3" />
                                                        {club.location}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Users className="w-3 h-3" />
                                                        {club.membersCount}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
