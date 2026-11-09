import { PlaylistContent } from "@/components/playlist/PlaylistContent";
import { getMyPlaylist } from "@/lib/actions/playlists";
import { getPlaylistDetail } from "@/lib/catalogues";
import { Playlist } from "@/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

type PlaylistPageProps = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({
    params,
}: PlaylistPageProps): Promise<Metadata> {
    const { id } = await params;
    const fromCatalogue = await getPlaylistDetail(id);
    if (fromCatalogue) {
        return {
            title: fromCatalogue.title,
            description:
                fromCatalogue.description ||
                `Playlist By ${fromCatalogue.owner} On Spotify.`,
        };
    }

    const mine = await getMyPlaylist(id);
    if (mine) {
        return {
            title: mine.name,
            description: mine.description ?? "Your Playlist On Spotify.",
        };
    }

    return { title: "Playlist Not Found" };
}

const PlaylistPage = async ({ params }: PlaylistPageProps) => {
    const { id } = await params;
    const fromCatalogue = await getPlaylistDetail(id);
    if (fromCatalogue) {
        return <PlaylistContent playlist={fromCatalogue} />;
    }

    const mine = await getMyPlaylist(id);
    if (!mine) notFound();
    const playlist: Playlist = {
        id: mine.id,
        title: mine.name,
        description: mine.description ?? "",
        coverUrl: mine.coverUrl ?? mine.tracks[0]?.coverUrl ?? undefined,
        owner: mine.ownerName ?? "You",
        followers: 0,
        tracks: mine.tracks,
        isPublic: false,
    };
    return <PlaylistContent playlist={playlist} ownedByMe />;
};

export default PlaylistPage;
