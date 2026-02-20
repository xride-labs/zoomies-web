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
import { ChevronLeft, ImagePlus } from "lucide-react";
import { clubsApi, mediaApi } from "@/lib/services";
import { fileToDataUrl } from "@/lib/media-utils";

const clubTypes = [
    "Riding Club",
    "Racing Team",
    "Touring Group",
    "Adventure Club",
    "Vintage/Classic",
    "Sport Bikes",
    "Cruisers",
    "Off-Road/Dirt",
    "Women Riders",
    "Other",
];

export default function CreateClubPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [coverFile, setCoverFile] = useState<File | null>(null);
    const [coverPreview, setCoverPreview] = useState<string | null>(null);
    const [clubData, setClubData] = useState({
        name: "",
        description: "",
        location: "",
        clubType: "",
        isPublic: true,
        requireApproval: true,
    });

    const handleLogoChange = async (file: File | null) => {
        setLogoFile(file);
        if (file) {
            const preview = await fileToDataUrl(file);
            setLogoPreview(preview);
        } else {
            setLogoPreview(null);
        }
    };

    const handleCoverChange = async (file: File | null) => {
        setCoverFile(file);
        if (file) {
            const preview = await fileToDataUrl(file);
            setCoverPreview(preview);
        } else {
            setCoverPreview(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const { club } = await clubsApi.createClub({
                name: clubData.name,
                description: clubData.description,
                location: clubData.location,
                clubType: clubData.clubType || undefined,
                isPublic: clubData.isPublic,
            });

            if (logoFile) {
                const logoDataUrl = await fileToDataUrl(logoFile);
                await mediaApi.uploadClubImage(club.id, logoDataUrl, "logo");
            }

            if (coverFile) {
                const coverDataUrl = await fileToDataUrl(coverFile);
                await mediaApi.uploadClubImage(club.id, coverDataUrl, "cover");
            }

            router.push(`/app/clubs/${club.id}`);
        } catch (error) {
            console.error("Failed to create club:", error);
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
                    <h1 className="text-2xl font-bold">Create a Club</h1>
                    <p className="text-sm text-muted-foreground">
                        Start your own riding community
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Club Images */}
                <Card>
                    <CardHeader>
                        <CardTitle>Club Images</CardTitle>
                        <CardDescription>
                            Add a logo and optional cover image
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                            <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-dashed border-border bg-muted/40 p-4 transition-colors hover:bg-muted">
                                <div className="h-20 w-20 overflow-hidden rounded-lg bg-muted flex items-center justify-center">
                                    {logoPreview ? (
                                        <img
                                            src={logoPreview}
                                            alt="Club logo preview"
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <ImagePlus className="w-8 h-8 text-muted-foreground" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium">Club Logo</p>
                                    <p className="text-xs text-muted-foreground">
                                        Square image, at least 256x256px
                                    </p>
                                </div>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) =>
                                        handleLogoChange(e.target.files?.[0] || null)
                                    }
                                />
                            </label>
                            <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-dashed border-border bg-muted/40 p-4 transition-colors hover:bg-muted">
                                <div className="h-20 w-20 overflow-hidden rounded-lg bg-muted flex items-center justify-center">
                                    {coverPreview ? (
                                        <img
                                            src={coverPreview}
                                            alt="Club cover preview"
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <ImagePlus className="w-8 h-8 text-muted-foreground" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium">Club Cover</p>
                                    <p className="text-xs text-muted-foreground">
                                        Wide image, at least 1200x400px
                                    </p>
                                </div>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) =>
                                        handleCoverChange(e.target.files?.[0] || null)
                                    }
                                />
                            </label>
                        </div>
                    </CardContent>
                </Card>

                {/* Basic Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                        <CardDescription>
                            Tell us about your club
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">
                                Club Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="name"
                                placeholder="e.g., Desert Eagles MC"
                                value={clubData.name}
                                onChange={(e) =>
                                    setClubData({ ...clubData, name: e.target.value })
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
                                placeholder="Describe your club, its values, and what kind of riders you're looking for..."
                                value={clubData.description}
                                onChange={(e) =>
                                    setClubData({ ...clubData, description: e.target.value })
                                }
                                rows={4}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location">
                                Location <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="location"
                                placeholder="e.g., Phoenix, AZ"
                                value={clubData.location}
                                onChange={(e) =>
                                    setClubData({ ...clubData, location: e.target.value })
                                }
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="clubType">Club Type</Label>
                            <Select
                                value={clubData.clubType}
                                onValueChange={(value) =>
                                    setClubData({ ...clubData, clubType: value })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select club type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {clubTypes.map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {type}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Privacy Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle>Privacy Settings</CardTitle>
                        <CardDescription>
                            Control who can see and join your club
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Public Club</p>
                                <p className="text-sm text-muted-foreground">
                                    Anyone can find and view your club
                                </p>
                            </div>
                            <Switch
                                checked={clubData.isPublic}
                                onCheckedChange={(checked) =>
                                    setClubData({ ...clubData, isPublic: checked })
                                }
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Require Approval</p>
                                <p className="text-sm text-muted-foreground">
                                    Review and approve join requests
                                </p>
                            </div>
                            <Switch
                                checked={clubData.requireApproval}
                                onCheckedChange={(checked) =>
                                    setClubData({ ...clubData, requireApproval: checked })
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
                        disabled={isSubmitting || !clubData.name || !clubData.description || !clubData.location}
                    >
                        {isSubmitting ? "Creating..." : "Create Club"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
