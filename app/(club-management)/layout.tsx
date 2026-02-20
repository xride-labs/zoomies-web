import { Providers } from "@/components/providers";
import { AppLayout } from "@/components/app/app-layout";

export default function ClubManagementLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Providers>
            <AppLayout>{children}</AppLayout>
        </Providers>
    );
}
