"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    AlertTriangle,
    Flag,
    MessageSquare,
    User,
    ShoppingBag,
    Shield,
    MoreHorizontal,
    CheckCircle,
    XCircle,
    Eye,
    Clock,
    Loader2,
} from "lucide-react";
import { adminApi } from "@/lib/services";

interface AdminReport {
    id: string;
    type: string;
    title: string;
    description?: string;
    reportedItem: { id: string; name: string; type: string };
    reporter: { id: string; name: string };
    status: string;
    priority: string;
    createdAt: string;
}

const typeIcons: Record<string, any> = {
    user: User,
    listing: ShoppingBag,
    club: Shield,
    message: MessageSquare,
};

const statusColors: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700",
    investigating: "bg-blue-100 text-blue-700",
    resolved: "bg-green-100 text-green-700",
    dismissed: "bg-gray-100 text-gray-700",
};

const priorityColors: Record<string, string> = {
    high: "bg-red-100 text-red-700",
    medium: "bg-amber-100 text-amber-700",
    low: "bg-gray-100 text-gray-700",
};

export default function AdminReportsPage() {
    const [reports, setReports] = useState<AdminReport[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState("all");

    useEffect(() => {
        fetchReports();
    }, [activeTab]);

    const fetchReports = async () => {
        try {
            setLoading(true);
            setError(null);
            const params: Record<string, string> = {};
            if (activeTab !== "all") params.status = activeTab;

            const response = await adminApi.getReports(params);
            setReports(response.items || []);
        } catch (err) {
            setError("Failed to load reports");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const stats = {
        total: reports.length,
        pending: reports.filter((r) => r.status === "pending").length,
        investigating: reports.filter((r) => r.status === "investigating").length,
        resolved: reports.filter((r) => r.status === "resolved").length,
    };

    const filteredReports = activeTab === "all"
        ? reports
        : reports.filter((r) => r.status === activeTab);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="space-y-6">
            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <Flag className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stats.total}</p>
                                <p className="text-sm text-muted-foreground">Total Reports</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-amber-100 rounded-lg">
                                <Clock className="w-5 h-5 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
                                <p className="text-sm text-muted-foreground">Pending</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Eye className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-blue-600">{stats.investigating}</p>
                                <p className="text-sm text-muted-foreground">Investigating</p>
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
                                <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
                                <p className="text-sm text-muted-foreground">Resolved</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Reports Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Reports & Moderation</CardTitle>
                    <CardDescription>Review and handle user reports</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
                        <TabsList>
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="pending">
                                Pending
                                <Badge variant="secondary" className="ml-2">
                                    {stats.pending}
                                </Badge>
                            </TabsTrigger>
                            <TabsTrigger value="investigating">Investigating</TabsTrigger>
                            <TabsTrigger value="resolved">Resolved</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Report</TableHead>
                                    <TableHead>Reported Item</TableHead>
                                    <TableHead>Reporter</TableHead>
                                    <TableHead>Priority</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="w-12.5"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredReports.map((report) => {
                                    const TypeIcon = typeIcons[report.type as keyof typeof typeIcons];
                                    return (
                                        <TableRow key={report.id}>
                                            <TableCell>
                                                <div className="flex items-start gap-3">
                                                    <div className="p-2 bg-muted rounded-lg">
                                                        <TypeIcon className="w-4 h-4 text-muted-foreground" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">{report.title}</p>
                                                        <p className="text-xs text-muted-foreground line-clamp-1">
                                                            {report.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <p className="text-sm">{report.reportedItem.name}</p>
                                                    <Badge variant="outline" className="text-[10px]">
                                                        {report.reportedItem.type}
                                                    </Badge>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="h-6 w-6">
                                                        <AvatarFallback className="text-[10px]">
                                                            {report.reporter.name.split(" ").map((n) => n[0]).join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-sm">{report.reporter.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={priorityColors[report.priority as keyof typeof priorityColors]}>
                                                    {report.priority}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={statusColors[report.status as keyof typeof statusColors]}>
                                                    {report.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {formatDate(report.createdAt)}
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <MoreHorizontal className="w-4 h-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>
                                                            <Eye className="w-4 h-4 mr-2" />
                                                            View Details
                                                        </DropdownMenuItem>
                                                        {report.status === "pending" && (
                                                            <DropdownMenuItem>
                                                                <AlertTriangle className="w-4 h-4 mr-2" />
                                                                Start Investigation
                                                            </DropdownMenuItem>
                                                        )}
                                                        <DropdownMenuItem className="text-green-600">
                                                            <CheckCircle className="w-4 h-4 mr-2" />
                                                            Mark Resolved
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-gray-600">
                                                            <XCircle className="w-4 h-4 mr-2" />
                                                            Dismiss
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
