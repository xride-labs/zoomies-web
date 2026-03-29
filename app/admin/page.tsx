'use client'

import { useEffect, useMemo } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
    Activity,
    AlertTriangle,
    Loader2,
    MapPin,
    Shield,
    ShoppingBag,
    TrendingUp,
    UserPlus,
    Users,
} from 'lucide-react'
import {
    Bar,
    CartesianGrid,
    ComposedChart,
    Legend,
    Line,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    Cell,
} from 'recharts'
import { useAdminDashboard } from '@/store/features/admin'

const PIE_COLORS = ['#2563eb', '#16a34a', '#d97706', '#dc2626', '#7c3aed', '#0891b2']

export default function AdminDashboardPage() {
    const {
        stats,
        weeklyActivity,
        recentUsers,
        pendingReports,
        isLoading,
        error,
        fetchStats,
        fetchWeeklyActivity,
        fetchRecentUsers,
        fetchPendingReports,
    } = useAdminDashboard()

    useEffect(() => {
        fetchStats()
        fetchWeeklyActivity(7)
        fetchRecentUsers()
        fetchPendingReports()
    }, [fetchStats, fetchWeeklyActivity, fetchRecentUsers, fetchPendingReports])

    const roleBreakdown = useMemo(() => {
        if (!stats) return []
        return Object.entries(stats.breakdown.usersByRole).map(([name, value]) => ({
            name,
            value,
        }))
    }, [stats])

    const summaryCards = useMemo(() => {
        if (!stats) return []
        return [
            {
                title: 'Total Users',
                value: stats.overview.totalUsers.toLocaleString(),
                helper: `+${stats.recent.newUsersLast7Days} in last 7 days`,
                icon: Users,
            },
            {
                title: 'Clubs',
                value: stats.overview.totalClubs.toLocaleString(),
                helper: `${stats.overview.verifiedClubs} verified`,
                icon: Shield,
            },
            {
                title: 'Rides',
                value: stats.overview.totalRides.toLocaleString(),
                helper: `+${stats.recent.newRidesLast7Days} this week`,
                icon: MapPin,
            },
            {
                title: 'Listings',
                value: stats.overview.totalListings.toLocaleString(),
                helper: `${stats.overview.activeRides} rides in progress`,
                icon: ShoppingBag,
            },
            {
                title: 'Pending Reports',
                value: stats.overview.pendingReports.toLocaleString(),
                helper: `${stats.overview.highPriorityReports} high priority`,
                icon: AlertTriangle,
            },
            {
                title: 'New Reports',
                value: stats.recent.reportsLast7Days.toLocaleString(),
                helper: 'last 7 days',
                icon: Activity,
            },
        ]
    }, [stats])

    if (isLoading && !stats) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        )
    }

    if (error && !stats) {
        return (
            <div className="text-center py-8 text-destructive">
                {error}
                <Button
                    onClick={() => {
                        fetchStats()
                        fetchWeeklyActivity(7)
                        fetchRecentUsers()
                        fetchPendingReports()
                    }}
                    className="ml-4"
                >
                    Retry
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {summaryCards.map((card) => (
                    <Card key={card.title}>
                        <CardContent className="p-5">
                            <div className="flex items-center justify-between">
                                <div className="p-2 rounded-lg bg-muted">
                                    <card.icon className="w-5 h-5" />
                                </div>
                                <Badge variant="secondary" className="gap-1">
                                    <TrendingUp className="w-3 h-3" />
                                    Live
                                </Badge>
                            </div>
                            <div className="mt-4">
                                <p className="text-2xl font-bold">{card.value}</p>
                                <p className="text-sm text-muted-foreground">{card.title}</p>
                                <p className="text-xs text-muted-foreground mt-1">{card.helper}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Weekly Platform Activity</CardTitle>
                        <CardDescription>Registrations, rides, clubs, and moderation inflow</CardDescription>
                    </CardHeader>
                    <CardContent className="h-82.5">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={weeklyActivity}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="label" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="usersRegistered" fill="#2563eb" name="Users" radius={[6, 6, 0, 0]} />
                                <Bar dataKey="ridesCreated" fill="#16a34a" name="Rides" radius={[6, 6, 0, 0]} />
                                <Line type="monotone" dataKey="clubsCreated" stroke="#d97706" strokeWidth={2} name="Clubs" />
                                <Line type="monotone" dataKey="reportsCreated" stroke="#dc2626" strokeWidth={2} name="Reports" />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>User Roles Distribution</CardTitle>
                        <CardDescription>Breakdown across admin and community roles</CardDescription>
                    </CardHeader>
                    <CardContent className="h-82.5">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={roleBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                                    {roleBreakdown.map((entry, index) => (
                                        <Cell key={entry.name} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-amber-500" />
                            Moderation Queue
                        </CardTitle>
                        <CardDescription>Most recent pending reports from users</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {pendingReports.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No pending reports.</p>
                            ) : (
                                pendingReports.map((report) => (
                                    <div key={report.id} className="p-3 border rounded-lg">
                                        <div className="flex items-center justify-between">
                                            <p className="font-medium text-sm">{report.title}</p>
                                            <Badge variant={report.priority === 'high' ? 'destructive' : 'secondary'}>
                                                {report.priority}
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {report.type} · {new Date(report.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <UserPlus className="w-5 h-5 text-blue-500" />
                            Recent Registrations
                        </CardTitle>
                        <CardDescription>Latest users created on the platform</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead>Roles</TableHead>
                                    <TableHead>Joined</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarFallback className="text-xs">
                                                        {(user.name || 'U')
                                                            .split(' ')
                                                            .map((part) => part[0])
                                                            .join('')}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium text-sm">{user.name || 'Unknown'}</p>
                                                    <p className="text-xs text-muted-foreground">{user.email || 'No email'}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-1 flex-wrap">
                                                {user.roles.map((role) => (
                                                    <Badge key={role} variant="outline">
                                                        {role}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
