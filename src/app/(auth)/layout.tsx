import { SpotifyLogo } from "@/components/ui/SpotifyLogo";
import { ArrowLeft, Headphones, Library, Music2 } from "lucide-react";
import Link from "next/link";
import React from "react";

const BRAND_FEATURES = [
    {
        icon: Music2,
        title: "Stream Millions Of Tracks",
        body: "Real Catalogue Powered By The Deezer API",
    },
    {
        icon: Headphones,
        title: "Pixel-Perfect Player",
        body: "HTML5, Audio, Seek, Repeat, Shuffle, And Volume",
    },
    {
        icon: Library,
        title: "Make It Yours",
        body: "Build Playlists, Like Songs, Follow Artists",
    },
] as const;

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative flex min-h-screen flex-col bg-black text-white lg:flex-row">
            {/* Mobile / Tablet */}
            <header className="flex items-center justify-between border-b border-white/5 px-5 py-4 lg:hidden">
                <Link
                    href="/"
                    aria-label="Back to home"
                    className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-sm font-medium text-text-subdued transition hover:bg-white/10 hover:text-white"
                >
                    <ArrowLeft size={16} />
                </Link>
                <span className="w-[64px]" aria-hidden />
            </header>

            {/* Brand Panel */}
            <aside
                aria-hidden
                className="relative hidden overflow-hidden lg:flex lg:w-1/2 xl:w-[44%]"
            >
                <div className="absolute inset-0 bg-linear-to-br from-spotify-green-bright via-spotify-green-dim to-black" />
                <div className="pointer-events-none absolute -left-32 top-1/3 h-96 rounded-full bg-spotify-green-bright/40 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -right-24 h-112 w-md rounded-full bg-black/60 blur-3xl" />
                <div className="noise pointer-events-none absolute inset-0 opac40" />

                <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">
                    <Link
                        href="/"
                        aria-label="Spotify Clone home"
                        className="group inline-flex items-center gap-3 text-white transition hover:opacity-95"
                    >
                        <SpotifyLogo
                            size={48}
                            className="text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.25)] transition-transform group-hover:scale-105"
                        />
                        <span className="text-2xl font-black tracking-tight text-white">
                            Spotify
                        </span>
                    </Link>

                    <div className="max-w-md">
                        <h2 className="text-4xl font-black leading-tight tracking-tight text-white xl:text-5xl">
                            Listening Is Everything.
                        </h2>
                        <p className="mt-3 text-base text-white/80">
                            Sign In To Stream Real Music, Build Playlists, And
                            Pick Up Right Where You Left Off.
                        </p>

                        <ul className="mt-10 space-y-5">
                            {BRAND_FEATURES.map(
                                ({ icon: Icon, title, body }) => (
                                    <li
                                        key={title}
                                        className="flex items-start gap-4"
                                    >
                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/30 ring-1 ring-white/15 backdrop-blur">
                                            <Icon
                                                size={18}
                                                className="text-white"
                                            />
                                        </span>
                                        <div>
                                            <p className="text-sm font-semibold text-white">
                                                {title}
                                            </p>
                                            <p className="text-sm text-white/70">
                                                {body}
                                            </p>
                                        </div>
                                    </li>
                                ),
                            )}
                        </ul>
                    </div>
                </div>
            </aside>

            <section className="relative flex flex-1 flex-col">
                <Link
                    href="/"
                    className="absolute right-6 top-6 z-10 hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-text-subdued transition hover:bg-white/20 hover:bg-white/10 hover:text-white lg:inline-flex"
                >
                    <ArrowLeft size={14} />
                    Back To Home
                </Link>

                <main className="flex flex-1 items-center justify-center px-5 py-10 sm:px-8 sm:py-14 lg:py-16">
                    <div className="flex w-full max-w-md flex-col gap-7">
                        {children}
                    </div>
                </main>

                <footer className="py-5 pb-6 text-center text-xs text-text-subdued sm:px-8">
                    By Continuing You Agree To Our{" "}
                    <span className="text-white/80">Terms</span> and{" "}
                    <span className="text-white/80">Privacy Policy</span>
                </footer>
            </section>
        </div>
    );
};

export default AuthLayout;
