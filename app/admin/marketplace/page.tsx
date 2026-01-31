"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Search,
    MoreHorizontal,
    Download,
    Eye,
    CheckCircle,
    XCircle,
    AlertTriangle,
    ShoppingBag,
    DollarSign,
    Package,
    Star,
} from "lucide-react";

// Mock listings data
const mockListings = [
    {
        id: "1",
        title: "Alpinestars SMX-1 R Riding Boots",
        description: "Premium riding boots in excellent condition",
        price: 450,
        currency: "USD",
        category: "Gear",
        subcategory: "Boots",
        condition: "Like New",
        status: "ACTIVE",
        images: [],
        seller: { id: "1", name: "Mike Rodriguez", username: "roadking_mike", rating: 4.9 },
        createdAt: "2026-01-20",
        views: 234,
        inquiries: 12,
    },
    {
        id: "2",
        title: "Akrapovic Exhaust System - Honda CBR600RR",
        description: "Full titanium exhaust system with slip-on",
        price: 1200,
        currency: "USD",
        category: "Parts",
        subcategory: "Exhaust",
        condition: "Used",
        status: "ACTIVE",
        images: [],
        seller: { id: "2", name: "Sarah Chen", username: "sarah_twowheels", rating: 4.7 },
        createdAt: "2026-01-18",
        views: 456,
        inquiries: 28,
    },
    {
        id: "3",
        title: "Shoei RF-1400 Helmet - Large",
        description: "Top of the line helmet, barely used",
        price: 550,
        currency: "USD",
        category: "Gear",
        subcategory: "Helmet",
        condition: "Excellent",
        status: "SOLD",
        images: [],
        seller: { id: "3", name: "Raj Patel", username: "raj_thunder", rating: 4.5 },
        createdAt: "2026-01-15",
        views: 789,
        inquiries: 45,
    },
    {
        id: "4",
        title: "2020 Yamaha R3 - Full Fairing Kit",
        description: "Complete OEM fairing kit in blue",
        price: 850,
        currency: "USD",
        category: "Parts",
        subcategory: "Fairings",
        condition: "Good",
        status: "ACTIVE",
        images: [],
        seller: { id: "4", name: "Sneha Reddy", username: "sneha_rides", rating: 4.8 },
        createdAt: "2026-01-22",
        views: 178,
        inquiries: 8,
    },
    {
        id: "5",
        title: "Suspicious Cheap Helmet",
        description: "Brand new helmet very cheap price",
        price: 25,
        currency: "USD",
        category: "Gear",
        subcategory: "Helmet",
        condition: "New",
        status: "FLAGGED",
        images: [],
        seller: { id: "5", name: "Unknown Seller", username: "newuser123", rating: 0 },
        createdAt: "2026-01-28",
        views: 12,
        inquiries: 0,
    },
    {
        id: "6",
        title: "Motorcycle Cover - XXL",
        description: "Heavy duty outdoor cover",
        price: 45,
        currency: "USD",
        category: "Accessories",
        subcategory: "Covers",
        condition: "New",
        status: "INACTIVE",
        images: [],
        seller: { id: "6", name: "Tom Johnson", username: "tomjmoto", rating: 4.9 },
        createdAt: "2026-01-10",
        views: 89,
        inquiries: 3,
    },
];

const statusColors = {
    ACTIVE: "bg-green-100 text-green-700",
    SOLD: "bg-blue-100 text-blue-700",
    INACTIVE: "bg-gray-100 text-gray-700",
    FLAGGED: "bg-red-100 text-red-700",
};

