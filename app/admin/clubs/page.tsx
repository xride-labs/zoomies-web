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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Search,
    MoreHorizontal,
    Download,
    CheckCircle,
    XCircle,
    Eye,
    Shield,
    ShieldCheck,
    ShieldX,
    Users,
    MapPin,
    Calendar,
    Trophy,
} from "lucide-react";

// Mock clubs data
const mockClubs = [
    {
        id: "1",
        name: "Desert Eagles MC",
        description: "Brotherhood of riders exploring the Arizona desert roads.",
        location: "Phoenix, AZ",
        memberCount: 128,
        ridesCount: 45,
        verified: true,
        isPublic: true,
        owner: { id: "1", name: "Mike Rodriguez", username: "roadking_mike" },
        reputation: 4.8,
        establishedAt: "2023-06-15",
        status: "active",
    },
    {
        id: "2",
        name: "Phoenix Riders",
        description: "Casual weekend riders. All skill levels welcome.",
        location: "Phoenix, AZ",
        memberCount: 67,
        ridesCount: 23,
        verified: true,
        isPublic: true,
        owner: { id: "2", name: "Sarah Chen", username: "sarah_twowheels" },
        reputation: 4.5,
        establishedAt: "2024-01-20",
        status: "active",
    },
    {
        id: "3",
        name: "Thunder Riders MC",
        description: "Speed enthusiasts and track day lovers.",
        location: "Tempe, AZ",
        memberCount: 42,
        ridesCount: 18,
        verified: false,
        isPublic: true,
        owner: { id: "3", name: "Raj Patel", username: "raj_thunder" },
        reputation: 4.2,
        establishedAt: "2025-08-10",
        status: "pending",
    },
    {
        id: "4",
        name: "Night Riders AZ",
        description: "City lights and cool evening rides through the valley.",
        location: "Scottsdale, AZ",
        memberCount: 89,
        ridesCount: 34,
        verified: true,
        isPublic: false,
        owner: { id: "4", name: "Sneha Reddy", username: "sneha_rides" },
        reputation: 4.7,
        establishedAt: "2024-05-22",
        status: "active",
    },
    {
        id: "5",
        name: "Highway Kings",
        description: "Long distance touring club for adventure seekers.",
        location: "Flagstaff, AZ",
        memberCount: 156,
        ridesCount: 67,
        verified: false,
        isPublic: true,
        owner: { id: "5", name: "Vikram Singh", username: "vikram_speed" },
        reputation: 4.3,
        establishedAt: "2025-11-05",
        status: "pending",
    },
];

