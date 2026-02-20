"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, MapPin, Plus, X } from "lucide-react";
import { ridesApi, mediaApi } from "@/lib/services";
import { fileToDataUrl } from "@/lib/media-utils";

const difficulties = ["Beginner", "Intermediate", "Advanced", "Expert"];

const paceOptions = ["Leisurely", "Moderate", "Fast"];

const terrainTypes = [
    "Paved Roads",
    "Highway",
    "Twisties/Mountain",
    "Mixed (Paved & Gravel)",
    "Off-Road",
    "Urban/City",
];

const mockClubs = [
    { id: "c1", name: "Desert Eagles MC" },
    { id: "c2", name: "Phoenix Riders" },
];

export default function CreateRidePage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [waypoints, setWaypoints] = useState<string[]>([]);
    const [newWaypoint, setNewWaypoint] = useState("");
    const [rideMediaFiles, setRideMediaFiles] = useState<File[]>([]);
    const [rideData, setRideData] = useState({
        title: "",
        description: "",
        startLocation: "",
        endLocation: "",
        date: "",
        time: "",
        estimatedDuration: "",
        estimatedDistance: "",
        difficulty: "",
        terrain: "",
        pace: "",
        maxParticipants: "10",
        clubId: "",
        isPrivate: false,
        requiresApproval: false,
    });

    const handleAddWaypoint = () => {
        if (newWaypoint.trim()) {
            setWaypoints([...waypoints, newWaypoint.trim()]);
            setNewWaypoint("");
        }
    };

    const handleRemoveWaypoint = (index: number) => {
        setWaypoints(waypoints.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const scheduledAt = rideData.date && rideData.time
                ? new Date(`${rideData.date}T${rideData.time}`).toISOString()
                : undefined;

            const durationMinutes = rideData.estimatedDuration
                ? Math.round(Number(rideData.estimatedDuration) * 60)
                : undefined;

            const distance = rideData.estimatedDistance
                ? Number(rideData.estimatedDistance)
                : undefined;

            const { ride } = await ridesApi.createRide({
                title: rideData.title,
                description: rideData.description || undefined,
                startLocation: rideData.startLocation,
                endLocation: rideData.endLocation || undefined,
                experienceLevel: rideData.difficulty || undefined,
                pace: rideData.pace || undefined,
                distance,
                duration: durationMinutes,
                scheduledAt,
                keepPermanently: false,
            });

            if (rideMediaFiles.length > 0) {
                for (const file of rideMediaFiles) {
                    const dataUrl = await fileToDataUrl(file);
                    await mediaApi.uploadRideMedia(ride.id, dataUrl, "image");
                }
            }

            router.push(`/app/rides/${ride.id}`);
        } catch (error) {
            console.error("Failed to create ride:", error);
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen p-4 lg:p-6 max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ChevronLeft className="w-5 h-5" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold">Create a Ride</h1>
                    <p className="text-sm text-muted-foreground">
                        Plan a new group ride
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Ride Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">
                                Ride Title <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="title"
                                placeholder="e.g., Morning Mountain Loop"
                                value={rideData.title}
                                onChange={(e) =>
                                    setRideData({ ...rideData, title: e.target.value })
                                }
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">
                                Description <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                                id="description"
                                placeholder="Describe the ride, route highlights, what to expect..."
                                value={rideData.description}
                                onChange={(e) =>
                                    setRideData({ ...rideData, description: e.target.value })
                                }
                                rows={4}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="club">Organize Under Club (Optional)</Label>
                            <Select
                                value={rideData.clubId}
                                onValueChange={(value) =>
                                    setRideData({ ...rideData, clubId: value })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Personal ride (no club)" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">Personal ride (no club)</SelectItem>
                                    {mockClubs.map((club) => (
                                        <SelectItem key={club.id} value={club.id}>
                                            {club.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Date & Time */}
                <Card>
                    <CardHeader>
                        <CardTitle>Schedule</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="date">
                                    Date <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={rideData.date}
                                    onChange={(e) =>
                                        setRideData({ ...rideData, date: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="time">
                                    Start Time <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="time"
                                    type="time"
                                    value={rideData.time}
                                    onChange={(e) =>
                                        setRideData({ ...rideData, time: e.target.value })
                                    }
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="duration">Estimated Duration (hours)</Label>
                                <Input
                                    id="duration"
                                    type="number"
                                    step="0.5"
                                    placeholder="e.g., 3"
                                    value={rideData.estimatedDuration}
                                    onChange={(e) =>
                                        setRideData({ ...rideData, estimatedDuration: e.target.value })
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="distance">Estimated Distance (miles)</Label>
                                <Input
                                    id="distance"
                                    type="number"
                                    placeholder="e.g., 85"
                                    value={rideData.estimatedDistance}
                                    onChange={(e) =>
                                        setRideData({ ...rideData, estimatedDistance: e.target.value })
                                    }
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Route */}
                <Card>
                    <CardHeader>
                        <CardTitle>Route</CardTitle>
                        <CardDescription>
                            Define the start, end, and key waypoints
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="startLocation">
                                Start Location <span className="text-red-500">*</span>
                            </Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                                <Input
                                    id="startLocation"
                                    className="pl-9"
                                    placeholder="Meeting point address"
                                    value={rideData.startLocation}
                                    onChange={(e) =>
                                        setRideData({ ...rideData, startLocation: e.target.value })
                                    }
                                    required
                                />
                            </div>
                        </div>

                        {/* Waypoints */}
                        <div className="space-y-2">
                            <Label>Waypoints (Optional)</Label>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Add a stop or waypoint"
                                    value={newWaypoint}
                                    onChange={(e) => setNewWaypoint(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            handleAddWaypoint();
                                        }
                                    }}
                                />
                                <Button type="button" variant="outline" onClick={handleAddWaypoint}>
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </div>
                            {waypoints.length > 0 && (
                                <div className="space-y-2 mt-2">
                                    {waypoints.map((waypoint, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2 p-2 bg-muted rounded-lg"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium">
                                                {index + 1}
                                            </div>
                                            <span className="flex-1 text-sm">{waypoint}</span>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6"
                                                onClick={() => handleRemoveWaypoint(index)}
                                            >
                                                <X className="w-3 h-3" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="endLocation">
                                End Location <span className="text-red-500">*</span>
                            </Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
                                <Input
                                    id="endLocation"
                                    className="pl-9"
                                    placeholder="Final destination (or same as start for loop)"
                                    value={rideData.endLocation}
                                    onChange={(e) =>
                                        setRideData({ ...rideData, endLocation: e.target.value })
                                    }
                                    required
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Ride Characteristics */}
                <Card>
                    <CardHeader>
                        <CardTitle>Ride Type</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="difficulty">Difficulty Level</Label>
                                <Select
                                    value={rideData.difficulty}
                                    onValueChange={(value) =>
                                        setRideData({ ...rideData, difficulty: value })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select difficulty" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {difficulties.map((diff) => (
                                            <SelectItem key={diff} value={diff}>
                                                {diff}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="terrain">Terrain Type</Label>
                                <Select
                                    value={rideData.terrain}
                                    onValueChange={(value) =>
                                        setRideData({ ...rideData, terrain: value })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select terrain" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {terrainTypes.map((terrain) => (
                                            <SelectItem key={terrain} value={terrain}>
                                                {terrain}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="pace">Pace</Label>
                                <Select
                                    value={rideData.pace}
                                    onValueChange={(value) =>
                                        setRideData({ ...rideData, pace: value })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select pace" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {paceOptions.map((pace) => (
                                            <SelectItem key={pace} value={pace}>
                                                {pace}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="maxParticipants">Max Participants</Label>
                                <Input
                                    id="maxParticipants"
                                    type="number"
                                    min="2"
                                    max="100"
                                    value={rideData.maxParticipants}
                                    onChange={(e) =>
                                        setRideData({ ...rideData, maxParticipants: e.target.value })
                                    }
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Ride Media */}
                <Card>
                    <CardHeader>
                        <CardTitle>Ride Photos</CardTitle>
                        <CardDescription>
                            Add photos to your ride gallery
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) =>
                                setRideMediaFiles(Array.from(e.target.files || []))
                            }
                        />
                        {rideMediaFiles.length > 0 && (
                            <p className="text-xs text-muted-foreground">
                                {rideMediaFiles.length} file(s) selected
                            </p>
                        )}
                    </CardContent>
                </Card>

                {/* Privacy Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle>Privacy</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Private Ride</p>
                                <p className="text-sm text-muted-foreground">
                                    Only invited riders can see and join
                                </p>
                            </div>
                            <Switch
                                checked={rideData.isPrivate}
                                onCheckedChange={(checked) =>
                                    setRideData({ ...rideData, isPrivate: checked })
                                }
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Require Approval</p>
                                <p className="text-sm text-muted-foreground">
                                    Approve riders before they can join
                                </p>
                            </div>
                            <Switch
                                checked={rideData.requiresApproval}
                                onCheckedChange={(checked) =>
                                    setRideData({ ...rideData, requiresApproval: checked })
                                }
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Submit */}
                <div className="flex gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={() => router.back()}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="flex-1"
                        disabled={
                            isSubmitting ||
                            !rideData.title ||
                            !rideData.description ||
                            !rideData.date ||
                            !rideData.time ||
                            !rideData.startLocation ||
                            !rideData.endLocation
                        }
                    >
                        {isSubmitting ? "Creating..." : "Create Ride"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
