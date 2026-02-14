"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ridesAPI } from "@/lib/services";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
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
    ChevronLeft,
    MapPin,
    Calendar,
    Clock,
    Users,
    Navigation,
    Share2,
    MoreHorizontal,
    MessageCircle,
    CheckCircle,
    XCircle,
    AlertCircle,
    Route,
    Gauge,
    Mountain,
    Fuel,
    Loader2,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface Organizer {
    id: string;
    name: string;
    username?: string;
    avatar?: string | null;
    image?: string | null;
    ridesLed?: number;
}

interface Club {
    id: string;
    name: string;
}

interface Weather {
    temp: string;
    condition: string;
    wind: string;
}

interface Participant {
    id: string;
    name: string;
    username?: string;
    status: string;
    role?: string;
    user?: {
        id: string;
        name: string;
        image: string | null;
    };
}

interface Waypoint {
    name: string;
    time?: string;
    type: string;
}

interface Ride {
    id: string;
    title: string;
    description: string;
    startLocation?: string | { name: string; lat: number; lng: number };
    endLocation?: string | { name: string; lat: number; lng: number };
    scheduledAt: string;
    estimatedDuration?: number;
    distance?: number;
    difficulty?: string;
    terrain?: string;
    maxParticipants?: number;
    status: string;
    organizer?: Organizer;
    club?: Club | null;
    weather?: Weather;
    participants?: Participant[];
    waypoints?: Waypoint[];
}

const statusColors = {
    PLANNED: "bg-blue-100 text-blue-700",
    IN_PROGRESS: "bg-green-100 text-green-700",
    COMPLETED: "bg-gray-100 text-gray-700",
    CANCELLED: "bg-red-100 text-red-700",
};

const participantStatusIcons = {
    CONFIRMED: <CheckCircle className="w-4 h-4 text-green-500" />,
    PENDING: <AlertCircle className="w-4 h-4 text-amber-500" />,
    DECLINED: <XCircle className="w-4 h-4 text-red-500" />,
};

