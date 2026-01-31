"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronLeft, Camera } from "lucide-react";

export default function EditProfilePage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [profileData, setProfileData] = useState({
        name: "Mike Rodriguez",
        username: "roadking_mike",
        bio: "Full-time rider, part-time mechanic. 15 years on two wheels. Let's ride! 🏍️",
        location: "Phoenix, AZ",
        email: "mike@example.com",
        phone: "+1 (555) 123-4567",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // API call would go here
        console.log("Updating profile:", profileData);

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        router.push("/app/profile/me");
    };

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
