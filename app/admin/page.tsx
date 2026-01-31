"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
    Users,
    Shield,
    MapPin,
    ShoppingBag,
    TrendingUp,
    TrendingDown,
    Activity,
    DollarSign,
    UserPlus,
    AlertTriangle,
    ArrowUpRight,
    MoreHorizontal,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Mock data for dashboard
const stats = [
    {
        title: "Total Users",
        value: "12,456",
        change: "+12.5%",
        trend: "up",
        icon: Users,
        color: "text-blue-600",
        bgColor: "bg-blue-100",
    },
    {
        title: "Active Clubs",
        value: "342",
        change: "+8.2%",
        trend: "up",
        icon: Shield,
        color: "text-purple-600",
        bgColor: "bg-purple-100",
    },
    {
        title: "Rides This Month",
        value: "1,847",
        change: "+23.1%",
        trend: "up",
        icon: MapPin,
        color: "text-green-600",
        bgColor: "bg-green-100",
    },
    {
        title: "Marketplace Sales",
        value: "₹4.2L",
        change: "-2.4%",
        trend: "down",
        icon: DollarSign,
        color: "text-amber-600",
        bgColor: "bg-amber-100",
    },
];

const recentUsers = [
    { id: "1", name: "Rahul Sharma", email: "rahul@email.com", role: "RIDER", joinedAt: "2 hours ago", status: "active" },
    { id: "2", name: "Priya Patel", email: "priya@email.com", role: "USER", joinedAt: "5 hours ago", status: "active" },
    { id: "3", name: "Amit Kumar", email: "amit@email.com", role: "SELLER", joinedAt: "1 day ago", status: "pending" },
    { id: "4", name: "Sneha Reddy", email: "sneha@email.com", role: "RIDER", joinedAt: "2 days ago", status: "active" },
    { id: "5", name: "Vikram Singh", email: "vikram@email.com", role: "USER", joinedAt: "3 days ago", status: "suspended" },
];

const pendingReports = [
    { id: "1", type: "Club Verification", title: "Thunder Riders MC", priority: "high", createdAt: "1 hour ago" },
    { id: "2", type: "User Report", title: "Spam content reported", priority: "medium", createdAt: "3 hours ago" },
    { id: "3", type: "Listing Report", title: "Suspicious listing flagged", priority: "high", createdAt: "5 hours ago" },
    { id: "4", type: "Club Verification", title: "Highway Kings", priority: "low", createdAt: "1 day ago" },
];

const activityData = [
    { day: "Mon", users: 45, rides: 23, sales: 12 },
    { day: "Tue", users: 52, rides: 31, sales: 18 },
    { day: "Wed", users: 49, rides: 28, sales: 15 },
    { day: "Thu", users: 63, rides: 42, sales: 24 },
    { day: "Fri", users: 78, rides: 56, sales: 32 },
    { day: "Sat", users: 92, rides: 71, sales: 45 },
    { day: "Sun", users: 88, rides: 65, sales: 38 },
];

export default function AdminDashboardPage() {
    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                </div>
                                <Badge
                                    variant={stat.trend === "up" ? "default" : "destructive"}
                                    className="gap-1"
                                >
                                    {stat.trend === "up" ? (
                                        <TrendingUp className="w-3 h-3" />
                                    ) : (
                                        <TrendingDown className="w-3 h-3" />
                                    )}
                                    {stat.change}
                                </Badge>
                            </div>
                            <div className="mt-4">
                                <p className="text-2xl font-bold">{stat.value}</p>
                                <p className="text-sm text-muted-foreground">{stat.title}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Weekly Activity Chart */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Weekly Activity</CardTitle>
                                <CardDescription>User registrations, rides, and sales</CardDescription>
                            </div>
                            <Button variant="outline" size="sm">
                                View Report
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {activityData.map((day) => (
                                <div key={day.day} className="flex items-center gap-4">
                                    <span className="w-8 text-sm text-muted-foreground">{day.day}</span>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="h-2 bg-blue-500 rounded-full"
                                                style={{ width: `${day.users}%` }}
                                            />
                                            <span className="text-xs text-muted-foreground">{day.users}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="h-2 bg-green-500 rounded-full"
                                                style={{ width: `${day.rides}%` }}
                                            />
                                            <span className="text-xs text-muted-foreground">{day.rides}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="h-2 bg-amber-500 rounded-full"
                                                style={{ width: `${day.sales}%` }}
                                            />
                                            <span className="text-xs text-muted-foreground">{day.sales}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-6 mt-4 pt-4 border-t">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                                <span className="text-xs text-muted-foreground">Users</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full" />
                                <span className="text-xs text-muted-foreground">Rides</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-amber-500 rounded-full" />
                                <span className="text-xs text-muted-foreground">Sales</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Pending Reports */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                                    Pending Reports
                                </CardTitle>
                                <CardDescription>Items requiring your attention</CardDescription>
                            </div>
                            <Button variant="outline" size="sm">
                                View All
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {pendingReports.map((report) => (
                                <div
                                    key={report.id}
                                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                                >
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <Badge
                                                variant={
                                                    report.priority === "high"
                                                        ? "destructive"
                                                        : report.priority === "medium"
                                                            ? "default"
                                                            : "secondary"
                                                }
                                                className="text-[10px]"
                                            >
                                                {report.priority}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground">
                                                {report.type}
                                            </span>
                                        </div>
                                        <p className="text-sm font-medium">{report.title}</p>
                                        <p className="text-xs text-muted-foreground">{report.createdAt}</p>
                                    </div>
                                    <Button variant="ghost" size="sm">
                                        <ArrowUpRight className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Users Table */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <UserPlus className="w-5 h-5 text-blue-500" />
                                Recent Users
                            </CardTitle>
                            <CardDescription>Newly registered users</CardDescription>
                        </div>
                        <Button variant="outline" size="sm">
                            View All Users
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Joined</TableHead>
                                <TableHead className="w-12.5"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarFallback className="text-xs">
                                                    {user.name.split(" ").map(n => n[0]).join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium text-sm">{user.name}</p>
                                                <p className="text-xs text-muted-foreground">{user.email}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{user.role}</Badge>
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
                                        >
                                            {user.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-sm">
                                        {user.joinedAt}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                                <DropdownMenuItem>Edit User</DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600">
                                                    Suspend User
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Server Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <Activity className="w-4 h-4 text-green-500" />
                            <span className="text-sm">All systems operational</span>
                        </div>
                        <div className="mt-3 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">API Response</span>
                                <span>124ms</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Uptime</span>
                                <span>99.9%</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Storage Usage</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Used</span>
                                <span>45.2 GB / 100 GB</span>
                            </div>
                            <Progress value={45} className="h-2" />
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                            <div>
                                <span className="text-muted-foreground">Images</span>
                                <p className="font-medium">32.1 GB</p>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Database</span>
                                <p className="font-medium">13.1 GB</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">1,247</p>
                        <p className="text-sm text-muted-foreground">Users online right now</p>
                        <div className="mt-3 flex items-center gap-2">
                            <Badge variant="outline" className="gap-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                Live
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                                Peak today: 2,341
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
