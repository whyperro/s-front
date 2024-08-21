import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import QueryClientProvider from "@/providers/query-provider";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Roboto({ subsets: ["latin"], weight: ["100", "300", "400", "500", "700", "900"] });

export const metadata: Metadata = {
  title: "SIGEAC",
  description: "Sistema de Gestión Aeronáutica Civil",
};

export default function RootLayout({
  children, 
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <link rel="icon" href="/logo.png" sizes="any" />
        <QueryClientProvider>
          <AuthProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                {children}
                <Toaster />
              </ThemeProvider>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
