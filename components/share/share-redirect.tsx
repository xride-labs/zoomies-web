'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowDownToLine, Smartphone, ChevronRight } from 'lucide-react'

export type ShareKind = 'ride' | 'listing' | 'club' | 'invite'

interface ShareRedirectProps {
  kind: ShareKind
  /** Item id (rideId, listingId, clubId, or inviter username for invite) */
  id: string
  title: string
  /** Short tagline shown under the title */
  description?: string
  /** Optional preview image URL */
  imageUrl?: string | null
  /** Optional metadata bullets shown above the buttons */
  meta?: Array<{ label: string; value: string }>
}

const SEGMENT_BY_KIND: Record<ShareKind, string> = {
  ride: 'r',
  listing: 'm',
  club: 'c',
  invite: 'i',
}

const APP_SCHEME = 'zoomies'

const KIND_COPY: Record<ShareKind, { ctaApp: string; ctaWeb: string; emoji: string }> = {
  ride: {
    ctaApp: 'Open Ride in App',
    ctaWeb: 'Get the App to Join',
    emoji: '🏍️',
  },
  listing: {
    ctaApp: 'Open Listing in App',
    ctaWeb: 'Get the App to Buy',
    emoji: '🛒',
  },
  club: {
    ctaApp: 'Open Club in App',
    ctaWeb: 'Get the App to Join',
    emoji: '👥',
  },
  invite: {
    ctaApp: 'Continue in App',
    ctaWeb: 'Download Zoomies',
    emoji: '⚡',
  },
}

export function ShareRedirect({
  kind,
  id,
  title,
  description,
  imageUrl,
  meta,
}: ShareRedirectProps) {
  const [attempted, setAttempted] = useState(false)
  const segment = SEGMENT_BY_KIND[kind]
  const deepLink = `${APP_SCHEME}://${segment}/${id}`
  const copy = KIND_COPY[kind]

  // Auto-attempt the deep link once on mount. If the app is installed,
  // it'll open and this page becomes a no-op. If not, the page stays
  // and the user sees the Download CTA below.
  useEffect(() => {
    if (typeof window === 'undefined' || attempted) return
    setAttempted(true)
    const t = window.setTimeout(() => {
      try {
        window.location.href = deepLink
      } catch {
        /* noop — most likely scheme isn't registered on this device */
      }
    }, 250)
    return () => window.clearTimeout(t)
  }, [attempted, deepLink])

  return (
    <main className="min-h-screen bg-canvas text-white flex flex-col items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden">
          {imageUrl ? (
            <div
              className="h-44 w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
          ) : (
            <div className="h-32 w-full bg-linear-to-br from-brand-red-light to-brand-red flex items-center justify-center">
              <span className="text-5xl" aria-hidden>
                {copy.emoji}
              </span>
            </div>
          )}

          <div className="p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50 font-medium">
              Shared on Zoomies
            </p>
            <h1 className="mt-2 text-2xl font-bold leading-tight">{title}</h1>
            {description ? (
              <p className="mt-2 text-sm text-white/70 leading-relaxed">{description}</p>
            ) : null}

            {meta && meta.length > 0 ? (
              <ul className="mt-4 space-y-1.5">
                {meta.map((m) => (
                  <li key={m.label} className="text-sm text-white/70 flex gap-2">
                    <span className="text-white/40 min-w-[80px]">{m.label}</span>
                    <span className="text-white/90">{m.value}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-6 flex flex-col gap-3">
              <a
                href={deepLink}
                className="flex items-center justify-center gap-2 rounded-2xl bg-brand-teal text-canvas font-semibold py-3.5 transition-all hover:scale-[1.02] hover:bg-brand-teal/90"
              >
                <Smartphone size={18} />
                {copy.ctaApp}
              </a>

              <Link
                href="/download"
                className="flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 text-white font-semibold py-3.5 transition-all hover:bg-white/10"
              >
                <ArrowDownToLine size={18} />
                {copy.ctaWeb}
              </Link>
            </div>

            <p className="mt-5 text-center text-xs text-white/40">
              The app should open automatically. If nothing happened, tap{' '}
              <span className="text-white/70 font-medium">{copy.ctaApp}</span> above.
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs text-white/40 hover:text-white/70 transition-colors inline-flex items-center gap-1"
          >
            Back to zoomies.xride-labs.in
            <ChevronRight size={12} />
          </Link>
        </div>
      </motion.div>
    </main>
  )
}
