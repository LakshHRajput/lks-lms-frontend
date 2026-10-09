"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query/query-client";
import { AuthProvider } from "@/lib/auth/auth-context";
import { ThemeProvider } from "next-themes";

interface ProvidersProps {
children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
return ( <QueryClientProvider client={queryClient}> <AuthProvider> <ThemeProvider
       attribute="class"
       forcedTheme="light"
       defaultTheme="light"
       enableSystem={false}
       disableTransitionOnChange
     >
{children} </ThemeProvider> </AuthProvider> </QueryClientProvider>
);
}