export default function AdminMarketplacePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [categoryFilter, setCategoryFilter] = useState<string>("all");
    const [selectedListing, setSelectedListing] = useState<typeof mockListings[0] | null>(null);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

    const filteredListings = mockListings.filter((listing) => {
        const matchesSearch =
            listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            listing.seller.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || listing.status === statusFilter;
        const matchesCategory = categoryFilter === "all" || listing.category === categoryFilter;
        return matchesSearch && matchesStatus && matchesCategory;
    });

    const stats = {
        total: mockListings.length,
        active: mockListings.filter((l) => l.status === "ACTIVE").length,
        sold: mockListings.filter((l) => l.status === "SOLD").length,
        flagged: mockListings.filter((l) => l.status === "FLAGGED").length,
        totalValue: mockListings
            .filter((l) => l.status === "ACTIVE")
            .reduce((sum, l) => sum + l.price, 0),
    };

    return (
        <div className="space-y-6">
            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-5">
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <ShoppingBag className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stats.total}</p>
                                <p className="text-sm text-muted-foreground">Total Listings</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                                <p className="text-sm text-muted-foreground">Active</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Package className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-blue-600">{stats.sold}</p>
                                <p className="text-sm text-muted-foreground">Sold</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <AlertTriangle className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-red-600">{stats.flagged}</p>
                                <p className="text-sm text-muted-foreground">Flagged</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-amber-100 rounded-lg">
                                <DollarSign className="w-5 h-5 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">${stats.totalValue.toLocaleString()}</p>
                                <p className="text-sm text-muted-foreground">Active Value</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Listings Table Card */}
            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <CardTitle>Marketplace Management</CardTitle>
                            <CardDescription>Monitor and moderate marketplace listings</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-2" />
                                Export
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* Filters */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search listings..."
                                className="pl-9"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-37.5">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="ACTIVE">Active</SelectItem>
                                <SelectItem value="SOLD">Sold</SelectItem>
                                <SelectItem value="INACTIVE">Inactive</SelectItem>
                                <SelectItem value="FLAGGED">Flagged</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger className="w-37.5">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                <SelectItem value="Gear">Gear</SelectItem>
                                <SelectItem value="Parts">Parts</SelectItem>
                                <SelectItem value="Accessories">Accessories</SelectItem>
                                <SelectItem value="Motorcycles">Motorcycles</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Table */}
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Listing</TableHead>
                                    <TableHead>Seller</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Views</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="w-12.5"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredListings.map((listing) => (
                                    <TableRow key={listing.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                                                    <ShoppingBag className="w-5 h-5 text-muted-foreground" />
                                                </div>
                                                <div>
                                                    <p className="font-medium line-clamp-1">{listing.title}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {listing.condition} • {listing.createdAt}
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-7 w-7">
                                                    <AvatarFallback className="text-xs">
                                                        {listing.seller.name.split(" ").map((n) => n[0]).join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="text-sm">@{listing.seller.username}</p>
                                                    {listing.seller.rating > 0 && (
                                                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                                                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                                            {listing.seller.rating}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <p className="font-medium">${listing.price}</p>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{listing.category}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-sm">
                                                <p>{listing.views} views</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {listing.inquiries} inquiries
                                                </p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                className={`gap-1 ${statusColors[listing.status as keyof typeof statusColors]}`}
                                            >
                                                {listing.status === "FLAGGED" && (
                                                    <AlertTriangle className="w-3 h-3" />
                                                )}
                                                {listing.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <MoreHorizontal className="w-4 h-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            setSelectedListing(listing);
                                                            setIsViewDialogOpen(true);
                                                        }}
                                                    >
                                                        <Eye className="w-4 h-4 mr-2" />
                                                        View Details
                                                    </DropdownMenuItem>
                                                    {listing.status === "FLAGGED" && (
                                                        <>
                                                            <DropdownMenuItem className="text-green-600">
                                                                <CheckCircle className="w-4 h-4 mr-2" />
                                                                Approve Listing
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="text-red-600">
                                                                <XCircle className="w-4 h-4 mr-2" />
                                                                Remove Listing
                                                            </DropdownMenuItem>
                                                        </>
                                                    )}
                                                    {listing.status === "ACTIVE" && (
                                                        <DropdownMenuItem className="text-red-600">
                                                            <AlertTriangle className="w-4 h-4 mr-2" />
                                                            Flag Listing
                                                        </DropdownMenuItem>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-4">
                        <p className="text-sm text-muted-foreground">
                            Showing {filteredListings.length} of {mockListings.length} listings
                        </p>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" disabled>
                                Previous
                            </Button>
                            <Button variant="outline" size="sm">
                                Next
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* View Listing Dialog */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Listing Details</DialogTitle>
                        <DialogDescription>Full listing information</DialogDescription>
                    </DialogHeader>
                    {selectedListing && (
                        <div className="space-y-4">
                            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                                <ShoppingBag className="w-12 h-12 text-muted-foreground" />
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-lg">{selectedListing.title}</h3>
                                    <Badge
                                        className={statusColors[selectedListing.status as keyof typeof statusColors]}
                                    >
                                        {selectedListing.status}
                                    </Badge>
                                </div>
                                <p className="text-2xl font-bold mt-1">${selectedListing.price}</p>
                                <p className="text-muted-foreground text-sm mt-2">
                                    {selectedListing.description}
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-muted-foreground">Category</p>
                                    <p className="font-medium">
                                        {selectedListing.category} / {selectedListing.subcategory}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Condition</p>
                                    <p className="font-medium">{selectedListing.condition}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Listed</p>
                                    <p className="font-medium">{selectedListing.createdAt}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Stats</p>
                                    <p className="font-medium">
                                        {selectedListing.views} views • {selectedListing.inquiries} inquiries
                                    </p>
                                </div>
                            </div>
                            <div className="p-3 bg-muted rounded-lg">
                                <p className="text-sm text-muted-foreground">Seller</p>
                                <div className="flex items-center justify-between mt-1">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback className="text-xs">
                                                {selectedListing.seller.name.split(" ").map((n) => n[0]).join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium text-sm">{selectedListing.seller.name}</p>
                                            <p className="text-xs text-muted-foreground">
                                                @{selectedListing.seller.username}
                                            </p>
                                        </div>
                                    </div>
                                    {selectedListing.seller.rating > 0 && (
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                            <span className="font-medium">{selectedListing.seller.rating}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                            Close
                        </Button>
                        {selectedListing?.status === "FLAGGED" && (
                            <>
                                <Button variant="destructive">Remove Listing</Button>
                                <Button className="bg-green-600 hover:bg-green-700">Approve</Button>
                            </>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
