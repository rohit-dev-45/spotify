"use client";

import { useRouter } from "next/navigation";
import { useScrollContainer } from "../layout/scroll-context";
import { useSession } from "next-auth/react";
import { useToastStore } from "@/store/toastStore";
import { useState, useTransition } from "react";
import { useLibraryStore } from "@/store/libraryStore";
import { createPlaylist } from "@/lib/actions/playlists";
import { Header } from "../layout/Header";
import { ui } from "@/lib/styles";
import { Plus, SearchIcon } from "lucide-react";
import { LibraryFilterBar } from "./LibraryFilterBar";
import { LibraryRow } from "./LibraryRow";

export function LibraryContent() {
    const { scrollRef } = useScrollContainer();
    const router = useRouter();
    const { data: session } = useSession();
    const pushToast = useToastStore((s) => s.push);
    const [pending, startTransition] = useTransition();
    const filter = useLibraryStore((s) => s.filter);
    const setFilter = useLibraryStore((s) => s.setFilter);
    const rows = useLibraryStore((s) => s.rows);
    const [query, setQuery] = useState("");

    const filtered = rows.filter((r) => {
        if (filter !== "all") {
            if (
                filter === "playlists" &&
                r.kind !== "playlist" &&
                r.kind !== "liked"
            )
                return false;
            if (filter === "albums" && r.kind !== "album") return false;
            if (filter === "artists" && r.kind !== "artist") return false;
        }
        if (query.trim()) {
            const q = query.toLowerCase();
            return (
                r.title.toLowerCase().includes(q) ||
                r.subtitle.toLowerCase().includes(q)
            );
        }
        return true;
    });

    const onCreatePlaylist = () => {
        if (!session?.user) {
            pushToast("Log In To Create a Playlist");
            router.push("/login");
            return;
        }
        startTransition(async () => {
            try {
                const { id } = await createPlaylist();
                pushToast("Playlist Created");
                router.push(`/playlist/${id}`);
                router.refresh();
            } catch (err) {
                pushToast(
                    err instanceof Error && err.message === "unauthorized"
                        ? "Please Log In First."
                        : "Could Not Create Playlist",
                );
            }
        });
    };

    return (
        <>
            <Header
                scrollContainerRef={
                    scrollRef as React.RefObject<HTMLElement | null>
                }
                accent="#121212"
            />
            <div className={ui.pagePadding}>
                <div className="mb-6 flex items-center justify-between gap-3">
                    <h1 className="text-2xl font-black text-text-base sm:text-3xl">
                        Your Library
                    </h1>
                    <button
                        type="button"
                        disabled={pending}
                        onClick={onCreatePlaylist}
                        className={ui.newPlaylistBtn}
                    >
                        <Plus size={16} /> New Playlist
                    </button>
                </div>

                <LibraryFilterBar
                    filter={filter}
                    onFilterChange={setFilter}
                    className="mb-4"
                    trailing={
                        <label className="relative order-last w-full sm:order-0 sm:ml-auto sm:w-auto">
                            <SearchIcon
                                size={16}
                                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-subdued"
                            />
                            <input
                                type="search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search In Your Library"
                                aria-label="Search in your library"
                                className={ui.librarySearchInput}
                            />
                        </label>
                    }
                />

                <ul className="flex flex-col">
                    {filtered.map((row) => (
                        <li key={`${row.kind}-${row.id}`}>
                            <LibraryRow row={row} />
                        </li>
                    ))}
                    {filtered.length === 0 && (
                        <li className="py-12 text-center text-sm text-text-subdued">
                            {session?.user
                                ? 'Nothing Here Yet, Hit "New Playlist" To Create One.'
                                : "Log In To See Your Library."}
                        </li>
                    )}
                </ul>
            </div>
        </>
    );
}
