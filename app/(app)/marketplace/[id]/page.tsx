"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    ChevronLeft,
    Heart,
    Share2,
    MapPin,
    Calendar,
    MessageCircle,
    Flag,
    Star,
    ShieldCheck,
    MoreHorizontal,
    ChevronRight,
    Image as ImageIcon,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

// Mock listing data
const mockListing = {
    id: "l1",
    title: "2021 Ducati Panigale V4S",
    description: `Beautiful 2021 Ducati Panigale V4S in Rosso Red. This bike is in excellent condition with only 3,200 miles. 

Features include:
- Öhlins electronic suspension (Smart EC 2.0)
- Brembo Stylema calipers
- Forged Marchesini wheels
- Quick shifter (up/down)
- Ducati Data Analyzer
- Carbon fiber front fender and rear hugger

Recently serviced at authorized Ducati dealer. All maintenance records available. Clean title in hand.

Reason for selling: Upgrading to the Superleggera V4.

No lowballers, I know what I have. Serious inquiries only.`,
    price: 24500,
    images: [null, null, null, null, null],
    category: "Motorcycles",
    condition: "Excellent",
    location: "Scottsdale, AZ",
    listedAt: "2026-01-25",
    views: 234,
    saves: 18,
    seller: {
        id: "u1",
        name: "Mike Rodriguez",
        username: "roadking_mike",
        avatar: null,
        rating: 4.9,
        reviewsCount: 23,
        verified: true,
        memberSince: "2023-06",
        responseTime: "Usually within 1 hour",
    },
    specifications: {
        year: "2021",
        make: "Ducati",
        model: "Panigale V4S",
        mileage: "3,200 miles",
        color: "Rosso Red",
        engine: "1,103cc V4",
        transmission: "6-speed",
    },
};

const mockSellerListings = [
    { id: "l2", title: "Dainese Racing Suit", price: 1200, image: null },
    { id: "l3", title: "Shoei X-Fifteen Helmet", price: 850, image: null },
    { id: "l4", title: "Ducati OEM Parts Bundle", price: 450, image: null },
];

