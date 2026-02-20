"use client";

import { useAuth } from "@/lib/use-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, ExternalLink, Activity, BarChart3, FileText, Server, Database, AlertCircle } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const GRAFANA_URL =
    process.env.NEXT_PUBLIC_GRAFANA_URL || "http://localhost:3001";
const PROMETHEUS_URL =
    process.env.NEXT_PUBLIC_PROMETHEUS_URL || "http://localhost:9090";
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AdminMonitoringPage() {
    const { user, isPending } = useAuth();
    const router = useRouter();
    const userRoles: string[] = user?.roles || [];
    const isAdmin = userRoles.includes("ADMIN");

    useEffect(() => {
        if (isPending) return;
        if (!user) {
            router.push("/login");
            return;
        }
        if (!isAdmin) {
            router.push("/admin");
        }
    }, [user, isPending, isAdmin, router]);

    if (isPending) {
        return (
            <div className="flex items-center justify-center min-h-100">
                <div className="text-center space-y-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
                    <p className="text-sm text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <Card className="border-red-200 bg-red-50/60">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-red-600" />
                        <CardTitle>Restricted</CardTitle>
                    </div>
                    <CardDescription>
                        Monitoring dashboards are available to admins only.
                    </CardDescription>
                </CardHeader>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 className="text-2xl font-semibold">Monitoring & Metrics</h2>
                    <p className="text-sm text-muted-foreground">
                        Real-time system health, performance metrics, and observability dashboard.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="gap-1">
                        <Activity className="w-3.5 h-3.5" />
                        Live
                    </Badge>
                    <Button variant="outline" size="sm" asChild>
                        <a href="/docs/MONITORING_GUIDE.md" target="_blank" rel="noreferrer">
                            <FileText className="mr-2 h-4 w-4" />
                            Guide
                        </a>
                    </Button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Grafana</CardTitle>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Dashboard</div>
                        <p className="text-xs text-muted-foreground">
                            Visual metrics & insights
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Prometheus</CardTitle>
                        <Database className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Time-Series DB</div>
                        <p className="text-xs text-muted-foreground">
                            Metrics storage & queries
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Metrics API</CardTitle>
                        <Server className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Live Feed</div>
                        <p className="text-xs text-muted-foreground">
                            Backend endpoint
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card className="overflow-hidden">
                    <CardHeader className="border-b">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <CardTitle>Grafana Dashboard</CardTitle>
                                <CardDescription>
                                    Zoomies backend overview with request, error, and latency panels.
                                </CardDescription>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                                <a href={GRAFANA_URL} target="_blank" rel="noreferrer">
                                    Open
                                    <ExternalLink className="ml-2 h-4 w-4" />
                                </a>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <iframe
                            title="Grafana Dashboard"
                            src={`${GRAFANA_URL}/d/zoomies-backend/zoomies-backend-overview?kiosk=tv&theme=light`}
                            className="h-105 w-full border-0"
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <CardTitle>Prometheus</CardTitle>
                                <CardDescription>
                                    Time-series database and metrics scraper.
                                </CardDescription>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                                <a href={PROMETHEUS_URL} target="_blank" rel="noreferrer">
                                    Open
                                    <ExternalLink className="ml-2 h-4 w-4" />
                                </a>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2 text-sm">
                            <div className="flex items-start justify-between gap-2">
                                <span className="text-muted-foreground min-w-25">URL:</span>
                                <code className="text-xs bg-muted px-2 py-1 rounded">{PROMETHEUS_URL}</code>
                            </div>
                            <div className="flex items-start justify-between gap-2">
                                <span className="text-muted-foreground min-w-25">Scrape:</span>
                                <code className="text-xs bg-muted px-2 py-1 rounded">/api/admin/metrics</code>
                            </div>
                            <div className="flex items-start justify-between gap-2">
                                <span className="text-muted-foreground min-w-25">Interval:</span>
                                <span className="text-xs">15 seconds</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Button variant="secondary" size="sm" className="w-full" asChild>
                                <a href={`${PROMETHEUS_URL}/targets`} target="_blank" rel="noreferrer">
                                    <Activity className="mr-2 h-3.5 w-3.5" />
                                    View Targets Status
                                </a>
                            </Button>
                            <Button variant="secondary" size="sm" className="w-full" asChild>
                                <a href={`${PROMETHEUS_URL}/graph`} target="_blank" rel="noreferrer">
                                    <BarChart3 className="mr-2 h-3.5 w-3.5" />
                                    Query Metrics (PromQL)
                                </a>
                            </Button>
                        </div>

                        <div className="rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950/30 p-3 text-xs flex gap-2">
                            <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                            <div>
                                <strong className="text-amber-900 dark:text-amber-100">Security:</strong>
                                <span className="text-amber-700 dark:text-amber-200 ml-1">
                                    Update METRICS_BEARER_TOKEN on backend and in Prometheus config to secure the metrics endpoint.
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Monitoring Guide */}
            <Card>
                <CardHeader>
                    <CardTitle>Getting Started</CardTitle>
                    <CardDescription>
                        Quick guide to using the monitoring stack
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <h4 className="text-sm font-semibold flex items-center gap-2">
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">1</span>
                                Start Monitoring Stack
                            </h4>
                            <code className="block text-xs bg-muted p-3 rounded">
                                cd monitoring<br />
                                docker compose up -d
                            </code>
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-sm font-semibold flex items-center gap-2">
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">2</span>
                                Access Grafana
                            </h4>
                            <div className="text-xs bg-muted p-3 rounded space-y-1">
                                <div><strong>URL:</strong> {GRAFANA_URL}</div>
                                <div><strong>User:</strong> admin</div>
                                <div><strong>Pass:</strong> admin</div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-sm font-semibold flex items-center gap-2">
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">3</span>
                                View Dashboard
                            </h4>
                            <p className="text-xs text-muted-foreground">
                                Navigate to <strong>Dashboards → Zoomies Backend Overview</strong> or use the embedded view above.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-sm font-semibold flex items-center gap-2">
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">4</span>
                                Check Metrics
                            </h4>
                            <p className="text-xs text-muted-foreground">
                                Visit Prometheus at <strong>{PROMETHEUS_URL}/targets</strong> to verify backend scraping is active (status UP).
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                        <Button variant="default" size="sm" asChild>
                            <a href="https://github.com/yourusername/zoomies-backend/blob/main/docs/MONITORING_GUIDE.md" target="_blank" rel="noreferrer">
                                <FileText className="mr-2 h-4 w-4" />
                                Full Monitoring Guide
                            </a>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                            <a href={`${BACKEND_URL}/admin/metrics`} target="_blank" rel="noreferrer">
                                <Server className="mr-2 h-4 w-4" />
                                Raw Metrics Endpoint
                            </a>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