export default function RideDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [isJoined, setIsJoined] = useState(false);
    const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);
    const [ride, setRide] = useState<Ride | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRide = async () => {
            try {
                setLoading(true);
                const rideId = params.id as string;
                const response = await ridesAPI.getRide(rideId);
                setRide(response.ride);
            } catch (err) {
                setError("Failed to load ride details");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchRide();
        }
    }, [params.id]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    };

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
        });
    };

    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error || !ride) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <p className="text-muted-foreground">{error || "Ride not found"}</p>
                <Button onClick={() => router.back()}>Go Back</Button>
            </div>
        );
    }

    const participants = ride.participants || [];
    const waypoints = ride.waypoints || [];
    const confirmedCount = participants.filter((p) => p.status === "CONFIRMED").length;
    const maxParticipants = ride.maxParticipants || 1;
    const participantPercentage = (confirmedCount / maxParticipants) * 100;

    const handleJoinRide = () => {
        setIsJoined(true);
    };

    const handleLeaveRide = () => {
        setIsJoined(false);
        setIsLeaveDialogOpen(false);
    };

    return (
        <div className="min-h-screen pb-24">
            {/* Header */}
            <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b">
                <div className="flex items-center justify-between p-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                            <Share2 className="w-5 h-5" />
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="w-5 h-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                    <Navigation className="w-4 h-4 mr-2" />
                                    Open in Maps
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Calendar className="w-4 h-4 mr-2" />
                                    Add to Calendar
                                </DropdownMenuItem>
                                {isJoined && (
                                    <DropdownMenuItem
                                        className="text-red-600"
                                        onClick={() => setIsLeaveDialogOpen(true)}
                                    >
                                        Leave Ride
                                    </DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            {/* Map Preview */}
            <div className="aspect-video bg-muted flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                    <Route className="w-12 h-12 mx-auto mb-2 opacity-30" />
                    <p>Route Map Preview</p>
                </div>
            </div>

            <div className="px-4 space-y-6 pt-4">
                {/* Title & Status */}
                <div>
                    <div className="flex items-start justify-between gap-4">
                        <h1 className="text-2xl font-bold">{ride.title}</h1>
                        <Badge className={statusColors[ride.status as keyof typeof statusColors]}>
                            {ride.status}
                        </Badge>
                    </div>
                    {ride.club && (
                        <Link href={`/app/clubs/${ride.club.id}`}>
                            <Badge variant="outline" className="mt-2">
                                {ride.club.name}
                            </Badge>
                        </Link>
                    )}
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-4">
                    <Card>
                        <CardContent className="p-4 flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                                <Calendar className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Date</p>
                                <p className="font-medium text-sm">{formatDate(ride.scheduledAt)}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                                <Clock className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Time</p>
                                <p className="font-medium text-sm">{formatTime(ride.scheduledAt)}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Route Stats */}
                <Card>
                    <CardContent className="p-4">
                        <div className="grid grid-cols-4 gap-4 text-center">
                            <div>
                                <Route className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
                                <p className="font-semibold">{ride.distance || 0} mi</p>
                                <p className="text-xs text-muted-foreground">Distance</p>
                            </div>
                            <div>
                                <Clock className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
                                <p className="font-semibold">{formatDuration(ride.estimatedDuration || 0)}</p>
                                <p className="text-xs text-muted-foreground">Duration</p>
                            </div>
                            <div>
                                <Gauge className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
                                <p className="font-semibold">{ride.difficulty || 'N/A'}</p>
                                <p className="text-xs text-muted-foreground">Difficulty</p>
                            </div>
                            <div>
                                <Mountain className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
                                <p className="font-semibold text-xs">{ride.terrain || 'N/A'}</p>
                                <p className="text-xs text-muted-foreground">Terrain</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Location */}
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">Meeting Point</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-primary mt-0.5" />
                            <div className="flex-1">
                                <p className="font-medium">{typeof ride.startLocation === 'string' ? ride.startLocation : ride.startLocation?.name || 'N/A'}</p>
                                <Button variant="link" className="h-auto p-0 text-sm">
                                    Open in Maps
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Route Waypoints */}
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">Route Itinerary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {waypoints.map((waypoint, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className={`w-3 h-3 rounded-full ${waypoint.type === "start" ? "bg-green-500" :
                                        waypoint.type === "end" ? "bg-red-500" :
                                            waypoint.type === "stop" ? "bg-amber-500" :
                                                "bg-primary"
                                        }`} />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">{waypoint.name}</p>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{waypoint.time}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Organizer */}
                {ride.organizer && (
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">Organizer</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Link href={`/app/profile/${ride.organizer.username || ride.organizer.id}`}>
                                <div className="flex items-center gap-4">
                                    <Avatar className="w-12 h-12">
                                        <AvatarFallback>
                                            {ride.organizer.name.split(" ").map((n) => n[0]).join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <p className="font-semibold">{ride.organizer.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {ride.organizer.ridesLed || 0} rides led
                                        </p>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        <MessageCircle className="w-4 h-4" />
                                    </Button>
                                </div>
                            </Link>
                        </CardContent>
                    </Card>
                )}

                {/* Participants */}
                <Card>
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-base">
                                Riders ({confirmedCount}/{ride.maxParticipants})
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Progress value={participantPercentage} className="mb-4" />
                        <ScrollArea className="h-[200px]">
                            <div className="space-y-3">
                                {participants.map((participant) => (
                                    <Link
                                        key={participant.id}
                                        href={`/app/profile/${participant.username}`}
                                    >
                                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
                                            <Avatar className="w-10 h-10">
                                                <AvatarFallback>
                                                    {participant.name.split(" ").map((n) => n[0]).join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <p className="font-medium text-sm">{participant.name}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    @{participant.username}
                                                    {participant.role === "organizer" && " • Organizer"}
                                                </p>
                                            </div>
                                            {participantStatusIcons[participant.status as keyof typeof participantStatusIcons]}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>

                {/* Description */}
                <div>
                    <h2 className="font-semibold mb-3">About This Ride</h2>
                    <div className="text-muted-foreground whitespace-pre-line text-sm">
                        {ride.description}
                    </div>
                </div>

                {/* Weather */}
                {ride.weather && (
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="text-3xl">☀️</div>
                                    <div>
                                        <p className="font-semibold">{ride.weather.temp}</p>
                                        <p className="text-sm text-muted-foreground">{ride.weather.condition}</p>
                                    </div>
                                </div>
                                <div className="text-right text-sm text-muted-foreground">
                                    <p>Wind: {ride.weather.wind}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Fixed Bottom Action */}
            <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
                {isJoined ? (
                    <div className="flex gap-3">
                        <Button variant="outline" className="flex-1">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Group Chat
                        </Button>
                        <Button className="flex-1">
                            <Navigation className="w-4 h-4 mr-2" />
                            Navigate
                        </Button>
                    </div>
                ) : (
                    <Button className="w-full" size="lg" onClick={handleJoinRide}>
                        <Users className="w-4 h-4 mr-2" />
                        Join This Ride
                    </Button>
                )}
            </div>

            {/* Leave Dialog */}
            <Dialog open={isLeaveDialogOpen} onOpenChange={setIsLeaveDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Leave Ride</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to leave this ride? You can rejoin if spots are available.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsLeaveDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleLeaveRide}>
                            Leave Ride
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
