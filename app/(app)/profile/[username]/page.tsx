"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    ChevronLeft,
    MapPin,
    Calendar,
    Settings,
    MoreHorizontal,
    UserPlus,
    UserMinus,
    MessageCircle,
    Flag,
    Share2,
    ShieldCheck,
    Star,
    Route,
    Users,
    Trophy,
    Bike,
    Image as ImageIcon,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

// Mock user data
const mockUser = {
    id: "u1",
    name: "Mike Rodriguez",
    username: "roadking_mike",
    bio: "Full-time rider, part-time mechanic. 15 years on two wheels. Let's ride! 🏍️",
    location: "Phoenix, AZ",
    memberSince: "2023-06-15",
    avatar: null,
    coverImage: null,
    verified: true,
    role: "USER",
    stats: {
        rides: 156,
        distance: 12450,
        followers: 234,
        following: 89,
        clubs: 3,
        reviewsGiven: 23,
        reviewRating: 4.9,
    },
    badges: [
        { id: "b1", name: "Road Warrior", description: "1000+ miles ridden", icon: "🏆" },
        { id: "b2", name: "Club Founder", description: "Started a club", icon: "👑" },
        { id: "b3", name: "Early Adopter", description: "Joined in beta", icon: "⭐" },
    ],
};

const mockBikes = [
    {
        id: "bike1",
        name: "My Panigale",
        make: "Ducati",
        model: "Panigale V4S",
        year: 2021,
        isPrimary: true,
    },
    {
        id: "bike2",
        name: "Adventure Rig",
        make: "BMW",
        model: "R 1250 GS",
        year: 2020,
        isPrimary: false,
    },
];

const mockClubs = [
    { id: "c1", name: "Desert Eagles MC", role: "FOUNDER", memberCount: 128 },
    { id: "c2", name: "Phoenix Riders", role: "MEMBER", memberCount: 67 },
];

const mockRecentRides = [
    { id: "r1", title: "Superstition Mountain Loop", date: "2026-01-25", distance: 85, status: "COMPLETED" },
    { id: "r2", title: "Weekend City Cruise", date: "2026-01-20", distance: 45, status: "COMPLETED" },
    { id: "r3", title: "Desert Night Ride", date: "2026-01-15", distance: 62, status: "COMPLETED" },
];

const mockGallery = [
    { id: "g1", url: null },
    { id: "g2", url: null },
    { id: "g3", url: null },
    { id: "g4", url: null },
    { id: "g5", url: null },
    { id: "g6", url: null },
];

