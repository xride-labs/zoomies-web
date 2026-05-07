'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tag, Plus, Loader2, Calendar, Eye, MousePointer } from 'lucide-react'
import Link from 'next/link'
import { businessApi, type AdCampaign } from '@/lib/server/business'

const STATUS_BADGE: Record<string, string> = {
  DRAFT: 'text-muted-foreground border-border',
  PENDING_APPROVAL: 'text-amber-500 border-amber-500/30 bg-amber-500/5',
  ACTIVE: 'text-green-500 border-green-500/30 bg-green-500/5',
  PAUSED: 'text-blue-400 border-blue-400/30 bg-blue-400/5',
  COMPLETED: 'text-muted-foreground border-border',
  REJECTED: 'text-destructive border-destructive/30 bg-destructive/5',
}

export default function BrandCampaignsPage() {
  const [campaigns, setCampaigns] = useState<AdCampaign[]>([])
  const [loading, setLoading] = useState(true)
  const [businessId, setBusinessId] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const businesses = await businessApi.getMyBusinesses()
        if (businesses.length > 0) {
          const id = businesses[0].id
          setBusinessId(id)
          const items = await businessApi.getCampaigns(id)
          setCampaigns(items)
        }
      } catch {
        // no-op
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Ad Campaigns</h2>
          <p className="text-sm text-muted-foreground mt-1">Reach riders based on location, bike type, and riding style</p>
        </div>
        <Button className="bg-amber-500 hover:bg-amber-600 text-white" asChild>
          <Link href="/brand/campaigns/create">
            <Plus className="w-4 h-4 mr-2" /> New Campaign
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
        </div>
      ) : campaigns.length === 0 ? (
        <Card className="border-dashed border-2">
          <CardContent className="py-20 text-center">
            <Tag className="w-14 h-14 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">No campaigns yet</h3>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto mb-6">
              Sponsor rides, promote listings, and target riders by location and bike type.
            </p>
            <Button variant="outline" asChild>
              <Link href="/brand/campaigns/create">
                <Plus className="w-4 h-4 mr-2" /> Create your first campaign
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {campaigns.map((c) => (
            <Card key={c.id}>
              <CardContent className="p-4 flex items-center gap-4">
                {c.imageUrl && (
                  <img src={c.imageUrl} alt={c.title} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium truncate">{c.title}</p>
                    <Badge variant="outline" className={`text-xs shrink-0 ${STATUS_BADGE[c.status] ?? ''}`}>
                      {c.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(c.startsAt).toLocaleDateString()} – {new Date(c.endsAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" /> {c.impressionCount.toLocaleString()} impressions
                    </span>
                    <span className="flex items-center gap-1">
                      <MousePointer className="w-3 h-3" /> {c.clickCount.toLocaleString()} clicks
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
