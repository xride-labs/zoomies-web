'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { 
  MapPin, 
  Calendar, 
  Users, 
  Trophy, 
  Star,
  MessageCircle,
  UserPlus,
  Shield,
  Bike,
  Route,
  Award
} from 'lucide-react'
import { BoneyardLoadingState } from '@/components/loading/boneyard-loading-state'

interface PublicProfile {
  id: string
  name: string
  username: string
  avatar: string | null
  coverImage: string | null
  bio: string | null
  location: string | null
  level: number
  levelTitle: string
  reputationScore: number
  activityLevel: string
  joinedAt: string
  stats: {
    totalRides: number
    totalDistance: number
    clubsJoined: number
    badgesEarned: number
  }
  badges: Array<{
    id: string
    title: string
    icon: string
    category: string
  }>
  bikes: Array<{
    id: string
    make: string
    model: string
    year: number
    type: string
    isPrimary: boolean
  }>
  recentRides: Array<{
    id: string
    title: string
    date: string
    distance: number
    participants: number
  }>
}

export default function PublicProfilePage() {
  const params = useParams()
  const userId = params.id as string
  const [profile, setProfile] = useState<PublicProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProfile() {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/users/${userId}/public`)
        if (!response.ok) {
          throw new Error('Profile not found')
        }
        const data = await response.json()
        setProfile(data.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile')
      } finally {
        setIsLoading(false)
      }
    }

    if (userId) {
      fetchProfile()
    }
  }, [userId])

  if (isLoading) {
    return (
      <BoneyardLoadingState
        name="profile-view-loading"
        fallback={
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="animate-pulse">
              <div className="h-48 bg-muted rounded-xl mb-6" />
              <div className="flex gap-6">
                <div className="w-32 h-32 bg-muted rounded-full" />
                <div className="flex-1 space-y-3">
                  <div className="h-8 bg-muted rounded w-1/3" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </div>
              </div>
            </div>
          </div>
        }
      />
    )
  }

  if (error || !profile) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <Shield className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Profile Not Found</h2>
        <p className="text-muted-foreground">
          This profile doesn't exist or is set to private.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Cover Image */}
      <div className="relative h-48 bg-gradient-to-r from-primary/20 to-amber-100/50 rounded-xl mb-6 overflow-hidden">
        {profile.coverImage && (
          <img 
            src={profile.coverImage} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex flex-col items-center md:items-start">
          <Avatar className="w-32 h-32 border-4 border-background shadow-lg">
            <AvatarImage src={profile.avatar || undefined} />
            <AvatarFallback className="text-2xl font-bold">
              {profile.name?.charAt(0) || profile.username?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex gap-2 mt-4">
            <Button size="sm" className="gap-2">
              <MessageCircle className="w-4 h-4" />
              Message
            </Button>
            <Button size="sm" variant="outline" className="gap-2">
              <UserPlus className="w-4 h-4" />
              Follow
            </Button>
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold">{profile.name}</h1>
            <Badge variant="secondary" className="w-fit mx-auto md:mx-0">
              Level {profile.level} • {profile.levelTitle}
            </Badge>
          </div>
          
          <p className="text-muted-foreground mb-2">@{profile.username}</p>
          
          {profile.bio && (
            <p className="text-sm mb-4 max-w-2xl">{profile.bio}</p>
          )}

          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground">
            {profile.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {profile.location}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Joined {new Date(profile.joinedAt).toLocaleDateString('en-US', { 
                month: 'long', 
                year: 'numeric' 
              })}
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              {profile.reputationScore.toFixed(1)} reputation
            </span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <Route className="w-6 h-6 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">{profile.stats.totalRides}</div>
            <div className="text-xs text-muted-foreground">Rides</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <MapPin className="w-6 h-6 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">{profile.stats.totalDistance.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">KM Traveled</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">{profile.stats.clubsJoined}</div>
            <div className="text-xs text-muted-foreground">Clubs</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Award className="w-6 h-6 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">{profile.stats.badgesEarned}</div>
            <div className="text-xs text-muted-foreground">Badges</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Bikes */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Bike className="w-5 h-5" />
              Motorcycles
            </h3>
            <div className="space-y-3">
              {profile.bikes.length > 0 ? (
                profile.bikes.map((bike) => (
                  <div key={bike.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <div className="font-medium">
                        {bike.make} {bike.model}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {bike.year} • {bike.type}
                      </div>
                    </div>
                    {bike.isPrimary && (
                      <Badge variant="secondary" className="text-xs">
                        Primary
                      </Badge>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No motorcycles added yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Recent Badges
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {profile.badges.length > 0 ? (
                profile.badges.slice(0, 6).map((badge) => (
                  <div key={badge.id} className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                    <span className="text-lg">{badge.icon}</span>
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">{badge.title}</div>
                      <div className="text-xs text-muted-foreground capitalize">{badge.category}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-sm text-muted-foreground text-center py-4">
                  No badges earned yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Rides */}
      {profile.recentRides.length > 0 && (
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Route className="w-5 h-5" />
              Recent Rides
            </h3>
            <div className="space-y-3">
              {profile.recentRides.map((ride) => (
                <div key={ride.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <div className="font-medium">{ride.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(ride.date).toLocaleDateString()} • {ride.distance}km • {ride.participants} riders
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}