export default function ProfilePage() {
    const params = useParams();
    const router = useRouter();
    const username = params.username as string;
    const isOwnProfile = username === "me" || username === mockUser.username;

    const [isFollowing, setIsFollowing] = useState(false);
    const [isUnfollowDialogOpen, setIsUnfollowDialogOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
        });
    };

    const handleFollow = () => {
        if (isFollowing) {
            setIsUnfollowDialogOpen(true);
        } else {
            setIsFollowing(true);
        }
    };

    const handleUnfollow = () => {
        setIsFollowing(false);
        setIsUnfollowDialogOpen(false);
    };

    return (
        <div className="min-h-screen">
            {/* Cover Image */}
            <div className="relative h-32 md:h-48 bg-gradient-to-br from-primary/20 to-amber-100">
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm"
                    onClick={() => router.back()}
                >
                    <ChevronLeft className="w-5 h-5" />
                </Button>
                <div className="absolute top-4 right-4 flex gap-2">
                    <Button variant="ghost" size="icon" className="bg-background/80 backdrop-blur-sm">
                        <Share2 className="w-5 h-5" />
                    </Button>
                    {isOwnProfile ? (
                        <Link href="/app/profile/settings">
                            <Button variant="ghost" size="icon" className="bg-background/80 backdrop-blur-sm">
                                <Settings className="w-5 h-5" />
                            </Button>
                        </Link>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="bg-background/80 backdrop-blur-sm">
                                    <MoreHorizontal className="w-5 h-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                    <Flag className="w-4 h-4 mr-2" />
                                    Report User
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </div>

            {/* Profile Header */}
            <div className="px-4 lg:px-6 -mt-16 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end gap-4">
                    <Avatar className="w-28 h-28 border-4 border-background">
                        <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
                            {mockUser.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 pb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h1 className="text-2xl font-bold">{mockUser.name}</h1>
                            {mockUser.verified && (
                                <ShieldCheck className="w-5 h-5 text-blue-500" />
                            )}
                        </div>
                        <p className="text-muted-foreground">@{mockUser.username}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground flex-wrap">
                            <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {mockUser.location}
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                Joined {formatDate(mockUser.memberSince)}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {isOwnProfile ? (
                            <Link href="/app/profile/edit">
                                <Button variant="outline">Edit Profile</Button>
                            </Link>
                        ) : (
                            <>
                                <Button variant="outline">
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    Message
                                </Button>
                                <Button
                                    variant={isFollowing ? "outline" : "default"}
                                    onClick={handleFollow}
                                >
                                    {isFollowing ? (
                                        <>
                                            <UserMinus className="w-4 h-4 mr-2" />
                                            Following
                                        </>
                                    ) : (
                                        <>
                                            <UserPlus className="w-4 h-4 mr-2" />
                                            Follow
                                        </>
                                    )}
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                {/* Bio */}
                {mockUser.bio && (
                    <p className="mt-4 text-muted-foreground">{mockUser.bio}</p>
                )}

                {/* Stats */}
                <div className="flex items-center gap-6 mt-4 text-sm">
                    <div className="flex items-center gap-1">
                        <span className="font-semibold">{mockUser.stats.followers}</span>
                        <span className="text-muted-foreground">followers</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="font-semibold">{mockUser.stats.following}</span>
                        <span className="text-muted-foreground">following</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="font-semibold">{mockUser.stats.reviewRating}</span>
                        <span className="text-muted-foreground">({mockUser.stats.reviewsGiven})</span>
                    </div>
                </div>
            </div>

            {/* Tabs Content */}
            <div className="px-4 lg:px-6 mt-6 pb-8">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="w-full md:w-auto">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="bikes">Bikes</TabsTrigger>
                        <TabsTrigger value="rides">Rides</TabsTrigger>
                        <TabsTrigger value="gallery">Gallery</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Stats Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Stats</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center p-4 bg-muted rounded-lg">
                                            <Route className="w-6 h-6 mx-auto text-primary mb-2" />
                                            <p className="text-2xl font-bold">{mockUser.stats.rides}</p>
                                            <p className="text-sm text-muted-foreground">Rides</p>
                                        </div>
                                        <div className="text-center p-4 bg-muted rounded-lg">
                                            <Bike className="w-6 h-6 mx-auto text-primary mb-2" />
                                            <p className="text-2xl font-bold">{mockUser.stats.distance.toLocaleString()}</p>
                                            <p className="text-sm text-muted-foreground">Miles</p>
                                        </div>
                                        <div className="text-center p-4 bg-muted rounded-lg">
                                            <Users className="w-6 h-6 mx-auto text-primary mb-2" />
                                            <p className="text-2xl font-bold">{mockUser.stats.clubs}</p>
                                            <p className="text-sm text-muted-foreground">Clubs</p>
                                        </div>
                                        <div className="text-center p-4 bg-muted rounded-lg">
                                            <Trophy className="w-6 h-6 mx-auto text-primary mb-2" />
                                            <p className="text-2xl font-bold">{mockUser.badges.length}</p>
                                            <p className="text-sm text-muted-foreground">Badges</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Badges Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Badges</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {mockUser.badges.map((badge) => (
                                            <div
                                                key={badge.id}
                                                className="flex items-center gap-3 p-3 bg-muted rounded-lg"
                                            >
                                                <div className="text-2xl">{badge.icon}</div>
                                                <div>
                                                    <p className="font-medium">{badge.name}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {badge.description}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Clubs Card */}
                            <Card className="md:col-span-2">
                                <CardHeader>
                                    <CardTitle>Clubs</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        {mockClubs.map((club) => (
                                            <Link key={club.id} href={`/app/clubs/${club.id}`}>
                                                <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted transition-colors">
                                                    <Avatar>
                                                        <AvatarFallback>
                                                            {club.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1">
                                                        <p className="font-medium">{club.name}</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {club.memberCount} members
                                                        </p>
                                                    </div>
                                                    <Badge variant="outline">{club.role}</Badge>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="bikes" className="mt-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                            {mockBikes.map((bike) => (
                                <Card key={bike.id}>
                                    <CardContent className="p-4">
                                        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                                            <Bike className="w-12 h-12 text-muted-foreground/30" />
                                        </div>
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-semibold">{bike.name}</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {bike.year} {bike.make} {bike.model}
                                                </p>
                                            </div>
                                            {bike.isPrimary && (
                                                <Badge>Primary</Badge>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                            {isOwnProfile && (
                                <Card className="border-dashed">
                                    <CardContent className="p-4 flex items-center justify-center h-full min-h-[200px]">
                                        <Button variant="ghost">
                                            <Bike className="w-4 h-4 mr-2" />
                                            Add a Bike
                                        </Button>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="rides" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Rides</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ScrollArea className="h-[400px]">
                                    <div className="space-y-3">
                                        {mockRecentRides.map((ride) => (
                                            <Link key={ride.id} href={`/app/rides/${ride.id}`}>
                                                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                                    <div className="flex items-center gap-4">
                                                        <div className="p-2 rounded-lg bg-primary/10">
                                                            <Route className="w-5 h-5 text-primary" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium">{ride.title}</p>
                                                            <p className="text-sm text-muted-foreground">
                                                                {formatDate(ride.date)} • {ride.distance} mi
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <Badge variant="secondary">{ride.status}</Badge>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="gallery" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Gallery</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {mockGallery.map((item) => (
                                        <div
                                            key={item.id}
                                            className="aspect-square bg-muted rounded-lg flex items-center justify-center"
                                        >
                                            <ImageIcon className="w-8 h-8 text-muted-foreground/50" />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Unfollow Dialog */}
            <Dialog open={isUnfollowDialogOpen} onOpenChange={setIsUnfollowDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Unfollow {mockUser.name}?</DialogTitle>
                        <DialogDescription>
                            You will no longer see their updates in your feed.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsUnfollowDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleUnfollow}>
                            Unfollow
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
