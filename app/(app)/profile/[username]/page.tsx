"use client";

import { useState, useEffect } from "react";
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
    Loader2,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { userAPI } from "@/lib/services";

interface UserProfile {
    id: string;
    name: string;
    username: string;
    bio?: string;
    location?: string;
    memberSince?: string;
    avatar?: string | null;
    image?: string | null;
    coverImage?: string | null;
    verified?: boolean;
    role?: string;
    stats?: {
        rides: number;
        distance: number;
        followers: number;
        following: number;
        clubs: number;
        reviewsGiven: number;
        reviewRating: number;
    };
    badges?: Array<{ id: string; name: string; description: string; icon: string }>;
    bikes?: Array<{
        id: string;
        name: string;
        make: string;
        model: string;
        year: number;
        isPrimary: boolean;
    }>;
    clubs?: Array<{ id: string; name: string; role: string; memberCount: number }>;
    recentRides?: Array<{ id: string; title: string; date: string; distance: number; status: string }>;
    gallery?: Array<{ id: string; url: string | null }>;
}

export default function ProfilePage() {
    const params = useParams();
    const router = useRouter();
    const username = params.username as string;

    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isUnfollowDialogOpen, setIsUnfollowDialogOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");

    const isOwnProfile = username === "me";

    useEffect(() => {
        fetchProfile();
    }, [username]);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const response = username === "me"
                ? await userAPI.getProfile()
                : await userAPI.getPublicProfile(username);
            // Map API response to local UserProfile type
            const userData = response.user;
            setUser({
                id: userData.id,
                name: userData.name || '',
                username: userData.username || '',
                bio: userData.bio,
                location: userData.location,
                avatar: userData.avatar,
            });
        } catch (err) {
            console.error("Failed to fetch profile:", err);
        } finally {
            setLoading(false);
        }
    };

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

    if (loading) {
        return (
            <div className="flex justify-center py-24">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="text-center py-24">
                <p className="text-muted-foreground">User not found</p>
                <Button onClick={() => router.back()} variant="outline" className="mt-4">
                    Go Back
                </Button>
            </div>
        );
    }

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
                            {user.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 pb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h1 className="text-2xl font-bold">{user.name}</h1>
                            {user.verified && (
                                <ShieldCheck className="w-5 h-5 text-blue-500" />
                            )}
                        </div>
                        <p className="text-muted-foreground">@{user.username}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground flex-wrap">
                            {user.location && (
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {user.location}
                                </span>
                            )}
                            {user.memberSince && (
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    Joined {formatDate(user.memberSince)}
                                </span>
                            )}
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
                {user.bio && (
                    <p className="mt-4 text-muted-foreground">{user.bio}</p>
                )}

                {/* Stats */}
                {user.stats && (
                    <div className="flex items-center gap-6 mt-4 text-sm">
                        <div className="flex items-center gap-1">
                            <span className="font-semibold">{user.stats.followers}</span>
                            <span className="text-muted-foreground">followers</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="font-semibold">{user.stats.following}</span>
                            <span className="text-muted-foreground">following</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                            <span className="font-semibold">{user.stats.reviewRating}</span>
                            <span className="text-muted-foreground">({user.stats.reviewsGiven})</span>
                        </div>
                    </div>
                )}
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
                                            <p className="text-2xl font-bold">{user.stats?.rides || 0}</p>
                                            <p className="text-sm text-muted-foreground">Rides</p>
                                        </div>
                                        <div className="text-center p-4 bg-muted rounded-lg">
                                            <Bike className="w-6 h-6 mx-auto text-primary mb-2" />
                                            <p className="text-2xl font-bold">{(user.stats?.distance || 0).toLocaleString()}</p>
                                            <p className="text-sm text-muted-foreground">Miles</p>
                                        </div>
                                        <div className="text-center p-4 bg-muted rounded-lg">
                                            <Users className="w-6 h-6 mx-auto text-primary mb-2" />
                                            <p className="text-2xl font-bold">{user.stats?.clubs || 0}</p>
                                            <p className="text-sm text-muted-foreground">Clubs</p>
                                        </div>
                                        <div className="text-center p-4 bg-muted rounded-lg">
                                            <Trophy className="w-6 h-6 mx-auto text-primary mb-2" />
                                            <p className="text-2xl font-bold">{user.badges?.length || 0}</p>
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
                                        {(user.badges || []).map((badge) => (
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
                                        {(user.clubs || []).map((club) => (
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
                            {(user.bikes || []).map((bike) => (
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
                                        {(user.recentRides || []).map((ride) => (
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
                                    {(user.gallery || []).map((item) => (
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
                        <DialogTitle>Unfollow {user.name}?</DialogTitle>
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
