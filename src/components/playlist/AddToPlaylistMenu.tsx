"use client";

import { addTrackToPlaylist, createPlaylist } from "@/lib/actions/playlists";
import { useLibraryStore } from "@/store/libraryStore";
import { useToastStore } from "@/store/toastStore";
import { Track } from "@/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Menu } from "../ui/Menu";
import { ListPlus, MoreHorizontal, Plus } from "lucide-react";
import { ui } from "@/lib/styles";

interface Props {
    track: Track;
}

export function AddToPlaylistMenu({ track }: Props) {
    const { data: session } = useSession();
    const router = useRouter();
    const rows = useLibraryStore((s) => s.rows);
    const pushToast = useToastStore((s) => s.push);
    const [pending, startTransition] = useTransition();

    const userPlaylists = rows.filter(
        (r) => r.kind === "playlist" && r.ownedByMe,
    );

    const trackPayload = {
        id: track.id,
        title: track.title,
        artist: track.artist,
        artistId: track.artistId,
        album: track.album,
        albumId: track.albumId,
        duration: track.duration,
        coverUrl: track.coverUrl,
        audioUrl: track.audioUrl,
    };

    const addExisting = (playlistId: string, close: () => void) => {
        close();
        startTransition(async () => {
            try {
                await addTrackToPlaylist({ playlistId, track: trackPayload });
                pushToast("Added To Playlist.");
                router.refresh();
            } catch {
                pushToast("Could Not Add To Playlist");
            }
        });
    };

    const addToNew = (close: () => void) => {
        close();
        startTransition(async () => {
            try {
                const { id } = await createPlaylist();
                await addTrackToPlaylist({
                    playlistId: id,
                    track: trackPayload,
                });
                pushToast("Playlist Created");
                router.push(`/playlist/${id}`);
                router.refresh();
            } catch {
                pushToast("Could Not Create Playlist");
            }
        });
    };

    return (
        <Menu
            panelClassName="right-0 top-7 w-60"
            trigger={({
                onClick,
                "aria-haspopup": haspopup,
                "aria-expanded": expanded,
            }) => (
                <button
                    type="button"
                    aria-label="More options"
                    aria-haspopup={haspopup}
                    aria-expanded={expanded}
                    disabled={pending}
                    onClick={() => {
                        if (!session?.user) {
                            pushToast("Log In To Add Track To a Playlist");
                            router.push("/login");
                            return;
                        }
                        onClick();
                    }}
                    className="hidden opacity-0 transition group-hover:opacity-100 hover:text-text-base sm:inline-flex"
                >
                    <MoreHorizontal size={18} />
                </button>
            )}
        >
            {(close) => (
                <>
                    <button
                        type="button"
                        role="menuitem"
                        onClick={() => addToNew(close)}
                        className={ui.menuItem}
                    >
                        <Plus size={16} /> New Playlist With This Track
                    </button>
                    {userPlaylists.length > 0 && (
                        <>
                            <hr className="my-1 border-white/10" />
                            <div className="px-3 pb-1 pt-1 text-xs uppercase tracking-wide text-text-subdued">
                                Your Playlists
                            </div>
                            <div className="max-h-56 overflow-y-auto">
                                {userPlaylists.map((p) => (
                                    <button
                                        key={p.id}
                                        type="button"
                                        role="menuitem"
                                        onClick={() => addExisting(p.id, close)}
                                        className={ui.menuItem}
                                    >
                                        <ListPlus size={16} />
                                        <span className="truncate">
                                            {p.title}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </>
            )}
        </Menu>
    );
}
