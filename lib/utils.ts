import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function optimizeImageUrl(url: string | null | undefined, width = 800): string {
  if (!url) {
    // Return a default sleek placeholder image if nothing is provided
    return `https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=${width}&q=80&c=fill`
  }

  if (url.startsWith('data:')) return url

  const idx = url.indexOf('/upload/')
  if (idx === -1 || !url.includes('res.cloudinary.com')) {
    return url
  }

  const before = url.slice(0, idx + 8)
  const after = url.slice(idx + 8)

  if (/^[a-z][a-z0-9]*_/.test(after)) {
    return url
  }

  return `${before}w_${width},c_fill,f_auto,q_auto:good/${after}`
}
