import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { safeAuth } from "@/lib/auth";
import { SessionProvider } from "@/components/auth/SessionProvider";

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

export default async function RootLayout({ children }: LayoutProps<"/">) {
    const session = await safeAuth();

    return (
        <html lang="en" className={figtree.variable}>
            <body className="bg-black text-white antialiased">
                <SessionProvider session={session}>{children}</SessionProvider>
            </body>
        </html>
    );
}