export default function AdminClubsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [verifiedFilter, setVerifiedFilter] = useState<string>("all");
    const [selectedClub, setSelectedClub] = useState<typeof mockClubs[0] | null>(null);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false);

    const filteredClubs = mockClubs.filter((club) => {
        const matchesSearch =
            club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            club.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || club.status === statusFilter;
        const matchesVerified =
            verifiedFilter === "all" ||
            (verifiedFilter === "verified" && club.verified) ||
            (verifiedFilter === "unverified" && !club.verified);
        return matchesSearch && matchesStatus && matchesVerified;
    });

    const stats = {
        total: mockClubs.length,
        verified: mockClubs.filter((c) => c.verified).length,
        pending: mockClubs.filter((c) => c.status === "pending").length,
        totalMembers: mockClubs.reduce((sum, c) => sum + c.memberCount, 0),
    };

    return (
        <div className="space-y-6">
            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <Shield className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stats.total}</p>
                                <p className="text-sm text-muted-foreground">Total Clubs</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <ShieldCheck className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-green-600">{stats.verified}</p>
                                <p className="text-sm text-muted-foreground">Verified</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-amber-100 rounded-lg">
                                <ShieldX className="w-5 h-5 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
                                <p className="text-sm text-muted-foreground">Pending Verification</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Users className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stats.totalMembers}</p>
                                <p className="text-sm text-muted-foreground">Total Members</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Clubs Table Card */}
            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <CardTitle>Club Management</CardTitle>
                            <CardDescription>Manage and verify riding clubs</CardDescription>
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
                    {/* Tabs for different views */}
                    <Tabs defaultValue="all" className="mb-6">
                        <TabsList>
                            <TabsTrigger value="all">All Clubs</TabsTrigger>
                            <TabsTrigger value="pending">
                                Pending Verification
                                <Badge variant="secondary" className="ml-2">
                                    {stats.pending}
                                </Badge>
                            </TabsTrigger>
                            <TabsTrigger value="verified">Verified</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    {/* Filters */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search clubs..."
                                className="pl-9"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="suspended">Suspended</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={verifiedFilter} onValueChange={setVerifiedFilter}>
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="Verification" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="verified">Verified</SelectItem>
                                <SelectItem value="unverified">Unverified</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Table */}
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Club</TableHead>
                                    <TableHead>Owner</TableHead>
                                    <TableHead>Members</TableHead>
                                    <TableHead>Rides</TableHead>
                                    <TableHead>Verified</TableHead>
                                    <TableHead>Rating</TableHead>
                                    <TableHead className="w-[50px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredClubs.map((club) => (
                                    <TableRow key={club.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarFallback className="bg-purple-100 text-purple-600">
                                                        {club.name.substring(0, 2).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-medium">{club.name}</p>
                                                        {!club.isPublic && (
                                                            <Badge variant="outline" className="text-[10px]">
                                                                Private
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                                                        <MapPin className="w-3 h-3" />
                                                        {club.location}
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <p className="text-sm">{club.owner.name}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    @{club.owner.username}
                                                </p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <Users className="w-4 h-4 text-muted-foreground" />
                                                {club.memberCount}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4 text-muted-foreground" />
                                                {club.ridesCount}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {club.verified ? (
                                                <Badge className="gap-1 bg-green-100 text-green-700 hover:bg-green-100">
                                                    <CheckCircle className="w-3 h-3" />
                                                    Verified
                                                </Badge>
                                            ) : (
                                                <Badge variant="secondary" className="gap-1">
                                                    <XCircle className="w-3 h-3" />
                                                    Unverified
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <span className="text-amber-500">★</span>
                                                {club.reputation}
                                            </div>
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
                                                            setSelectedClub(club);
                                                            setIsViewDialogOpen(true);
                                                        }}
                                                    >
                                                        <Eye className="w-4 h-4 mr-2" />
                                                        View Details
                                                    </DropdownMenuItem>
                                                    {!club.verified && (
                                                        <DropdownMenuItem
                                                            onClick={() => {
                                                                setSelectedClub(club);
                                                                setIsVerifyDialogOpen(true);
                                                            }}
                                                            className="text-green-600"
                                                        >
                                                            <ShieldCheck className="w-4 h-4 mr-2" />
                                                            Verify Club
                                                        </DropdownMenuItem>
                                                    )}
                                                    <DropdownMenuItem>
                                                        <Users className="w-4 h-4 mr-2" />
                                                        View Members
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-red-600">
                                                        <XCircle className="w-4 h-4 mr-2" />
                                                        Suspend Club
                                                    </DropdownMenuItem>
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
                            Showing {filteredClubs.length} of {mockClubs.length} clubs
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

            {/* View Club Dialog */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Club Details</DialogTitle>
                        <DialogDescription>Detailed club information</DialogDescription>
                    </DialogHeader>
                    {selectedClub && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-16 w-16">
                                    <AvatarFallback className="bg-purple-100 text-purple-600 text-lg">
                                        {selectedClub.name.substring(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-lg">{selectedClub.name}</h3>
                                        {selectedClub.verified && (
                                            <Badge className="bg-green-100 text-green-700">Verified</Badge>
                                        )}
                                    </div>
                                    <p className="text-muted-foreground text-sm">{selectedClub.description}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-muted-foreground">Location</p>
                                        <p className="font-medium">{selectedClub.location}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-muted-foreground">Established</p>
                                        <p className="font-medium">{selectedClub.establishedAt}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-muted-foreground">Members</p>
                                        <p className="font-medium">{selectedClub.memberCount}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Trophy className="w-4 h-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-muted-foreground">Rides Completed</p>
                                        <p className="font-medium">{selectedClub.ridesCount}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-3 bg-muted rounded-lg">
                                <p className="text-sm text-muted-foreground">Owner</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback className="text-xs">
                                            {selectedClub.owner.name.split(" ").map((n) => n[0]).join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium text-sm">{selectedClub.owner.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            @{selectedClub.owner.username}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                            Close
                        </Button>
                        {selectedClub && !selectedClub.verified && (
                            <Button
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => {
                                    setIsViewDialogOpen(false);
                                    setIsVerifyDialogOpen(true);
                                }}
                            >
                                Verify Club
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Verify Club Dialog */}
            <Dialog open={isVerifyDialogOpen} onOpenChange={setIsVerifyDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Verify Club</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to verify {selectedClub?.name}? This will give them a verified badge.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsVerifyDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => setIsVerifyDialogOpen(false)}
                        >
                            <ShieldCheck className="w-4 h-4 mr-2" />
                            Verify Club
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
