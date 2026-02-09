"use client";

import { useSession } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, ExternalLink, Activity, BarChart3 } from "lucide-react";

const GRAFANA_URL =
    process.env.NEXT_PUBLIC_GRAFANA_URL || "http://localhost:3001";
const PROMETHEUS_URL =
    process.env.NEXT_PUBLIC_PROMETHEUS_URL || "http://localhost:9090";

export default function AdminMonitoringPage() {
    const { data: session } = useSession();
    const isSuperAdmin = session?.user?.role === "SUPER_ADMIN";

    if (!isSuperAdmin) {
        return (
            <Card className="border-red-200 bg-red-50/60">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-red-600" />
                        <CardTitle>Restricted</CardTitle>
                    </div>
                    <CardDescription>
                        Monitoring dashboards are available to super admins only.
                    </CardDescription>
                </CardHeader>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 className="text-2xl font-semibold">Monitoring</h2>
                    <p className="text-sm text-muted-foreground">
                        Live system health and performance metrics.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="gap-1">
                        <Activity className="w-3.5 h-3.5" />
                        Prometheus
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                        <BarChart3 className="w-3.5 h-3.5" />
                        Grafana
                    </Badge>
                </div>
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
                                    Raw metrics endpoint and scrape status.
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
                    <CardContent className="space-y-3 text-sm text-muted-foreground">
                        <div>
                            <span className="text-foreground">Scrape URL:</span> /api/admin/metrics
                        </div>
                        <div>
                            <span className="text-foreground">Prometheus UI:</span> {PROMETHEUS_URL}
                        </div>
                        <div className="rounded-lg border border-dashed p-3 text-xs">
                            Update METRICS_BEARER_TOKEN on the backend and the Prometheus
                            token file to keep scraping secure.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
