"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    MapPin,
    Users,
    Calendar,
    Shield,
    ShieldCheck,
    Settings,
    MessageCircle,
    ChevronLeft,
    Crown,
    UserPlus,
    Share2,
    MoreHorizontal,
    Trophy,
    Star,
    Image as ImageIcon,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock club data - in real app this would come from API
const mockClub = {
    id: "c1",
    name: "Desert Eagles MC",
    description: "Brotherhood of riders exploring the Arizona desert roads. We organize weekly rides, monthly meetups, and annual road trips. All skill levels welcome, but passion for riding is required!",
    location: "Phoenix, AZ",
    establishedAt: "2023-06-15",
    verified: true,
    image: null,
    coverImage: null,
    clubType: "Riding Club",
    isPublic: true,
    memberCount: 128,
    ridesCount: 45,
    trophyCount: 12,
    reputation: 4.8,
    owner: {
        id: "u1",
        name: "Mike Rodriguez",
        username: "roadking_mike",
        avatar: null,
    },
};

const mockMembers = [
    { id: "u1", name: "Mike Rodriguez", username: "roadking_mike", role: "FOUNDER", joinedAt: "2023-06-15", ridesCount: 45 },
    { id: "u2", name: "Sarah Chen", username: "sarah_twowheels", role: "ADMIN", joinedAt: "2023-07-20", ridesCount: 38 },
    { id: "u3", name: "Raj Patel", username: "raj_thunder", role: "OFFICER", joinedAt: "2023-08-10", ridesCount: 32 },
    { id: "u4", name: "Sneha Reddy", username: "sneha_rides", role: "MEMBER", joinedAt: "2023-09-05", ridesCount: 28 },
    { id: "u5", name: "Tom Johnson", username: "tomjmoto", role: "MEMBER", joinedAt: "2024-01-15", ridesCount: 15 },
    { id: "u6", name: "Priya Patel", username: "priya_wheels", role: "MEMBER", joinedAt: "2024-03-20", ridesCount: 8 },
];

const mockRides = [
    { id: "r1", title: "Superstition Mountain Loop", scheduledAt: "2026-02-01T06:00:00Z", participantCount: 12, status: "PLANNED" },
    { id: "r2", title: "Weekend City Cruise", scheduledAt: "2026-01-31T17:00:00Z", participantCount: 8, status: "COMPLETED" },
    { id: "r3", title: "Desert Night Ride", scheduledAt: "2026-01-30T20:00:00Z", participantCount: 15, status: "COMPLETED" },
];

const mockGallery = [
    { id: "g1", url: null },
    { id: "g2", url: null },
    { id: "g3", url: null },
    { id: "g4", url: null },
    { id: "g5", url: null },
    { id: "g6", url: null },
];

const roleColors = {
    FOUNDER: "bg-amber-100 text-amber-700",
    ADMIN: "bg-red-100 text-red-700",
    OFFICER: "bg-blue-100 text-blue-700",
    MEMBER: "bg-gray-100 text-gray-700",
};

