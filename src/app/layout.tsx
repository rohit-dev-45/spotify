import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { safeAuth } from "@/lib/auth";
import { SessionProvider } from "@/components/auth/SessionProvider";
import { loadLibrarySnapshot } from "@/lib/actions/library";
import { LibraryHydrator } from "@/components/auth/LibraryHydrator";
import { AppShell } from "@/components/library/AppShell";

const figtree = Figtree({
    variable: "--font-figtree",
    subsets: ["latin"],
    weight: ["400", "500", "700", "900"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Spotify",
    description:
        "A Pixel-Perfect Spotify Web Player Built With Next.js 16, Auth.js, Prisma, And The Deezer API.",
    icons: {
        icon: "/icon.svg",
    },
};

export const viewport: Viewport = {
    themeColor: "#121212",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await safeAuth();
    const librarySnapshot = await loadLibrarySnapshot();

    return (
        <html lang="en" suppressHydrationWarning className={figtree.variable}>
            <body className="bg-black text-white antialiased">
                <SessionProvider session={session}>
                    <LibraryHydrator snapshot={librarySnapshot} />
                    <AppShell>{children}</AppShell>
                </SessionProvider>
            </body>
        </html>
    );
}
