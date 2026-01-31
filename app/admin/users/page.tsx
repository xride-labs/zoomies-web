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
    UserPlus,
    Download,
    Filter,
    Mail,
    Shield,
    Ban,
    CheckCircle,
    XCircle,
    Eye,
} from "lucide-react";
import { UserRole } from "@/types";

// Mock users data
const mockUsers = [
    {
        id: "1",
        name: "Rahul Sharma",
        username: "rahul_rider",
        email: "rahul@email.com",
        phone: "+91 98765 43210",
        role: "RIDER" as UserRole,
        status: "active",
        ridesCompleted: 47,
        xpPoints: 2340,
        joinedAt: "2025-06-15",
        lastActive: "2 hours ago",
    },
    {
        id: "2",
        name: "Priya Patel",
        username: "priya_wheels",
        email: "priya@email.com",
        phone: "+91 98765 43211",
        role: "USER" as UserRole,
        status: "active",
        ridesCompleted: 12,
        xpPoints: 560,
        joinedAt: "2025-08-22",
        lastActive: "5 hours ago",
    },
    {
        id: "3",
        name: "Amit Kumar",
        username: "amit_moto",
        email: "amit@email.com",
        phone: "+91 98765 43212",
        role: "SELLER" as UserRole,
        status: "pending",
        ridesCompleted: 0,
        xpPoints: 100,
        joinedAt: "2026-01-28",
        lastActive: "1 day ago",
    },
    {
        id: "4",
        name: "Sneha Reddy",
        username: "sneha_rides",
        email: "sneha@email.com",
        phone: "+91 98765 43213",
        role: "RIDER" as UserRole,
        status: "active",
        ridesCompleted: 89,
        xpPoints: 4520,
        joinedAt: "2024-12-01",
        lastActive: "Just now",
    },
    {
        id: "5",
        name: "Vikram Singh",
        username: "vikram_speed",
        email: "vikram@email.com",
        phone: "+91 98765 43214",
        role: "USER" as UserRole,
        status: "suspended",
        ridesCompleted: 5,
        xpPoints: 200,
        joinedAt: "2025-10-10",
        lastActive: "1 week ago",
    },
    {
        id: "6",
        name: "Meera Nair",
        username: "meera_cruiser",
        email: "meera@email.com",
        phone: "+91 98765 43215",
        role: "ADMIN" as UserRole,
        status: "active",
        ridesCompleted: 156,
        xpPoints: 8900,
        joinedAt: "2024-03-15",
        lastActive: "10 minutes ago",
    },
];

