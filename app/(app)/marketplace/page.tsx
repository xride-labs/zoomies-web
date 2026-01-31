"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MapPin,
  Star,
  Search,
  Filter,
  Plus,
  Image as ImageIcon
} from "lucide-react";
import Link from "next/link";

// Mock data
const categories = [
  { id: "all", label: "All" },
  { id: "parts", label: "Parts" },
  { id: "gear", label: "Gear" },
  { id: "accessories", label: "Accessories" },
  { id: "apparel", label: "Apparel" },
  { id: "bikes", label: "Bikes" },
];

const mockListings = [
  {
    id: "l1",
    title: "Shoei RF-1400 Helmet",
    price: 450,
    condition: "Like New",
    location: "Phoenix, AZ",
    category: "gear",
    images: [],
    seller: {
      id: "u1",
      name: "Mike Rodriguez",
      username: "roadking_mike",
      avatar: null,
      rating: 4.9,
      reviewsCount: 12,
      clubs: [{ id: "c1", name: "Desert Eagles MC" }],
    },
    createdAt: "2026-01-20T10:00:00Z",
  },
  {
    id: "l2",
    title: "Akrapovic Exhaust System - Honda CBR600RR",
    price: 1200,
    condition: "Used",
    location: "Tempe, AZ",
    category: "parts",
    images: [],
    seller: {
      id: "u2",
      name: "Sarah Chen",
      username: "sarah_twowheels",
      avatar: null,
      rating: 4.7,
      reviewsCount: 8,
      clubs: [{ id: "c2", name: "Bay Area Cruisers" }],
    },
    createdAt: "2026-01-19T14:30:00Z",
  },
  {
    id: "l3",
    title: "Alpinestars GP Pro Gloves - Size L",
    price: 180,
    condition: "New",
    location: "Scottsdale, AZ",
    category: "gear",
    images: [],
    seller: {
      id: "u3",
      name: "James Wilson",
      username: "jwilson_moto",
      avatar: null,
      rating: 5.0,
      reviewsCount: 23,
      clubs: [
        { id: "c3", name: "Texas Thunder" },
        { id: "c4", name: "Hill Country Riders" },
      ],
    },
    createdAt: "2026-01-18T09:15:00Z",
  },
  {
    id: "l4",
    title: "Ohlins TTX Rear Shock",
    price: 850,
    condition: "Excellent",
    location: "Mesa, AZ",
    category: "parts",
    images: [],
    seller: {
      id: "u4",
      name: "David Park",
      username: "dparkracing",
      avatar: null,
      rating: 4.8,
      reviewsCount: 15,
      clubs: [{ id: "c5", name: "Pacific Northwest MC" }],
    },
    createdAt: "2026-01-17T16:45:00Z",
  },
  {
    id: "l5",
    title: "Icon Airflite Helmet - Medium",
    price: 275,
    condition: "Good",
    location: "Chandler, AZ",
    category: "gear",
    images: [],
    seller: {
      id: "u5",
      name: "Alex Martinez",
      username: "alexrides",
      avatar: null,
      rating: 4.6,
      reviewsCount: 7,
      clubs: [],
    },
    createdAt: "2026-01-16T11:00:00Z",
  },
  {
    id: "l6",
    title: "Motorcycle Cover - XXL",
    price: 45,
    condition: "New",
    location: "Gilbert, AZ",
    category: "accessories",
    images: [],
    seller: {
      id: "u6",
      name: "Tom Johnson",
      username: "tomjmoto",
      avatar: null,
      rating: 4.9,
      reviewsCount: 31,
      clubs: [{ id: "c1", name: "Desert Eagles MC" }],
    },
    createdAt: "2026-01-15T08:30:00Z",
  },
];

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredListings = mockListings.filter((listing) => {
    const matchesCategory = activeCategory === "all" || listing.category === activeCategory;
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Search and Filter */}
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search marketplace..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-4 -mx-4 px-4 mb-4">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            onClick={() => setActiveCategory(category.id)}
            className="rounded-full whitespace-nowrap shrink-0"
            size="sm"
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground mb-4">
        {filteredListings.length} listings found
      </p>

      {/* Listings Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredListings.map((listing) => (
          <Link key={listing.id} href={`/app/marketplace/${listing.id}`}>
            <Card className="overflow-hidden hover:border-primary/50 transition-colors h-full">
              {/* Image placeholder */}
              <div className="aspect-square bg-muted flex items-center justify-center relative">
                <ImageIcon className="w-12 h-12 text-muted-foreground/30" />
                <Badge className="absolute top-2 left-2 bg-white/90 text-foreground border-0 shadow-sm text-[10px]">
                  {listing.condition}
                </Badge>
              </div>

              <CardContent className="p-3">
                <h3 className="font-medium text-sm line-clamp-2 mb-1 leading-tight">
                  {listing.title}
                </h3>

                <div className="text-lg font-bold text-primary mb-2">
                  ${listing.price.toLocaleString()}
                </div>

                {/* Seller info */}
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="w-5 h-5">
                    <AvatarFallback className="bg-linear-to-br from-primary to-amber-500 text-white text-[8px]">
                      {listing.seller.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground truncate">
                    {listing.seller.name}
                  </span>
                  <div className="flex items-center gap-0.5 ml-auto shrink-0">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-medium">{listing.seller.rating}</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  {listing.location}
                </div>

                {/* Club badges */}
                {listing.seller.clubs.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {listing.seller.clubs.slice(0, 1).map((club) => (
                      <Badge
                        key={club.id}
                        variant="secondary"
                        className="text-[9px] px-1.5 py-0"
                      >
                        {club.name}
                      </Badge>
                    ))}
                    {listing.seller.clubs.length > 1 && (
                      <Badge variant="secondary" className="text-[9px] px-1.5 py-0">
                        +{listing.seller.clubs.length - 1}
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Floating Create Button */}
      <Link href="/app/marketplace/create">
        <Button
          className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 rounded-full w-14 h-14 shadow-lg"
          size="icon"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </Link>
    </div>
  );
}
