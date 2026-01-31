import { Providers } from "@/components/providers";
import { AdminLayout } from "@/components/admin/admin-layout";

export default function AdminRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Providers>
            <AdminLayout>{children}</AdminLayout>
        </Providers>
    );
}
