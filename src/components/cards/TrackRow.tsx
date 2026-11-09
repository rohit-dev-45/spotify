import { useToggleLikeTrack } from "@/hooks/useToggleLikeTrack";
import { ui } from "@/lib/styles";
import { usePlayerStore } from "@/store/playerStore";
import { Track } from "@/types";
import { cn } from "cn";
import { PlayingIndicator } from "../ui/PlayingIndicator";
import { Heart, Pause, Play } from "lucide-react";
import { CoverImage } from "../ui/CoverImage";
import Link from "next/link";
import { formatDateAdded, formatDuration } from "@/lib/utils";
import { AddToPlaylistMenu } from "../playlist/AddToPlaylistMenu";

interface TrackRowProps {
    track: Track;
    index: number;
    queue: Track[];
    showAlbum?: boolean;
    showCover?: boolean;
    showDateAdded?: boolean;
}

export function TrackRow({
    track,
    index,
    queue,
    showAlbum = true,
    showCover = true,
    showDateAdded = true,
}: TrackRowProps) {
    const isCurrent = usePlayerStore((s) => s.currentTrack?.id === track.id);
    const isPlaying = usePlayerStore((s) => s.isPlaying && isCurrent);
    const { play, togglePlay } = usePlayerStore((s) => s.actions);
    const { liked, toggle: handleToggleLike } = useToggleLikeTrack(track);

    const handlePlay = () => {
        if (isCurrent) togglePlay();
        else play(track, queue);
    };

    const gridClasses = cn(
        "grid-cols-[40px_1fr_80px]",
        showAlbum &&
            "md:grid-cols-[40px_minmax(0,4fr)_minmax(0,3fr)_minmax(0,1fr)]",
        showAlbum &&
            showDateAdded &&
            "lg:grid-cols-[40px_minmax(0,4fr)_minmax(0,3fr)_minmax(0,2fr)_minmax(0,1fr)]",
    );

    return (
        <div
            role="row"
            onDoubleClick={handlePlay}
            className={cn(ui.trackRow, gridClasses)}
        >
            <div className="flex items-center justify-center">
                {isCurrent ? (
                    <button
                        type="button"
                        onClick={handlePlay}
                        aria-label={isPlaying ? "Pause" : "Play"}
                        className="flex h-4 w-4 items-center justify-center text-spotify-green"
                    >
                        <span className="block group-hover:hidden">
                            {isPlaying ? (
                                <PlayingIndicator playing />
                            ) : (
                                <span className="font-mono text-sm tabular-nums text-spotify-green">
                                    {index + 1}
                                </span>
                            )}
                        </span>
                        <span className="hidden group-hover:block">
                            {isPlaying ? (
                                <Pause
                                    size={14}
                                    className="fill-white text-white"
                                />
                            ) : (
                                <Play
                                    size={14}
                                    className="fill-white text-white translate-x-[1px]"
                                />
                            )}
                        </span>
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={handlePlay}
                        aria-label={`Play ${track.title}`}
                        className="flex h-4 w-4 items-center justify-center"
                    >
                        <span className="block group-hover:hidden font-mono tabular-nums">
                            {index + 1}
                        </span>
                        <Play
                            size={14}
                            className="hidden fill-white text-white translate-x-[1px] group-hover:block"
                        />
                    </button>
                )}
            </div>

            {/* Title + artist column */}
            <div className="flex min-w-0 items-center gap-3">
                {showCover && (
                    <CoverImage
                        src={track.coverUrl}
                        alt=""
                        size={40}
                        shape="square"
                        sizes="40px"
                    />
                )}
                <div className="min-w-0">
                    <p
                        className={cn(
                            "truncate text-base",
                            isCurrent
                                ? "text-spotify-green font-medium"
                                : "text-text-base",
                        )}
                    >
                        {track.title}
                    </p>
                    <div className="flex items-center gap-1.5">
                        {track.explicit && (
                            <span className="rounded-sm bg-white/40 px-1 py-px text-[10px] font-bold leading-none text-black">
                                E
                            </span>
                        )}
                        <Link
                            href={`/artist/${track.artistId}`}
                            className={ui.trackMetaLink}
                        >
                            {track.artist}
                        </Link>
                    </div>
                </div>
            </div>

            {showAlbum && (
                <Link
                    href={`/album/${track.albumId}`}
                    className={cn("hidden truncate md:block", ui.trackMetaLink)}
                >
                    {track.album}
                </Link>
            )}

            {showDateAdded && (
                <span className="hidden truncate text-sm lg:block">
                    {track.addedAt ? formatDateAdded(track.addedAt) : "-"}
                </span>
            )}

            <div className="flex items-center justify-end gap-2 sm:gap-3">
                <button
                    type="button"
                    aria-label={
                        liked
                            ? "Remove from liked songs"
                            : "Save to liked songs"
                    }
                    onClick={handleToggleLike}
                    className={cn(
                        "hidden sm:inline-flex transition",
                        liked
                            ? "text-spotify-green opacity-100"
                            : "opacity-0 group-hover:opacity-100 hover:text-text-base",
                    )}
                >
                    <Heart size={16} className={liked ? ui.heartActive : ""} />
                </button>
                <span className="font-mono tabular-nums text-xs sm:text-sm">
                    {formatDuration(track.duration)}
                </span>
                <AddToPlaylistMenu track={track} />
            </div>
        </div>
    );
}
