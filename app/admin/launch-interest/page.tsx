'use client'

import { useCallback, useEffect, useState } from 'react'
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
  ExternalLink,
  FileSpreadsheet,
  RefreshCw,
} from 'lucide-react'

interface LaunchInterestResponse {
  googleForm: {
    responsesUrl: string | null
  }
}

export default function AdminLaunchInterestPage() {
  const [data, setData] = useState<LaunchInterestResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadData = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) {
      setIsRefreshing(true)
    } else {
      setIsLoading(true)
    }

    setError(null)

    try {
      const response = await fetch('/api/admin/launch-interest', {
        method: 'GET',
        cache: 'no-store',
      })

      if (!response.ok) {
        throw new Error('Failed to load launch interest data')
      }

      const payload = (await response.json()) as LaunchInterestResponse
      setData(payload)
    } catch {
      setError('Unable to load launch interest data right now. Please retry.')
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold">Launch Interest</h2>
          <p className="text-sm text-muted-foreground">
            Public interest intake is Google Form only. Admin view embeds the responses URL.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => loadData(true)}
          disabled={isRefreshing}
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {error ? (
        <Card className="border-red-200 bg-red-50/60">
          <CardContent className="py-4">
            <p className="text-sm text-red-700">{error}</p>
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Google Responses
          </CardTitle>
          <CardDescription>
            Embed of GOOGLE_FORM_RESPONSES_URL. Keep this URL set in environment.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {data?.googleForm.responsesUrl ? (
            <>
              <Button variant="outline" asChild>
                <a href={data.googleForm.responsesUrl} target="_blank" rel="noreferrer">
                  Open Responses URL
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>

              <div className="overflow-hidden rounded-xl border border-border bg-background">
                <iframe
                  title="Google form responses"
                  src={data.googleForm.responsesUrl}
                  className="h-[900px] w-full border-0"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                >
                  Loading responses...
                </iframe>
              </div>
            </>
          ) : (
            <Badge variant="secondary">Set GOOGLE_FORM_RESPONSES_URL to enable embedded admin responses</Badge>
          )}
        </CardContent>
      </Card>
    </div>
  )
}