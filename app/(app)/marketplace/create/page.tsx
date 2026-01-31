"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ImagePlus, X, Plus, DollarSign } from "lucide-react";

const categories = [
    "Motorcycles",
    "Parts & Accessories",
    "Gear & Apparel",
    "Helmets",
    "Tools & Equipment",
    "Other",
];

const conditions = ["New", "Like New", "Excellent", "Good", "Fair", "For Parts"];

export default function CreateListingPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [images, setImages] = useState<string[]>([]);
    const [listingData, setListingData] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        condition: "",
        location: "",
        // Motorcycle specific
        year: "",
        make: "",
        model: "",
        mileage: "",
    });

    const showMotorcycleFields = listingData.category === "Motorcycles";

    const handleImageUpload = () => {
        // In real app, this would open file picker and upload
        if (images.length < 10) {
            setImages([...images, `placeholder-${images.length}`]);
        }
    };

    const handleRemoveImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // API call would go here
        console.log("Creating listing:", listingData);

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        router.push("/app/marketplace");
    };

    return (
        <div className="min-h-screen p-4 lg:p-6 max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ChevronLeft className="w-5 h-5" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold">Create Listing</h1>
                    <p className="text-sm text-muted-foreground">
                        Sell your bike or gear
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Photos */}
                <Card>
                    <CardHeader>
                        <CardTitle>Photos</CardTitle>
                        <CardDescription>
                            Add up to 10 photos. First photo will be the cover.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                            {images.map((_, index) => (
                                <div
                                    key={index}
                                    className="relative aspect-square bg-muted rounded-lg flex items-center justify-center"
                                >
                                    <ImagePlus className="w-6 h-6 text-muted-foreground/50" />
                                    <button
                                        type="button"
                                        className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                                        onClick={() => handleRemoveImage(index)}
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                    {index === 0 && (
                                        <span className="absolute bottom-1 left-1 text-[10px] bg-primary text-primary-foreground px-1 rounded">
                                            Cover
                                        </span>
                                    )}
                                </div>
                            ))}
                            {images.length < 10 && (
                                <button
                                    type="button"
                                    className="aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-1 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                                    onClick={handleImageUpload}
                                >
                                    <Plus className="w-6 h-6" />
                                    <span className="text-xs">Add</span>
                                </button>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Basic Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Listing Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">
                                Title <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="title"
                                placeholder="e.g., 2021 Ducati Panigale V4S"
                                value={listingData.title}
                                onChange={(e) =>
                                    setListingData({ ...listingData, title: e.target.value })
                                }
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="category">
                                    Category <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                    value={listingData.category}
                                    onValueChange={(value) =>
                                        setListingData({ ...listingData, category: value })
                                    }
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((cat) => (
                                            <SelectItem key={cat} value={cat}>
                                                {cat}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="condition">
                                    Condition <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                    value={listingData.condition}
                                    onValueChange={(value) =>
                                        setListingData({ ...listingData, condition: value })
                                    }
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select condition" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {conditions.map((cond) => (
                                            <SelectItem key={cond} value={cond}>
                                                {cond}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="price">
                                Price <span className="text-red-500">*</span>
                            </Label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="price"
                                    type="number"
                                    className="pl-9"
                                    placeholder="0"
                                    value={listingData.price}
                                    onChange={(e) =>
                                        setListingData({ ...listingData, price: e.target.value })
                                    }
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location">
                                Location <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="location"
                                placeholder="City, State"
                                value={listingData.location}
                                onChange={(e) =>
                                    setListingData({ ...listingData, location: e.target.value })
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
                                placeholder="Describe your item in detail..."
                                value={listingData.description}
                                onChange={(e) =>
                                    setListingData({ ...listingData, description: e.target.value })
                                }
                                rows={6}
                                required
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Motorcycle Specific Fields */}
                {showMotorcycleFields && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Motorcycle Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="year">Year</Label>
                                    <Input
                                        id="year"
                                        type="number"
                                        placeholder="e.g., 2021"
                                        value={listingData.year}
                                        onChange={(e) =>
                                            setListingData({ ...listingData, year: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="make">Make</Label>
                                    <Input
                                        id="make"
                                        placeholder="e.g., Ducati"
                                        value={listingData.make}
                                        onChange={(e) =>
                                            setListingData({ ...listingData, make: e.target.value })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="model">Model</Label>
                                    <Input
                                        id="model"
                                        placeholder="e.g., Panigale V4S"
                                        value={listingData.model}
                                        onChange={(e) =>
                                            setListingData({ ...listingData, model: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="mileage">Mileage</Label>
                                    <Input
                                        id="mileage"
                                        placeholder="e.g., 3200"
                                        value={listingData.mileage}
                                        onChange={(e) =>
                                            setListingData({ ...listingData, mileage: e.target.value })
                                        }
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

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
                            !listingData.title ||
                            !listingData.category ||
                            !listingData.condition ||
                            !listingData.price ||
                            !listingData.location ||
                            !listingData.description
                        }
                    >
                        {isSubmitting ? "Publishing..." : "Publish Listing"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