export default function ListingDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [isSaved, setIsSaved] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
    const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
    const [message, setMessage] = useState("");

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(price);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const handleSendMessage = () => {
        console.log("Sending message:", message);
        setIsContactDialogOpen(false);
        setMessage("");
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
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsSaved(!isSaved)}
                        >
                            <Heart
                                className={`w-5 h-5 ${isSaved ? "fill-red-500 text-red-500" : ""}`}
                            />
                        </Button>
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
                                <DropdownMenuItem onClick={() => setIsReportDialogOpen(true)}>
                                    <Flag className="w-4 h-4 mr-2" />
                                    Report Listing
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            {/* Image Gallery */}
            <div className="relative">
                <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                    <ImageIcon className="w-16 h-16 text-muted-foreground/30" />
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {mockListing.images.map((_, index) => (
                        <button
                            key={index}
                            className={`w-2 h-2 rounded-full transition-colors ${index === selectedImageIndex ? "bg-white" : "bg-white/50"
                                }`}
                            onClick={() => setSelectedImageIndex(index)}
                        />
                    ))}
                </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-2 p-4 overflow-x-auto">
                {mockListing.images.map((_, index) => (
                    <button
                        key={index}
                        className={`w-16 h-16 flex-shrink-0 rounded-lg bg-muted flex items-center justify-center border-2 transition-colors ${index === selectedImageIndex ? "border-primary" : "border-transparent"
                            }`}
                        onClick={() => setSelectedImageIndex(index)}
                    >
                        <ImageIcon className="w-6 h-6 text-muted-foreground/30" />
                    </button>
                ))}
            </div>

            <div className="px-4 space-y-6">
                {/* Title & Price */}
                <div>
                    <div className="flex items-start justify-between gap-4">
                        <h1 className="text-2xl font-bold">{mockListing.title}</h1>
                    </div>
                    <p className="text-3xl font-bold text-primary mt-2">
                        {formatPrice(mockListing.price)}
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {mockListing.location}
                        </span>
                        <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(mockListing.listedAt)}
                        </span>
                    </div>
                    <div className="flex gap-2 mt-3">
                        <Badge variant="secondary">{mockListing.category}</Badge>
                        <Badge variant="outline">{mockListing.condition}</Badge>
                    </div>
                </div>

                <Separator />

                {/* Specifications */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Specifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            {Object.entries(mockListing.specifications).map(([key, value]) => (
                                <div key={key}>
                                    <p className="text-xs text-muted-foreground capitalize">
                                        {key.replace(/([A-Z])/g, " $1").trim()}
                                    </p>
                                    <p className="font-medium">{value}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Description */}
                <div>
                    <h2 className="font-semibold mb-3">Description</h2>
                    <p className="text-muted-foreground whitespace-pre-line">
                        {mockListing.description}
                    </p>
                </div>

                <Separator />

                {/* Seller Info */}
                <Card>
                    <CardContent className="p-4">
                        <Link href={`/app/profile/${mockListing.seller.username}`}>
                            <div className="flex items-center gap-4">
                                <Avatar className="w-14 h-14">
                                    <AvatarFallback>
                                        {mockListing.seller.name.split(" ").map((n) => n[0]).join("")}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold">{mockListing.seller.name}</p>
                                        {mockListing.seller.verified && (
                                            <ShieldCheck className="w-4 h-4 text-blue-500" />
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                                            {mockListing.seller.rating}
                                        </span>
                                        <span>({mockListing.seller.reviewsCount} reviews)</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {mockListing.seller.responseTime}
                                    </p>
                                </div>
                                <ChevronRight className="w-5 h-5 text-muted-foreground" />
                            </div>
                        </Link>
                    </CardContent>
                </Card>

                {/* More from Seller */}
                {mockSellerListings.length > 0 && (
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="font-semibold">More from this seller</h2>
                            <Button variant="ghost" size="sm">
                                View all
                            </Button>
                        </div>
                        <div className="flex gap-3 overflow-x-auto pb-2">
                            {mockSellerListings.map((listing) => (
                                <Link key={listing.id} href={`/app/marketplace/${listing.id}`}>
                                    <Card className="w-36 flex-shrink-0">
                                        <CardContent className="p-2">
                                            <div className="aspect-square rounded-md bg-muted flex items-center justify-center mb-2">
                                                <ImageIcon className="w-8 h-8 text-muted-foreground/30" />
                                            </div>
                                            <p className="text-sm font-medium truncate">{listing.title}</p>
                                            <p className="text-sm text-primary font-semibold">
                                                {formatPrice(listing.price)}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Stats */}
                <div className="flex items-center justify-center gap-6 py-4 text-sm text-muted-foreground">
                    <span>{mockListing.views} views</span>
                    <span>•</span>
                    <span>{mockListing.saves} saves</span>
                </div>
            </div>

            {/* Fixed Bottom Action */}
            <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setIsContactDialogOpen(true)}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message Seller
                </Button>
                <Button className="flex-1">
                    Make an Offer
                </Button>
            </div>

            {/* Contact Dialog */}
            <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Message Seller</DialogTitle>
                        <DialogDescription>
                            Send a message to {mockListing.seller.name} about this listing
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <Label htmlFor="message">Your Message</Label>
                        <Textarea
                            id="message"
                            className="mt-2"
                            placeholder={`Hi, I'm interested in your ${mockListing.title}...`}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={4}
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsContactDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSendMessage} disabled={!message.trim()}>
                            Send Message
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Report Dialog */}
            <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Report Listing</DialogTitle>
                        <DialogDescription>
                            Why are you reporting this listing?
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-2">
                        {[
                            "Prohibited item",
                            "Suspected fraud",
                            "Incorrect category",
                            "Spam or misleading",
                            "Other",
                        ].map((reason) => (
                            <Button
                                key={reason}
                                variant="outline"
                                className="w-full justify-start"
                                onClick={() => setIsReportDialogOpen(false)}
                            >
                                {reason}
                            </Button>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
