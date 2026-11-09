"use client";

import { Playlist } from "@/types";
import { useScrollContainer } from "../layout/scroll-context";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { useToastStore } from "@/store/toastStore";
import {
    formatLongDuration,
    formatNumber,
    pickAccentHex,
    totalDuration,
} from "@/lib/utils";
import { useCollectionPlayback } from "@/hooks/useCollectionPlayback";
import {
    CollectionAccentBackground,
    CollectionActions,
    CollectionHero,
    EmptyCollectionState,
    MetaLink,
    MetaSep,
    MoreMenuItem,
} from "../collection/CollectionPage";
import { Pencil, Trash2 } from "lucide-react";
import { deletePlaylist } from "@/lib/actions/playlists";
import { Header } from "../layout/Header";
import { PlayButton } from "../player/PlayButton";
import { PlaylistCover } from "../ui/PlaylistCover";
import { TrackList } from "../cards/TrackList";
import { ui } from "@/lib/styles";
import { RenamePlaylistDialog } from "./RenamePlaylistDialog";

interface Props {
    playlist: Playlist;
    ownedByMe?: boolean;
}

export function PlaylistContent({ playlist, ownedByMe = false }: Props) {
    const { scrollRef } = useScrollContainer();
    const router = useRouter();
    const [pending, startTransition] = useTransition();
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [renameOpen, setRenameOpen] = useState(false);
    const pushToast = useToastStore((s) => s.push);

    const accent = useMemo(() => pickAccentHex(playlist.id), [playlist.id]);
    const total = totalDuration(playlist.tracks);
    const { isPlayingThis, onHeaderPlay } = useCollectionPlayback(
        playlist.tracks,
    );

    // Owner-only
    const extramenuItems = useMemo<MoreMenuItem[]>(
        () =>
            ownedByMe
                ? [
                      {
                          label: "Edit Details",
                          icon: <Pencil size={16} />,
                          onClick: () => setRenameOpen(true),
                      },
                  ]
                : [],
        [ownedByMe],
    );

    const onDelete = () => {
        if (!confirmDelete) {
            setConfirmDelete(true);
            window.setTimeout(() => setConfirmDelete(false), 4000);
            return;
        }

        startTransition(async () => {
            try {
                await deletePlaylist(playlist.id);
                pushToast("Playlist Deleted");
                router.push("/library");
                router.refresh();
            } catch {
                pushToast("Could Not Delete Playlist");
            }
        });
    };

    return (
        <>
            <Header
                scrollContainerRef={
                    scrollRef as React.RefObject<HTMLElement | null>
                }
                accent={accent}
                stickyContent={
                    <>
                        <PlayButton
                            playing={isPlayingThis}
                            onClick={onHeaderPlay}
                            size="md"
                        />
                        <span className="text-base font-bold">
                            {playlist.title}
                        </span>
                    </>
                }
            />

            <CollectionHero
                kind="Playlist"
                title={playlist.title}
                description={playlist.description}
                coverUrl={playlist.coverUrl}
                coverNode={
                    playlist.coverUrl ? undefined : (
                        <PlaylistCover
                            className="h-full w-full"
                            iconSize={64}
                        />
                    )
                }
                accent={accent}
                meta={
                    <>
                        <MetaLink href="/">{playlist.owner}</MetaLink>
                        {playlist.followers > 0 && (
                            <>
                                <MetaSep />
                                <span className="text-text-subdued">
                                    {formatNumber(playlist.followers)} Likes
                                </span>
                            </>
                        )}
                        <MetaSep />
                        <span className="text-text-subdued">
                            {playlist.tracks.length} songs,{" "}
                            <span className="text-text-base">
                                {formatLongDuration(total)}
                            </span>
                        </span>
                    </>
                }
            />

            <CollectionAccentBackground accent={accent}>
                <div className="flex items-center justify-between gap-3 pr-4 sm:pr-6">
                    <CollectionActions
                        tracks={playlist.tracks}
                        save={
                            ownedByMe
                                ? undefined
                                : {
                                      kind: "playlist",
                                      id: playlist.id,
                                      label: {
                                          saved: "Added To Your Library",
                                          unsaved: "Removed From Your Library",
                                      },
                                  }
                        }
                        extraMenuItems={extramenuItems}
                    />

                    {ownedByMe && (
                        <button
                            type="button"
                            onClick={onDelete}
                            disabled={pending}
                            className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold transform ${
                                confirmDelete
                                    ? "border-red-400 bg-red-500/15 text-red-200"
                                    : "border-white/20 text-text-subdued hover:border-white/60 hover:text-text-base"
                            }`}
                        >
                            <Trash2 size={16} />
                            {confirmDelete
                                ? "Click To Confirm"
                                : "Delete Playlist"}
                        </button>
                    )}
                </div>
                {playlist.tracks.length > 0 ? (
                    <TrackList tracks={playlist.tracks} />
                ) : (
                    <EmptyCollectionState>
                        This Playlist Is Empty. Find a Song You Like And Hit The
                        Menu On The Track Row To Add It Here.
                    </EmptyCollectionState>
                )}
                <div className={ui.collectionFooter}>
                    <p>&copy; {new Date().getFullYear()} - Spotify</p>
                </div>
            </CollectionAccentBackground>

            {ownedByMe && (
                <RenamePlaylistDialog
                    open={renameOpen}
                    onClose={() => setRenameOpen(false)}
                    playlistId={playlist.id}
                    initialName={playlist.title}
                    initialDescription={playlist.description}
                />
            )}
        </>
    );
}
