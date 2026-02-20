"use client";

import { useState, useEffect } from "react";
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
    Image as ImageIcon,
    Loader2
} from "lucide-react";
import Link from "next/link";
import { feedApi } from "@/lib/services";

interface FeedPost {
    id: string;
    type: "ride" | "content" | "listing" | "club-activity";
    author: {
        id: string;
        name: string;
        username: string;
        avatar: string | null;
        clubs: Array<{ id: string; name: string; avatar: string | null }>;
    };
    content: string;
    images: string[];
    ride?: {
        id: string;
        title: string;
        scheduledAt: string;
        participantsCount: number;
    };
    listing?: {
        id: string;
        title: string;
        price: number;
        currency: string;
        isSold: boolean;
    };
    club?: {
        id: string;
        name: string;
        avatar: string | null;
    };
    likesCount: number;
    commentsCount: number;
    isLiked: boolean;
    isSaved: boolean;
    createdAt: string;
}

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
    const [posts, setPosts] = useState<FeedPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchFeed();
    }, []);

    const fetchFeed = async () => {
        try {
            setLoading(true);
            const response = await feedApi.getFeed();
            setPosts(response.posts || []);
        } catch (err) {
            setError("Failed to load feed");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

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
                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                    </div>
                ) : error ? (
                    <div className="text-center py-12">
                        <p className="text-destructive mb-4">{error}</p>
                        <Button onClick={fetchFeed} variant="outline">Retry</Button>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                        <p>No posts yet. Follow some clubs or riders to see their updates!</p>
                    </div>
                ) : posts.map((post) => (
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
