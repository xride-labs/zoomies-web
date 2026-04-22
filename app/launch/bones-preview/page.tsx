import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import { BoneyardLoadingState } from '@/components/loading/boneyard-loading-state'

function Bone({ className }: { className: string }) {
    return <div className={`rounded-md bg-muted/60 ${className}`} />
}

function section(title: string, name: string, fallback: ReactNode) {
    return (
        <section className="space-y-2" key={name}>
            <h2 className="text-sm font-semibold text-muted-foreground">{title}</h2>
            <BoneyardLoadingState name={name} fallback={fallback} />
        </section>
    )
}

export default function BonesPreviewPage() {
    if (process.env.NODE_ENV === 'production') {
        notFound()
    }

    const adminLayoutFixture = (
        <div className="min-h-screen bg-background flex">
            <aside className="hidden lg:flex lg:w-64 lg:flex-col border-r border-border bg-card">
                <div className="flex h-16 items-center gap-2 px-6 border-b border-border">
                    <Bone className="h-10 w-10 rounded-xl" />
                    <Bone className="h-6 w-24" />
                </div>
                <div className="flex-1 p-4 space-y-2">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <Bone key={`admin-nav-${index}`} className="h-10 w-full rounded-lg" />
                    ))}
                </div>
            </aside>
            <main className="flex-1 p-6 space-y-6">
                <Bone className="h-10 w-56" />
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <Bone key={`admin-card-${index}`} className="h-32 w-full rounded-xl" />
                    ))}
                </div>
            </main>
        </div>
    )

    const clubLayoutFixture = (
        <div className="min-h-80 rounded-lg border border-border bg-background p-4">
            <div className="flex min-h-72 gap-4">
                <aside className="w-52 space-y-3">
                    <Bone className="h-10 w-full" />
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Bone key={`club-nav-${index}`} className="h-10 w-full" />
                    ))}
                </aside>
                <div className="flex-1 space-y-4">
                    <Bone className="h-8 w-48" />
                    <div className="grid grid-cols-2 gap-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Bone key={`club-card-${index}`} className="h-20 w-full" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )

    const dashboardFixture = (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                    <Bone key={`dashboard-summary-${index}`} className="h-36 w-full rounded-xl" />
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Bone className="h-82.5 w-full rounded-xl" />
                <Bone className="h-82.5 w-full rounded-xl" />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Bone className="h-64 w-full rounded-xl" />
                <Bone className="h-64 w-full rounded-xl" />
            </div>
        </div>
    )

    const tableFixture = (
        <div className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row">
                <Bone className="h-10 flex-1" />
                <Bone className="h-10 w-40" />
                <Bone className="h-10 w-40" />
            </div>
            <div className="rounded-md border border-border">
                <Bone className="h-12 w-full" />
                {Array.from({ length: 6 }).map((_, index) => (
                    <Bone key={`table-row-${index}`} className="h-14 w-full border-t border-border" />
                ))}
            </div>
        </div>
    )

    const embeddedFrameFixture = (
        <div className="space-y-4 rounded-lg border border-border p-4">
            <div className="flex items-center justify-between gap-3">
                <div className="space-y-2">
                    <Bone className="h-8 w-56" />
                    <Bone className="h-4 w-80" />
                </div>
                <Bone className="h-10 w-28" />
            </div>
            <Bone className="h-225 w-full" />
        </div>
    )

    const centeredLoaderFixture = (
        <div className="flex min-h-100 flex-col items-center justify-center gap-3 rounded-lg border border-border p-4">
            <Bone className="h-8 w-8 rounded-full" />
            <Bone className="h-4 w-24" />
        </div>
    )

    const clubListFixture = (
        <div className="space-y-4 rounded-lg border border-border p-4">
            <div className="flex gap-2">
                <Bone className="h-10 w-28 rounded-full" />
                <Bone className="h-10 w-28 rounded-full" />
            </div>
            {Array.from({ length: 3 }).map((_, index) => (
                <div key={`club-list-${index}`} className="rounded-lg border border-border p-3">
                    <div className="flex gap-3">
                        <Bone className="h-14 w-14 rounded-full" />
                        <div className="flex-1 space-y-2">
                            <Bone className="h-4 w-40" />
                            <Bone className="h-4 w-24" />
                            <Bone className="h-4 w-full" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )

    const feedFixture = (
        <div className="space-y-4 rounded-lg border border-border p-4">
            <div className="flex gap-3">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={`story-${index}`} className="space-y-2 text-center">
                        <Bone className="h-12 w-12 rounded-full" />
                        <Bone className="h-3 w-12" />
                    </div>
                ))}
            </div>
            {Array.from({ length: 2 }).map((_, index) => (
                <div key={`post-${index}`} className="space-y-3 rounded-lg border border-border p-3">
                    <div className="flex gap-3">
                        <Bone className="h-10 w-10 rounded-full" />
                        <div className="flex-1 space-y-2">
                            <Bone className="h-4 w-36" />
                            <Bone className="h-3 w-24" />
                        </div>
                    </div>
                    <Bone className="h-4 w-full" />
                    <Bone className="h-40 w-full" />
                </div>
            ))}
        </div>
    )

    const ridesFixture = (
        <div className="space-y-4 rounded-lg border border-border p-4">
            <div className="flex gap-2">
                {Array.from({ length: 3 }).map((_, index) => (
                    <Bone key={`ride-tab-${index}`} className="h-9 w-24 rounded-full" />
                ))}
            </div>
            {Array.from({ length: 3 }).map((_, index) => (
                <div key={`ride-row-${index}`} className="flex gap-3 rounded-lg border border-border p-3">
                    <Bone className="h-12 w-12" />
                    <div className="flex-1 space-y-2">
                        <Bone className="h-4 w-48" />
                        <Bone className="h-4 w-32" />
                        <Bone className="h-4 w-full" />
                    </div>
                </div>
            ))}
        </div>
    )

    const marketplaceGridFixture = (
        <div className="space-y-4 rounded-lg border border-border p-4">
            <div className="flex gap-2">
                <Bone className="h-10 flex-1" />
                <Bone className="h-10 w-10" />
            </div>
            <div className="flex gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                    <Bone key={`market-chip-${index}`} className="h-8 w-20 rounded-full" />
                ))}
            </div>
            <div className="grid grid-cols-3 gap-3">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={`listing-card-${index}`} className="space-y-2 rounded-lg border border-border p-2">
                        <Bone className="h-20 w-full" />
                        <Bone className="h-3 w-full" />
                        <Bone className="h-3 w-2/3" />
                    </div>
                ))}
            </div>
        </div>
    )

    const clubDetailFixture = (
        <div className="space-y-4 rounded-lg border border-border p-4">
            <Bone className="h-28 w-full" />
            <div className="flex items-end gap-4">
                <Bone className="h-20 w-20 rounded-full" />
                <div className="flex-1 space-y-2">
                    <Bone className="h-6 w-44" />
                    <Bone className="h-4 w-64" />
                </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
                {Array.from({ length: 3 }).map((_, index) => (
                    <Bone key={`club-stat-${index}`} className="h-16 w-full" />
                ))}
            </div>
        </div>
    )

    const manageFixture = (
        <div className="space-y-4 rounded-lg border border-border p-4">
            <div className="flex gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                    <Bone key={`manage-tab-${index}`} className="h-9 w-24" />
                ))}
            </div>
            <Bone className="h-8 w-full" />
            {Array.from({ length: 4 }).map((_, index) => (
                <Bone key={`manage-row-${index}`} className="h-12 w-full" />
            ))}
        </div>
    )

    const listingDetailFixture = (
        <div className="space-y-4 rounded-lg border border-border p-4">
            <Bone className="h-52 w-full" />
            <div className="flex gap-2">
                {Array.from({ length: 5 }).map((_, index) => (
                    <Bone key={`thumb-${index}`} className="h-12 w-12" />
                ))}
            </div>
            <Bone className="h-7 w-3/4" />
            <Bone className="h-6 w-32" />
            <Bone className="h-4 w-full" />
            <Bone className="h-20 w-full" />
        </div>
    )

    const profileViewFixture = (
        <div className="space-y-4 rounded-lg border border-border p-4">
            <Bone className="h-24 w-full" />
            <div className="flex gap-4">
                <Bone className="h-20 w-20 rounded-full" />
                <div className="flex-1 space-y-2">
                    <Bone className="h-6 w-36" />
                    <Bone className="h-4 w-28" />
                    <Bone className="h-4 w-48" />
                </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                    <Bone key={`profile-stat-${index}`} className="h-14 w-full" />
                ))}
            </div>
        </div>
    )

    const profileEditFixture = (
        <div className="space-y-4 rounded-lg border border-border p-4">
            <Bone className="h-8 w-44" />
            <div className="flex gap-3">
                <Bone className="h-20 w-20 rounded-full" />
                <Bone className="h-20 flex-1" />
            </div>
            {Array.from({ length: 6 }).map((_, index) => (
                <div key={`field-${index}`} className="space-y-2">
                    <Bone className="h-4 w-28" />
                    <Bone className="h-10 w-full" />
                </div>
            ))}
        </div>
    )

    return (
        <main className="space-y-8 px-6 py-8">
            <header>
                <h1 className="text-2xl font-bold">Boneyard Bone Capture Preview</h1>
                <p className="text-sm text-muted-foreground">
                    Dev-only route used by boneyard CLI to snapshot named loading states.
                </p>
            </header>

            <div className="space-y-10">
                {section('Admin Layout Shell', 'admin-layout-shell', adminLayoutFixture)}
                {section(
                    'Club Management Layout Shell',
                    'club-management-layout-shell',
                    clubLayoutFixture,
                )}
                {section('Admin Dashboard Loading', 'admin-dashboard-loading', dashboardFixture)}
                {section('Admin Users Table Loading', 'admin-users-table-loading', tableFixture)}
                {section(
                    'Admin Launch Interest Loading',
                    'admin-launch-interest-loading',
                    embeddedFrameFixture,
                )}
                {section(
                    'Admin Monitoring Loading',
                    'admin-monitoring-loading',
                    centeredLoaderFixture,
                )}
                {section('Club List Loading', 'club-list-loading', clubListFixture)}
                {section('Club Feed Loading', 'club-feed-loading', feedFixture)}
                {section('Club Rides Loading', 'club-rides-loading', ridesFixture)}
                {section(
                    'Club Marketplace Loading',
                    'club-marketplace-loading',
                    marketplaceGridFixture,
                )}
                {section('Club Detail Loading', 'club-detail-loading', clubDetailFixture)}
                {section('Club Manage Loading', 'club-manage-loading', manageFixture)}
                {section(
                    'Marketplace Listing Detail Loading',
                    'marketplace-listing-detail-loading',
                    listingDetailFixture,
                )}
                {section('Profile View Loading', 'profile-view-loading', profileViewFixture)}
                {section('Profile Edit Loading', 'profile-edit-loading', profileEditFixture)}
            </div>
        </main>
    )
}
