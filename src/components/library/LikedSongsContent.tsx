"use client";

import { Track } from "@/types";
import { useScrollContainer } from "../layout/scroll-context";
import { formatLongDuration, totalDuration } from "@/lib/utils";
import { useCollectionPlayback } from "@/hooks/useCollectionPlayback";
import { Header } from "../layout/Header";
import { PlayButton } from "../player/PlayButton";
import {
    CollectionAccentBackground,
    CollectionActions,
    CollectionHero,
    EmptyCollectionState,
    MetaSep,
} from "../collection/CollectionPage";
import { LikedSongsCover } from "../ui/LikedSongsCover";
import { TrackList } from "../cards/TrackList";

const ACCENT = "#23163a";

interface Props {
    tracks: Track[];
    ownerName: string;
}

export function LikedSongsContent({ tracks, ownerName }: Props) {
    const { scrollRef } = useScrollContainer();
    const total = totalDuration(tracks);
    const { isPlayingThis, onHeaderPlay } = useCollectionPlayback(tracks);

    return (
        <>
            <Header
                scrollContainerRef={
                    scrollRef as React.RefObject<HTMLElement | null>
                }
                accent={ACCENT}
                stickyContent={
                    <>
                        <PlayButton
                            playing={isPlayingThis}
                            onClick={onHeaderPlay}
                            size="md"
                        />
                        <span className="text-base font-bold">Liked Songs</span>
                    </>
                }
            />

            <CollectionHero
                kind="playlist"
                title="Liked Songs"
                accent={ACCENT}
                coverNode={
                    <LikedSongsCover className="h-full w-full" iconSize={64} />
                }
                meta={
                    <>
                        <span className="font-bold">{ownerName}</span>
                        <MetaSep />
                        <span className="text-text-subdued">
                            {tracks.length}{" "}
                            {tracks.length === 1 ? "Song" : "Songs"},{" "}
                            <span className="text-text-base">
                                {formatLongDuration(total)}
                            </span>
                        </span>
                    </>
                }
            />

            <CollectionAccentBackground accent={ACCENT}>
                <CollectionActions tracks={tracks} />
                {tracks.length > 0 ? (
                    <TrackList tracks={tracks} />
                ) : (
                    <EmptyCollectionState>
                        You Haven't Liked Any Songs Yet. Hit The Heart On Any
                        Track To See It Here.
                    </EmptyCollectionState>
                )}
            </CollectionAccentBackground>
        </>
    );
}
