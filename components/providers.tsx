"use client";

import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/store";

interface ProvidersProps {
    children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    return (
        <ReduxProvider store={store}>{children}</ReduxProvider>
    );
}
