"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { userAPI } from "@/lib/services";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronLeft, Camera, Loader2 } from "lucide-react";

interface ProfileData {
    name: string;
    username: string;
    bio: string;
    location: string;
    email: string;
    phone: string;
}

export default function EditProfilePage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [profileData, setProfileData] = useState<ProfileData>({
        name: "",
        username: "",
        bio: "",
        location: "",
        email: "",
        phone: "",
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const response = await userAPI.getProfile();
                const userData = response.user;
                setProfileData({
                    name: userData.name || "",
                    username: userData.username || "",
                    bio: userData.bio || "",
                    location: userData.location || "",
                    email: userData.email || "",
                    phone: (userData as { phone?: string }).phone || "",
                });
            } catch (err) {
                setError("Failed to load profile");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await userAPI.updateProfile({
                name: profileData.name,
                username: profileData.username,
                bio: profileData.bio,
                location: profileData.location,
                email: profileData.email,
            });
            router.push("/app/profile/me");
        } catch (err) {
            console.error("Failed to update profile:", err);
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <p className="text-muted-foreground">{error}</p>
                <Button onClick={() => router.back()}>Go Back</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 lg:p-6 max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ChevronLeft className="w-5 h-5" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold">Edit Profile</h1>
                    <p className="text-sm text-muted-foreground">
                        Update your profile information
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Profile Picture */}
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Picture</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <Avatar className="w-24 h-24">
                                    <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                                        {profileData.name.split(" ").map((n) => n[0]).join("")}
                                    </AvatarFallback>
                                </Avatar>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    size="icon"
                                    className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                                >
                                    <Camera className="w-4 h-4" />
                                </Button>
                            </div>
                            <div className="flex-1">
                                <Button type="button" variant="outline" size="sm">
                                    Upload Image
                                </Button>
                                <p className="text-xs text-muted-foreground mt-2">
                                    Recommended: Square image, at least 256x256px
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Basic Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={profileData.name}
                                onChange={(e) =>
                                    setProfileData({ ...profileData, name: e.target.value })
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 text-sm text-muted-foreground bg-muted border border-r-0 rounded-l-md">
                                    @
                                </span>
                                <Input
                                    id="username"
                                    className="rounded-l-none"
                                    value={profileData.username}
                                    onChange={(e) =>
                                        setProfileData({ ...profileData, username: e.target.value })
                                    }
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                                id="bio"
                                placeholder="Tell us about yourself..."
                                value={profileData.bio}
                                onChange={(e) =>
                                    setProfileData({ ...profileData, bio: e.target.value })
                                }
                                rows={3}
                            />
                            <p className="text-xs text-muted-foreground text-right">
                                {profileData.bio.length}/160
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                placeholder="City, State"
                                value={profileData.location}
                                onChange={(e) =>
                                    setProfileData({ ...profileData, location: e.target.value })
                                }
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Contact Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                        <CardDescription>
                            Your contact info is private and only visible to you
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={profileData.email}
                                onChange={(e) =>
                                    setProfileData({ ...profileData, email: e.target.value })
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={profileData.phone}
                                onChange={(e) =>
                                    setProfileData({ ...profileData, phone: e.target.value })
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
                    <Button type="submit" className="flex-1" disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
