"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Heart,
    MessageCircle,
    Bookmark,
    Share2,
    MoreHorizontal,
    Calendar,
    Users,
    Image as ImageIcon
} from "lucide-react";
import Link from "next/link";

// Mock data for demonstration
const mockPosts = [
    {
        id: "1",
        type: "ride" as const,
        author: {
            id: "u1",
            name: "Mike Rodriguez",
            username: "roadking_mike",
            avatar: null,
            clubs: [
                { id: "c1", name: "Desert Eagles MC", avatar: null },
                { id: "c2", name: "Phoenix Riders", avatar: null },
            ],
        },
        content: "Epic sunrise ride through the Superstition Mountains this weekend! 🏜️ Who's joining? We're doing the full loop - 180 miles of pure desert beauty.",
        images: [],
        ride: {
            id: "r1",
            title: "Superstition Mountain Loop",
            scheduledAt: "2026-01-25T06:00:00Z",
            participantsCount: 12,
        },
        likesCount: 47,
        commentsCount: 8,
        isLiked: false,
        isSaved: false,
        createdAt: "2026-01-22T10:30:00Z",
    },
    {
        id: "2",
        type: "content" as const,
        author: {
            id: "u2",
            name: "Sarah Chen",
            username: "sarah_twowheels",
            avatar: null,
            clubs: [
                { id: "c3", name: "Bay Area Cruisers", avatar: null },
            ],
        },
        content: "Finally installed my new Akrapovic exhaust! The sound is absolutely incredible. Totally worth the investment. 🔥",
        images: [],
        likesCount: 89,
        commentsCount: 23,
        isLiked: true,
        isSaved: true,
        createdAt: "2026-01-22T08:15:00Z",
    },
    {
        id: "3",
        type: "listing" as const,
        author: {
            id: "u3",
            name: "James Wilson",
            username: "jwilson_moto",
            avatar: null,
            clubs: [
                { id: "c4", name: "Texas Thunder", avatar: null },
                { id: "c5", name: "Hill Country Riders", avatar: null },
            ],
        },
        content: "Selling my Shoei RF-1400 helmet. Only used for one season, in excellent condition. Grab it before it's gone!",
        images: [],
        listing: {
            id: "l1",
            title: "Shoei RF-1400 Helmet - Large",
            price: 450,
            currency: "USD",
            isSold: false,
        },
        likesCount: 12,
        commentsCount: 5,
        isLiked: false,
        isSaved: false,
        createdAt: "2026-01-21T18:45:00Z",
    },
    {
        id: "4",
        type: "club-activity" as const,
        author: {
            id: "u4",
            name: "Rocky Mountain MC",
            username: "rockymtn_mc",
            avatar: null,
            clubs: [],
        },
        content: "New members welcome! 🏔️ Just completed our monthly meeting and planned some amazing rides for February. DM us to learn more about joining.",
        images: [],
        club: {
            id: "c6",
            name: "Rocky Mountain MC",
            avatar: null,
        },
        likesCount: 156,
        commentsCount: 34,
        isLiked: false,
        isSaved: false,
        createdAt: "2026-01-21T15:00:00Z",
    },
];

function formatTimeAgo(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
}

function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit"
    });
}