export default function AdminUsersPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState<string>("all");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const filteredUsers = mockUsers.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.username.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === "all" || user.role === roleFilter;
        const matchesStatus = statusFilter === "all" || user.status === statusFilter;
        return matchesSearch && matchesRole && matchesStatus;
    });

    const stats = {
        total: mockUsers.length,
        active: mockUsers.filter((u) => u.status === "active").length,
        pending: mockUsers.filter((u) => u.status === "pending").length,
        suspended: mockUsers.filter((u) => u.status === "suspended").length,
    };

    return (
        <div className="space-y-6">
            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardContent className="p-4">
                        <p className="text-2xl font-bold">{stats.total}</p>
                        <p className="text-sm text-muted-foreground">Total Users</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                        <p className="text-sm text-muted-foreground">Active</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
                        <p className="text-sm text-muted-foreground">Pending Verification</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-2xl font-bold text-red-600">{stats.suspended}</p>
                        <p className="text-sm text-muted-foreground">Suspended</p>
                    </CardContent>
                </Card>
            </div>

            {/* Users Table Card */}
            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <CardTitle>User Management</CardTitle>
                            <CardDescription>Manage and monitor all user accounts</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-2" />
                                Export
                            </Button>
                            <Button size="sm">
                                <UserPlus className="w-4 h-4 mr-2" />
                                Add User
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
                                placeholder="Search users..."
                                className="pl-9"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Select value={roleFilter} onValueChange={setRoleFilter}>
                            <SelectTrigger className="w-37.5">
                                <SelectValue placeholder="Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Roles</SelectItem>
                                <SelectItem value="ADMIN">Admin</SelectItem>
                                <SelectItem value="RIDER">Rider</SelectItem>
                                <SelectItem value="SELLER">Seller</SelectItem>
                                <SelectItem value="USER">User</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-37.5">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="suspended">Suspended</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Table */}
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Rides</TableHead>
                                    <TableHead>XP</TableHead>
                                    <TableHead>Last Active</TableHead>
                                    <TableHead className="w-12.5"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9">
                                                    <AvatarFallback className="text-xs">
                                                        {user.name.split(" ").map((n) => n[0]).join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium">{user.name}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        @{user.username}
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={user.role === "ADMIN" ? "destructive" : "outline"}
                                            >
                                                {user.role}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    user.status === "active"
                                                        ? "default"
                                                        : user.status === "pending"
                                                            ? "secondary"
                                                            : "destructive"
                                                }
                                                className="gap-1"
                                            >
                                                {user.status === "active" && (
                                                    <CheckCircle className="w-3 h-3" />
                                                )}
                                                {user.status === "suspended" && (
                                                    <XCircle className="w-3 h-3" />
                                                )}
                                                {user.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{user.ridesCompleted}</TableCell>
                                        <TableCell>{user.xpPoints.toLocaleString()}</TableCell>
                                        <TableCell className="text-muted-foreground text-sm">
                                            {user.lastActive}
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
                                                            setSelectedUser(user);
                                                            setIsViewDialogOpen(true);
                                                        }}
                                                    >
                                                        <Eye className="w-4 h-4 mr-2" />
                                                        View Profile
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            setSelectedUser(user);
                                                            setIsEditDialogOpen(true);
                                                        }}
                                                    >
                                                        <Shield className="w-4 h-4 mr-2" />
                                                        Change Role
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Mail className="w-4 h-4 mr-2" />
                                                        Send Email
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    {user.status === "suspended" ? (
                                                        <DropdownMenuItem className="text-green-600">
                                                            <CheckCircle className="w-4 h-4 mr-2" />
                                                            Activate User
                                                        </DropdownMenuItem>
                                                    ) : (
                                                        <DropdownMenuItem className="text-red-600">
                                                            <Ban className="w-4 h-4 mr-2" />
                                                            Suspend User
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

                    {/* Pagination placeholder */}
                    <div className="flex items-center justify-between mt-4">
                        <p className="text-sm text-muted-foreground">
                            Showing {filteredUsers.length} of {mockUsers.length} users
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

            {/* View User Dialog */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>User Profile</DialogTitle>
                        <DialogDescription>Detailed user information</DialogDescription>
                    </DialogHeader>
                    {selectedUser && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-16 w-16">
                                    <AvatarFallback className="text-lg">
                                        {selectedUser.name.split(" ").map((n) => n[0]).join("")}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-semibold text-lg">{selectedUser.name}</h3>
                                    <p className="text-muted-foreground">@{selectedUser.username}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-muted-foreground">Email</p>
                                    <p className="font-medium">{selectedUser.email}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Phone</p>
                                    <p className="font-medium">{selectedUser.phone}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Role</p>
                                    <Badge variant="outline">{selectedUser.role}</Badge>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Status</p>
                                    <Badge
                                        variant={
                                            selectedUser.status === "active" ? "default" : "destructive"
                                        }
                                    >
                                        {selectedUser.status}
                                    </Badge>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Rides Completed</p>
                                    <p className="font-medium">{selectedUser.ridesCompleted}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">XP Points</p>
                                    <p className="font-medium">{selectedUser.xpPoints.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Joined</p>
                                    <p className="font-medium">{selectedUser.joinedAt}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Last Active</p>
                                    <p className="font-medium">{selectedUser.lastActive}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                            Close
                        </Button>
                        <Button>Edit User</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Role Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Change User Role</DialogTitle>
                        <DialogDescription>
                            Update the role for {selectedUser?.name}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <Select defaultValue={selectedUser?.role}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="USER">User</SelectItem>
                                <SelectItem value="RIDER">Rider</SelectItem>
                                <SelectItem value="SELLER">Seller</SelectItem>
                                <SelectItem value="ADMIN">Admin</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={() => setIsEditDialogOpen(false)}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
