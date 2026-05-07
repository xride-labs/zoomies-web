import type { Metadata } from 'next'
import { ShareRedirect } from '@/components/share/share-redirect'

interface PageProps {
  params: Promise<{ code: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code } = await params
  const title = `@${code} invited you to Zoomies`
  const description =
    'Join the Zoomies community of riders. Discover clubs, organize rides, and shop the marketplace.'
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://zoomies.xride-labs.in/i/${code}`,
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function InviteSharePage({ params }: PageProps) {
  const { code } = await params
  return (
    <ShareRedirect
      kind="invite"
      id={code}
      title={`@${code} invited you to Zoomies`}
      description="Join a community of riders building their tribe on the road. Clubs, rides, marketplace — all in one app."
      meta={[{ label: 'Invited by', value: `@${code}` }]}
    />
  )
}
