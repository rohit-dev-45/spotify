"use client";

import { useToggleLikeTrack } from "@/hooks/useToggleLikeTrack";
import { usePlayerStore } from "@/store/playerStore";
import { Heart, Link } from "lucide-react";
import { CoverImage } from "../ui/CoverImage";
import { ui } from "@/lib/styles";
import { IconButton } from "../ui/IconButton";
import { Controls } from "../player/Controls";
import { ProgressBar } from "../player/ProgressBar";
import { VolumeControl } from "../player/VolumeControl";

export function PlayerBar() {
    const track = usePlayerStore((s) => s.currentTrack);
    const { liked, toggle: onToggleLike } = useToggleLikeTrack(track);

    return (
        <div className="relative w-full bg-black px-2 pb-2 pt-1 sm:px-4 xl:h-[90px] xl:p-0">
            <div className="flex h-full flex-col justify-center gap-1 xl:grid xl:grid-cols-[1fr_minmax(0,560px)_1fr] xl:items-center xl:gap-4">
                <div className="flex items-center gap-2 sm:gap-3 xl:contents">
                    {/* Left */}
                    <div className="flex min-w-0 flex-1 items-center gap-3 xl:flex-none">
                        {track ? (
                            <>
                                <Link href={`/album/${track.albumId}`}>
                                    <CoverImage
                                        src={track.coverUrl}
                                        alt={track.album}
                                        size={48}
                                        shape="square"
                                        sizes="(max-width: 640px) 48px, 56px"
                                    />
                                </Link>
                                <div className="min-w-0">
                                    <Link
                                        href={`/album/${track.albumId}`}
                                        className={`block ${ui.playerTitle} hover:underline`}
                                    >
                                        {track.title}
                                    </Link>
                                    <Link
                                        href={`/artist/${track.artistId}`}
                                        className={`block ${ui.playerArtist} hover:text-text-base hover:underline`}
                                    >
                                        {track.artist}
                                    </Link>
                                </div>
                                <IconButton
                                    label={
                                        liked
                                            ? "Remove from Liked Songs"
                                            : "Save to Liked Songs"
                                    }
                                    size="sm"
                                    active={liked}
                                    onClick={onToggleLike}
                                >
                                    <Heart
                                        size={16}
                                        className={liked ? ui.heartActive : ""}
                                    />
                                </IconButton>
                            </>
                        ) : (
                            <div className="flex min-w-0 items-center gap-3 text-sm text-text-subdued">
                                <div className="h-12 w-12 shrink-0 rounded bg-bg-elevated-base sm:h-14 sm:w-14" />
                                <div className="min-w-0">
                                    <p
                                        className={`${ui.playerTitle} font-medium`}
                                    >
                                        Nothing Playing
                                    </p>
                                    <p className={ui.playerArtist}>
                                        Pick a Track To Get Started
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Center */}
                    <div className="flex shrink-0 flex-col items-center gap-2">
                        <Controls />
                        <div className="hidden w-full max-w-[560px] xl:block">
                            <ProgressBar />
                        </div>
                    </div>

                    {/* Right */}
                    <div className="flex shrink-0 items-center justify-end xl:flex-none">
                        <VolumeControl />
                    </div>
                </div>

                {/* Full-width */}
                <div className="mx-auto w-full max-w-[720px] xl:hidden">
                    <ProgressBar />
                </div>
            </div>
        </div>
    );
}
