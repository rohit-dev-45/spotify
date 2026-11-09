import { AlbumContent } from "@/components/album/AlbumContent";
import { getAlbumDetail } from "@/lib/catalogues";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

type AlbumPageProps = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({
    params,
}: AlbumPageProps): Promise<Metadata> {
    const { id } = await params;
    const album = await getAlbumDetail(id);
    if (!album) return { title: "Album Not Found" };
    const artist = album.artist ? ` . ${album.artist}` : "";
    return {
        title: `${album.title}${artist}`,
        description: album.artist
            ? `Listen To ${album.title} By ${album.artist} on Spotify.`
            : `Listen To ${album.title} On Spotify.`,
    };
}

const AlbumPage = async ({ params }: AlbumPageProps) => {
    const { id } = await params;
    const album = await getAlbumDetail(id);
    if (!album) notFound();
    return <AlbumContent album={album} />;
};

export default AlbumPage;
