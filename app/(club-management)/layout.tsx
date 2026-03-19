import { AppLayout } from '@/components/app/app-layout'

export default function ClubManagementLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppLayout>{children}</AppLayout>
  )
}