export default function FeedPage() {
    const [posts, setPosts] = useState(mockPosts);

    const handleLike = (postId: string) => {
        setPosts(posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    isLiked: !post.isLiked,
                    likesCount: post.isLiked ? post.likesCount - 1 : post.likesCount + 1,
                };
            }
            return post;
        }));
    };

    const handleSave = (postId: string) => {
        setPosts(posts.map(post => {
            if (post.id === postId) {
                return { ...post, isSaved: !post.isSaved };
            }
            return post;
        }));
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-6">
            {/* Stories / Active Rides - Horizontal scroll */}
            <div className="mb-6">
                <h2 className="text-sm font-semibold text-muted-foreground mb-3">ACTIVE RIDES</h2>
                <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div
                            key={i}
                            className="shrink-0 w-20 flex flex-col items-center gap-2"
                        >
                            <div className="w-16 h-16 rounded-full bg-linear-to-br from-primary to-amber-500 p-0.5">
                                <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                                    <Avatar className="w-14 h-14">
                                        <AvatarFallback className="bg-muted text-muted-foreground">
                                            R{i}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                            </div>
                            <span className="text-xs text-center truncate w-full">Ride {i}</span>
                        </div>
                    ))}
                </div>
            </div>

            <Separator className="mb-6" />

            {/* Posts Feed */}
            <div className="space-y-6">
                {posts.map((post) => (
                    <Card key={post.id} className="overflow-hidden">
                        <CardContent className="p-4">
                            {/* Author Header */}
                            <div className="flex items-start justify-between mb-3">
                                <Link
                                    href={`/app/profile/${post.author.username}`}
                                    className="flex items-start gap-3"
                                >
                                    <Avatar className="w-10 h-10">
                                        <AvatarFallback className="bg-linear-to-br from-primary to-amber-500 text-white font-semibold">
                                            {post.author.name.split(" ").map(n => n[0]).join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-sm">{post.author.name}</span>
                                            {post.type === "club-activity" && (
                                                <Badge variant="secondary" className="text-[10px] px-1.5">Club</Badge>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <span>@{post.author.username}</span>
                                            <span>•</span>
                                            <span>{formatTimeAgo(post.createdAt)}</span>
                                        </div>
                                        {/* Club badges */}
                                        {post.author.clubs.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {post.author.clubs.slice(0, 2).map((club) => (
                                                    <Badge
                                                        key={club.id}
                                                        variant="outline"
                                                        className="text-[10px] px-1.5 py-0"
                                                    >
                                                        {club.name}
                                                    </Badge>
                                                ))}
                                                {post.author.clubs.length > 2 && (
                                                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                                        +{post.author.clubs.length - 2}
                                                    </Badge>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </Link>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="w-4 h-4" />
                                </Button>
                            </div>

                            {/* Content */}
                            <p className="text-sm mb-3 whitespace-pre-wrap">{post.content}</p>

                            {/* Image placeholder */}
                            {post.images && post.images.length === 0 && post.type === "content" && (
                                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-3">
                                    <ImageIcon className="w-12 h-12 text-muted-foreground/30" />
                                </div>
                            )}

                            {/* Ride Card */}
                            {post.type === "ride" && post.ride && (
                                <Link href={`/app/rides/${post.ride.id}`}>
                                    <div className="bg-linear-to-r from-primary/10 to-amber-100/50 rounded-xl p-4 mb-3 border border-primary/20">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-semibold text-sm">{post.ride.title}</h3>
                                                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        {formatDate(post.ride.scheduledAt)}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Users className="w-3 h-3" />
                                                        {post.ride.participantsCount} riders
                                                    </span>
                                                </div>
                                            </div>
                                            <Button size="sm" className="rounded-full">
                                                Join
                                            </Button>
                                        </div>
                                    </div>
                                </Link>
                            )}

                            {/* Listing Card */}
                            {post.type === "listing" && post.listing && (
                                <Link href={`/app/marketplace/${post.listing.id}`}>
                                    <div className="bg-muted rounded-xl p-4 mb-3">
                                        <div className="flex items-center gap-4">
                                            <div className="w-20 h-20 bg-background rounded-lg flex items-center justify-center">
                                                <ImageIcon className="w-8 h-8 text-muted-foreground/30" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-sm">{post.listing.title}</h3>
                                                <p className="text-lg font-bold text-primary">
                                                    ${post.listing.price.toLocaleString()}
                                                </p>
                                                {post.listing.isSold && (
                                                    <Badge variant="secondary">Sold</Badge>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )}

                            {/* Actions */}
                            <div className="flex items-center justify-between pt-2 border-t border-border">
                                <div className="flex items-center gap-1">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="gap-1.5 h-8"
                                        onClick={() => handleLike(post.id)}
                                    >
                                        <Heart
                                            className={`w-4 h-4 ${post.isLiked ? "fill-red-500 text-red-500" : ""}`}
                                        />
                                        <span className="text-xs">{post.likesCount}</span>
                                    </Button>
                                    <Button variant="ghost" size="sm" className="gap-1.5 h-8">
                                        <MessageCircle className="w-4 h-4" />
                                        <span className="text-xs">{post.commentsCount}</span>
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-8">
                                        <Share2 className="w-4 h-4" />
                                    </Button>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8"
                                    onClick={() => handleSave(post.id)}
                                >
                                    <Bookmark
                                        className={`w-4 h-4 ${post.isSaved ? "fill-foreground" : ""}`}
                                    />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Load More */}
            <div className="mt-8 text-center">
                <Button variant="outline" className="rounded-full">
                    Load More
                </Button>
            </div>
        </div>
    );
}