export default function ClubDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [isMember, setIsMember] = useState(true);
    const [isPending, setIsPending] = useState(false);
    const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("about");

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const handleJoinRequest = () => {
        setIsPending(true);
        setIsJoinDialogOpen(false);
    };

    const handleLeaveClub = () => {
        setIsMember(false);
    };

    return (
        <div className="min-h-screen">
            {/* Cover Image */}
            <div className="relative h-48 md:h-64 bg-gradient-to-br from-primary/20 to-amber-100">
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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="bg-background/80 backdrop-blur-sm">
                                <MoreHorizontal className="w-5 h-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Report Club</DropdownMenuItem>
                            {isMember && (
                                <DropdownMenuItem className="text-red-600" onClick={handleLeaveClub}>
                                    Leave Club
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Club Info Header */}
            <div className="px-4 lg:px-6 -mt-16 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end gap-4">
                    <Avatar className="w-32 h-32 border-4 border-background">
                        <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
                            {mockClub.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 pb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h1 className="text-2xl md:text-3xl font-bold">{mockClub.name}</h1>
                            {mockClub.verified && (
                                <ShieldCheck className="w-6 h-6 text-blue-500" />
                            )}
                            {!mockClub.isPublic && (
                                <Badge variant="outline">Private</Badge>
                            )}
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground flex-wrap">
                            <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {mockClub.location}
                            </span>
                            <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {mockClub.memberCount} members
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                Est. {formatDate(mockClub.establishedAt)}
                            </span>
                            <span className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                {mockClub.reputation}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {isMember ? (
                            <>
                                <Button variant="outline">
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    Chat
                                </Button>
                                <Button variant="outline">
                                    <Settings className="w-4 h-4" />
                                </Button>
                            </>
                        ) : isPending ? (
                            <Button disabled>
                                Request Pending
                            </Button>
                        ) : (
                            <Button onClick={() => setIsJoinDialogOpen(true)}>
                                <UserPlus className="w-4 h-4 mr-2" />
                                Join Club
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Stats Row */}
            <div className="px-4 lg:px-6 mt-6">
                <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="p-4 text-center">
                            <p className="text-2xl font-bold">{mockClub.memberCount}</p>
                            <p className="text-sm text-muted-foreground">Members</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 text-center">
                            <p className="text-2xl font-bold">{mockClub.ridesCount}</p>
                            <p className="text-sm text-muted-foreground">Rides</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 text-center">
                            <p className="text-2xl font-bold">{mockClub.trophyCount}</p>
                            <p className="text-sm text-muted-foreground">Trophies</p>
                        </CardContent>
                    </Card>
                    <Card className="hidden md:block">
                        <CardContent className="p-4 text-center">
                            <p className="text-2xl font-bold flex items-center justify-center gap-1">
                                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                                {mockClub.reputation}
                            </p>
                            <p className="text-sm text-muted-foreground">Rating</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Tabs Content */}
            <div className="px-4 lg:px-6 mt-6 pb-8">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="w-full md:w-auto">
                        <TabsTrigger value="about">About</TabsTrigger>
                        <TabsTrigger value="members">Members</TabsTrigger>
                        <TabsTrigger value="rides">Rides</TabsTrigger>
                        <TabsTrigger value="gallery">Gallery</TabsTrigger>
                    </TabsList>

                    <TabsContent value="about" className="mt-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>About</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{mockClub.description}</p>
                                    <Separator className="my-4" />
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <Shield className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-sm">{mockClub.clubType}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Trophy className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-sm">{mockClub.trophyCount} trophies earned</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Leadership</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {mockMembers
                                            .filter((m) => ["FOUNDER", "ADMIN", "OFFICER"].includes(m.role))
                                            .map((member) => (
                                                <Link
                                                    key={member.id}
                                                    href={`/app/profile/${member.username}`}
                                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                                                >
                                                    <Avatar>
                                                        <AvatarFallback>
                                                            {member.name.split(" ").map((n) => n[0]).join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1">
                                                        <p className="font-medium text-sm">{member.name}</p>
                                                        <p className="text-xs text-muted-foreground">
                                                            @{member.username}
                                                        </p>
                                                    </div>
                                                    <Badge className={roleColors[member.role as keyof typeof roleColors]}>
                                                        {member.role === "FOUNDER" && <Crown className="w-3 h-3 mr-1" />}
                                                        {member.role}
                                                    </Badge>
                                                </Link>
                                            ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="members" className="mt-6">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Members ({mockMembers.length})</CardTitle>
                                    {isMember && (
                                        <Button variant="outline" size="sm">
                                            <UserPlus className="w-4 h-4 mr-2" />
                                            Invite
                                        </Button>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ScrollArea className="h-[400px]">
                                    <div className="space-y-2">
                                        {mockMembers.map((member) => (
                                            <Link
                                                key={member.id}
                                                href={`/app/profile/${member.username}`}
                                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                                            >
                                                <Avatar>
                                                    <AvatarFallback>
                                                        {member.name.split(" ").map((n) => n[0]).join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <p className="font-medium">{member.name}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        @{member.username} • {member.ridesCount} rides
                                                    </p>
                                                </div>
                                                <Badge className={roleColors[member.role as keyof typeof roleColors]}>
                                                    {member.role}
                                                </Badge>
                                            </Link>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="rides" className="mt-6">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Club Rides</CardTitle>
                                    {isMember && (
                                        <Button size="sm">
                                            Create Ride
                                        </Button>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {mockRides.map((ride) => (
                                        <Link
                                            key={ride.id}
                                            href={`/app/rides/${ride.id}`}
                                            className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                                        >
                                            <div>
                                                <p className="font-medium">{ride.title}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {formatDate(ride.scheduledAt)} • {ride.participantCount} riders
                                                </p>
                                            </div>
                                            <Badge
                                                variant={ride.status === "PLANNED" ? "default" : "secondary"}
                                            >
                                                {ride.status}
                                            </Badge>
                                        </Link>
                                    ))}
                                </div>
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

            {/* Join Dialog */}
            <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Join {mockClub.name}</DialogTitle>
                        <DialogDescription>
                            {mockClub.isPublic
                                ? "You will be added as a member immediately."
                                : "Your request will be reviewed by the club admins."}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsJoinDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleJoinRequest}>
                            {mockClub.isPublic ? "Join Now" : "Send Request"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
