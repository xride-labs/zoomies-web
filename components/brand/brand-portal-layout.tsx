'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  BarChart3,
  Settings,
  LogOut,
  Shield,
  Bell,
  Store,
  Tag,
  CreditCard,
  Ticket,
  MessageCircle,
  Users,
  Wrench,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth, hasAnyRole } from '@/lib/use-auth'
import { signOut } from '@/lib/auth-client'
import { useEffect } from 'react'
import { BoneyardLoadingState } from '@/components/loading/boneyard-loading-state'

const navigation = [
  { name: 'Dashboard', href: '/brand/dashboard', icon: LayoutDashboard },
  { name: 'Messages', href: '/brand/messages', icon: MessageCircle },
  { name: 'Products', href: '/brand/products', icon: Package },
  { name: 'Services', href: '/brand/services', icon: Wrench },
  { name: 'Marketplace', href: '/brand/marketplace', icon: ShoppingBag },
  { name: 'Campaigns', href: '/brand/campaigns', icon: Tag },
  { name: 'Discounts', href: '/brand/discounts', icon: Ticket },
  { name: 'Analytics', href: '/brand/analytics', icon: BarChart3 },
  { name: 'Team', href: '/brand/team', icon: Users },
  { name: 'Billing', href: '/brand/billing', icon: CreditCard },
  { name: 'Settings', href: '/brand/settings', icon: Settings },
]

export function BrandPortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, hasSession, isPending, error } = useAuth()

  const hasBrandAccess = hasAnyRole(user, 'BRAND_OWNER', 'BRAND_ADMIN', 'BRAND_MODERATOR', 'ADMIN', 'CO_ADMIN')
  const isAdmin = hasAnyRole(user, 'ADMIN', 'CO_ADMIN')

  useEffect(() => {
    if (isPending) return
    if (!hasSession) { router.push('/login'); return }
    if (!user) return
    if (!hasBrandAccess) { router.push('/login'); return }
  }, [user, hasSession, isPending, router, hasBrandAccess, error])

  if (isPending || (hasSession && !user)) {
    return (
      <BoneyardLoadingState
        name="brand-portal-layout-shell"
        fallback={
          <div className="min-h-screen bg-background flex">
            <aside className="hidden lg:flex lg:w-72 lg:flex-col border-r border-border bg-card">
              <div className="flex h-16 items-center gap-2 px-6 border-b border-border">
                <Skeleton className="w-10 h-10 rounded-xl" />
                <Skeleton className="h-6 w-24" />
              </div>
              <div className="flex-1 p-4 space-y-2">
                {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-full rounded-2xl" />)}
              </div>
            </aside>
            <main className="flex-1 p-6">
              <Skeleton className="h-10 w-48 mb-6" />
              <div className="grid gap-4 md:grid-cols-3">
                {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-40 rounded-xl" />)}
              </div>
            </main>
          </div>
        }
      />
    )
  }

  if (!user || !hasBrandAccess) return null

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:flex lg:w-72 lg:flex-col border-r border-border bg-card">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 px-6 border-b border-border">
          <div className="w-10 h-10 bg-linear-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.3)]">
            <Store className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-sm font-bold text-foreground uppercase tracking-wide">Brand Portal</span>
            <p className="text-[10px] text-muted-foreground">Zoomies for Business</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/brand/dashboard' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all duration-300',
                  isActive
                    ? 'bg-amber-500 text-white'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted',
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Actions */}
        <div className="p-4 border-t border-border space-y-2">
          {isAdmin && (
            <Button
              className="w-full justify-start gap-2"
              variant="outline"
              onClick={() => router.push('/admin')}
            >
              <Shield className="w-4 h-4" />
              Admin Portal
            </Button>
          )}
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-destructive hover:text-destructive"
            onClick={() => signOut().then(() => router.push('/login'))}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-border">
          <Link href="/brand/settings" className="flex items-center gap-3 p-2 rounded-2xl hover:bg-muted transition-colors">
            <Avatar>
              <AvatarFallback className="bg-amber-500 text-white">
                {user.name?.charAt(0) || user.email?.charAt(0) || 'B'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{user.name || 'Brand Owner'}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Top Header */}
        <header className="sticky top-0 z-40 h-16 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="flex items-center justify-between h-full px-4 lg:px-6">
            <Link href="/brand/dashboard" className="flex items-center gap-2 lg:hidden">
              <div className="w-8 h-8 bg-linear-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Store className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-foreground">Brand Portal</span>
            </Link>

            <div className="hidden lg:block">
              <h1 className="text-xl font-semibold">
                {navigation.find((n) => pathname === n.href || (n.href !== '/brand/dashboard' && pathname.startsWith(n.href)))?.name || 'Brand Portal'}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              {isAdmin && (
                <Button variant="outline" className="inline-flex items-center gap-2 h-9 px-3" onClick={() => router.push('/admin')}>
                  <Shield className="w-4 h-4" />
                  <span className="hidden sm:inline">Admin</span>
                </Button>
              )}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

        <main className="pb-20 lg:pb-0">{children}</main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background border-t border-border">
        <div className="flex items-center justify-around h-16">
          {navigation.slice(0, 5).map((item) => {
            const isActive = pathname === item.href || (item.href !== '/brand/dashboard' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn('flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors', isActive ? 'text-amber-500' : 'text-muted-foreground')}
              >
                <item.icon className={cn('w-5 h-5', isActive && 'stroke-[2.5px]')} />
                <span className="text-[10px] font-medium">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
