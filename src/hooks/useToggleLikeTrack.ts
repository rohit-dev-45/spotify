"use client";

import { toggleLikeTrack as toggleLikeTrackAction } from "@/lib/actions/library";
import { useLibraryStore } from "@/store/libraryStore";
import { useToastStore } from "@/store/toastStore";
import { Track } from "@/types";
import { useTransition } from "react";

export function useToggleLikeTrack(track: Track | null | undefined) {
    const liked = useLibraryStore((s) =>
        track ? s.likedTrackIds.includes(track.id) : false,
    );
    const toggleLike = useLibraryStore((s) => s.toggleLikeTrack);
    const pushToast = useToastStore((s) => s.push);
    const [, startTransition] = useTransition();

    const toggle = () => {
        if (!track) return;
        toggleLike(track.id);
        pushToast(liked ? "Removed From Liked Songs" : "Added To Liked Songs");

        startTransition(async () => {
            try {
                await toggleLikeTrackAction({
                    id: track.id,
                    title: track.title,
                    artist: track.artist,
                    artistId: track.artistId,
                    album: track.album,
                    albumId: track.albumId,
                    duration: track.duration,
                    coverUrl: track.coverUrl,
                    audioUrl: track.audioUrl,
                });
            } catch {
                toggleLike(track.id);
                pushToast("Log In To Save Songs");
            }
        });
    };

    return { liked, toggle };
}
