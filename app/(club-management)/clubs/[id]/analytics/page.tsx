'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from 'recharts'
import {
  ChevronLeft,
  Users,
  MapPin,
  Trophy,
  TrendingUp,
  CheckCircle2,
  Clock,
  Loader2,
  BarChart3,
} from 'lucide-react'
import { clubsApi } from '@/lib/services'

const STATUS_COLORS: Record<string, string> = {
  PLANNED: '#3b82f6',
  IN_PROGRESS: '#f59e0b',
  COMPLETED: '#22c55e',
  CANCELLED: '#ef4444',
}

export default function ClubAnalyticsPage() {
  const { id: clubId } = useParams<{ id: string }>()
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [club, setClub] = useState<any>(null)
  const [members, setMembers] = useState<any[]>([])
  const [rides, setRides] = useState<any[]>([])

  useEffect(() => {
    if (!clubId) return
    Promise.all([
      clubsApi.getClub(clubId).catch(() => null),
      clubsApi.getMembers(clubId).catch(() => null),
      clubsApi.getClubRides(clubId).catch(() => null),
    ]).then(([clubRes, membersRes, ridesRes]) => {
      setClub(clubRes?.club ?? clubRes ?? null)
      setMembers(membersRes?.members ?? [])
      setRides(ridesRes?.rides ?? ridesRes?.items ?? [])
    }).finally(() => setLoading(false))
  }, [clubId])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  // ── Derived analytics ──────────────────────────────────────────────────────

  const totalRides = rides.length
  const completedRides = rides.filter((r: any) => r.status === 'COMPLETED').length
  const completionRate = totalRides > 0 ? Math.round((completedRides / totalRides) * 100) : 0

  const ridesByStatus = rides.reduce((acc: Record<string, number>, r: any) => {
    acc[r.status] = (acc[r.status] ?? 0) + 1
    return acc
  }, {})

  const statusChartData = Object.entries(ridesByStatus).map(([name, value]) => ({
    name,
    value,
    fill: STATUS_COLORS[name] ?? '#6b7280',
  }))

  // Top 5 members by name (proxy for activity until ride-per-member API exists)
  const topMembers = members
    .filter((m: any) => m.user || m.name)
    .slice(0, 5)

  const avgParticipants =
    rides.length > 0
      ? Math.round(
          rides.reduce((acc: number, r: any) => acc + (r._count?.participants ?? r.participantCount ?? 0), 0) / rides.length,
        )
      : 0

  const totalDistance = rides
    .filter((r: any) => r.status === 'COMPLETED')
    .reduce((acc: number, r: any) => acc + (r.distance ?? 0), 0)

  // Monthly rides bucketed by scheduledAt month
  const monthlyBuckets: Record<string, number> = {}
  rides.forEach((r: any) => {
    const d = r.scheduledAt ? new Date(r.scheduledAt) : new Date(r.createdAt)
    const key = d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
    monthlyBuckets[key] = (monthlyBuckets[key] ?? 0) + 1
  })
  const monthlyData = Object.entries(monthlyBuckets)
    .slice(-6)
    .map(([month, count]) => ({ month, count }))

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{club?.name ?? 'Club'} Analytics</h1>
          <p className="text-sm text-muted-foreground">Performance insights for club managers</p>
        </div>
        <div className="ml-auto">
          <BarChart3 className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Members"
          value={club?._count?.members ?? members.length}
          icon={<Users className="w-5 h-5" />}
          color="blue"
        />
        <StatCard
          label="Total Rides"
          value={totalRides}
          icon={<MapPin className="w-5 h-5" />}
          color="green"
        />
        <StatCard
          label="Completion Rate"
          value={`${completionRate}%`}
          icon={<CheckCircle2 className="w-5 h-5" />}
          color="purple"
          sub={`${completedRides} of ${totalRides} completed`}
        />
        <StatCard
          label="Avg Participants"
          value={avgParticipants}
          icon={<TrendingUp className="w-5 h-5" />}
          color="amber"
          sub="per ride"
        />
      </div>

      {/* Distance + ride count */}
      {totalDistance > 0 && (
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-green-50 dark:bg-green-950">
              <Trophy className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalDistance.toFixed(0)} km</p>
              <p className="text-sm text-muted-foreground">Total distance covered by completed rides</p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly ride activity */}
        {monthlyData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Monthly Rides</CardTitle>
              <CardDescription>Rides scheduled or created per month (last 6 months)</CardDescription>
            </CardHeader>
            <CardContent className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="count" name="Rides" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Ride status breakdown */}
        {statusChartData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Ride Status Breakdown</CardTitle>
              <CardDescription>Distribution of all rides by status</CardDescription>
            </CardHeader>
            <CardContent className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75} label>
                    {statusChartData.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Members table */}
      {members.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Members ({members.length})
            </CardTitle>
            <CardDescription>Current club members and their roles</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.slice(0, 20).map((member: any) => {
                  const user = member.user ?? member
                  const name = user.name ?? user.username ?? 'Member'
                  return (
                    <TableRow key={member.id ?? user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">{name[0].toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{name}</p>
                            {user.email && <p className="text-xs text-muted-foreground">{user.email}</p>}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={member.role === 'OWNER' || member.role === 'owner' ? 'default' : 'outline'} className="text-[11px]">
                          {member.role ?? 'MEMBER'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {member.joinedAt ? new Date(member.joinedAt).toLocaleDateString() : '—'}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
            {members.length > 20 && (
              <p className="text-xs text-muted-foreground mt-3 text-center">
                Showing first 20 of {members.length} members
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Empty state */}
      {totalRides === 0 && members.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 gap-3 text-muted-foreground">
            <BarChart3 className="w-10 h-10" />
            <p className="font-medium">No analytics data yet</p>
            <p className="text-sm text-center">
              Analytics will populate once members join and rides are created.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function StatCard({
  label,
  value,
  icon,
  color,
  sub,
}: {
  label: string
  value: string | number
  icon: React.ReactNode
  color: 'blue' | 'green' | 'purple' | 'amber'
  sub?: string
}) {
  const colors = {
    blue: 'bg-blue-50 dark:bg-blue-950 text-blue-600',
    green: 'bg-green-50 dark:bg-green-950 text-green-600',
    purple: 'bg-violet-50 dark:bg-violet-950 text-violet-600',
    amber: 'bg-amber-50 dark:bg-amber-950 text-amber-600',
  }
  return (
    <Card>
      <CardContent className="p-5">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${colors[color]}`}>
          {icon}
        </div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
        {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
      </CardContent>
    </Card>
  )
}
