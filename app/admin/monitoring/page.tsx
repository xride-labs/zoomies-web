'use client'

import { useState, useEffect } from 'react'
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
  Activity,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  RefreshCw,
  Server,
  Shield,
  Zap,
  Bug,
} from 'lucide-react'
import { toast } from 'sonner'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN || ''
const SENTRY_ORG = process.env.NEXT_PUBLIC_SENTRY_ORG || ''
const SENTRY_PROJECT = process.env.NEXT_PUBLIC_SENTRY_PROJECT || ''

type HealthStatus = 'checking' | 'up' | 'down'

interface ServiceHealth {
  name: string
  url: string
  status: HealthStatus
  latencyMs?: number
}

async function pingEndpoint(url: string): Promise<{ ok: boolean; latencyMs: number }> {
  const start = Date.now()
  try {
    const res = await fetch(url, { method: 'GET', signal: AbortSignal.timeout(5000) })
    return { ok: res.ok || res.status < 500, latencyMs: Date.now() - start }
  } catch {
    return { ok: false, latencyMs: Date.now() - start }
  }
}

export default function AdminMonitoringPage() {
  const [services, setServices] = useState<ServiceHealth[]>([
    { name: 'API Server', url: `${API_URL}/health`, status: 'checking' },
    { name: 'Auth Service', url: `${API_URL}/api/health`, status: 'checking' },
  ])
  const [lastChecked, setLastChecked] = useState<Date | null>(null)
  const [checking, setChecking] = useState(false)

  const runChecks = async () => {
    setChecking(true)
    const results = await Promise.all(
      services.map(async (svc) => {
        const { ok, latencyMs } = await pingEndpoint(svc.url)
        return { ...svc, status: (ok ? 'up' : 'down') as HealthStatus, latencyMs }
      }),
    )
    setServices(results)
    setLastChecked(new Date())
    setChecking(false)
  }

  useEffect(() => { runChecks() }, [])

  const allUp = services.every((s) => s.status === 'up')
  const hasSentry = !!SENTRY_DSN

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Monitoring</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Service health · Error tracking · Observability
          </p>
        </div>
        <div className="flex items-center gap-3">
          {lastChecked && (
            <span className="text-xs text-muted-foreground">
              Last checked {lastChecked.toLocaleTimeString()}
            </span>
          )}
          <Button variant="outline" size="sm" onClick={runChecks} disabled={checking}>
            <RefreshCw className={`w-4 h-4 mr-2 ${checking ? 'animate-spin' : ''}`} />
            Check now
          </Button>
        </div>
      </div>

      {/* Overall status banner */}
      <Card className={allUp ? 'border-green-200 bg-green-50/40 dark:bg-green-950/20' : 'border-red-200 bg-red-50/40 dark:bg-red-950/20'}>
        <CardContent className="p-4 flex items-center gap-3">
          {allUp
            ? <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
            : <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />}
          <div>
            <p className="font-semibold text-sm">
              {checking ? 'Checking services…' : allUp ? 'All systems operational' : 'One or more services degraded'}
            </p>
            <p className="text-xs text-muted-foreground">
              {services.filter(s => s.status === 'up').length}/{services.length} services healthy
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Health checks */}
      <div>
        <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">Service Health</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {services.map((svc) => (
            <Card key={svc.name}>
              <CardContent className="p-4 flex items-center gap-3">
                <Server className="w-5 h-5 text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{svc.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{svc.url}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {svc.latencyMs !== undefined && svc.status === 'up' && (
                    <span className="text-xs text-muted-foreground">{svc.latencyMs}ms</span>
                  )}
                  {svc.status === 'checking' && (
                    <Badge variant="secondary" className="gap-1">
                      <RefreshCw className="w-3 h-3 animate-spin" /> Checking
                    </Badge>
                  )}
                  {svc.status === 'up' && (
                    <Badge className="gap-1 bg-green-100 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-300">
                      <CheckCircle2 className="w-3 h-3" /> UP
                    </Badge>
                  )}
                  {svc.status === 'down' && (
                    <Badge variant="destructive" className="gap-1">
                      <AlertCircle className="w-3 h-3" /> DOWN
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Sentry */}
      <div>
        <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">Error Tracking — Sentry</h3>
        {hasSentry ? (
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-950 flex items-center justify-center shrink-0">
                <Bug className="w-5 h-5 text-violet-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">Sentry is configured</p>
                <p className="text-xs text-muted-foreground">DSN is set — errors are being captured.</p>
              </div>
              {SENTRY_ORG && SENTRY_PROJECT && (
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={`https://sentry.io/organizations/${SENTRY_ORG}/projects/${SENTRY_PROJECT}/`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open Sentry
                    <ExternalLink className="ml-2 w-3.5 h-3.5" />
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Bug className="w-5 h-5 text-violet-500" />
                Set up Sentry (free, 5k errors/month)
              </CardTitle>
              <CardDescription>
                Replaces Prometheus + Grafana for early-stage monitoring — zero infra, instant errors.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ol className="space-y-3 text-sm">
                <li className="flex gap-3">
                  <StepBadge n={1} />
                  <div>
                    <p className="font-medium">Create a free account</p>
                    <a href="https://sentry.io/signup/" target="_blank" rel="noreferrer" className="text-xs text-violet-600 hover:underline flex items-center gap-1">
                      sentry.io/signup <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <StepBadge n={2} />
                  <div>
                    <p className="font-medium">Install SDKs</p>
                    <code className="text-xs bg-muted px-2 py-1 rounded block mt-1">
                      bun add @sentry/nextjs @sentry/react-native
                    </code>
                  </div>
                </li>
                <li className="flex gap-3">
                  <StepBadge n={3} />
                  <div>
                    <p className="font-medium">Add env vars</p>
                    <code className="text-xs bg-muted px-2 py-1 rounded block mt-1 leading-relaxed">
                      NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...<br />
                      NEXT_PUBLIC_SENTRY_ORG=your-org<br />
                      NEXT_PUBLIC_SENTRY_PROJECT=zoomies-web
                    </code>
                  </div>
                </li>
                <li className="flex gap-3">
                  <StepBadge n={4} />
                  <div>
                    <p className="font-medium">Run Sentry wizard (auto-configures Next.js)</p>
                    <code className="text-xs bg-muted px-2 py-1 rounded block mt-1">
                      npx @sentry/wizard@latest -i nextjs
                    </code>
                  </div>
                </li>
              </ol>

              <div className="rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950/30 p-3 text-xs flex gap-2">
                <Zap className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="text-amber-800 dark:text-amber-200">
                  Free tier covers 5,000 errors + 10,000 performance transactions per month —
                  more than enough for beta. No Docker, no dashboards to run.
                </span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Deprecation notice */}
      <Card className="border-dashed opacity-60">
        <CardContent className="p-4 flex items-center gap-3">
          <Shield className="w-5 h-5 text-muted-foreground shrink-0" />
          <div>
            <p className="font-medium text-sm text-muted-foreground">Prometheus &amp; Grafana removed</p>
            <p className="text-xs text-muted-foreground">
              Too heavy for early-stage. Sentry covers errors + performance at zero ops cost.
              Add Prometheus back when you hit 10k+ DAU and need custom metrics.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function StepBadge({ n }: { n: number }) {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600 text-[11px] font-bold text-white mt-0.5">
      {n}
    </span>
  )
}
