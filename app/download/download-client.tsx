'use client'

import { useEffect, useState } from 'react'
import { ArrowDownToLine } from 'lucide-react'

interface DownloadClientProps {
  apkHref: string
}

const isAndroid = () =>
  typeof navigator !== 'undefined' && /android/i.test(navigator.userAgent)

export function DownloadClient({ apkHref }: DownloadClientProps) {
  const [android, setAndroid] = useState(false)

  useEffect(() => {
    setAndroid(isAndroid())
  }, [])

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
      <a
        href={apkHref}
        download
        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-teal text-canvas font-semibold py-4 px-6 transition-all hover:scale-[1.02] hover:bg-brand-teal/90"
      >
        <ArrowDownToLine size={18} />
        Download APK
      </a>

      {!android ? (
        <p className="text-sm text-white/50 max-w-sm">
          We detected you&apos;re not on Android. The APK only installs on Android devices —
          open this page on your phone to install.
        </p>
      ) : null}
    </div>
  )
}
