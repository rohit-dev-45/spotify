import { ArtistContent } from "@/components/artist/ArtistContent";
import { getArtistDetail, getHomeFeed } from "@/lib/catalogues";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type ArtistPageProps = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({
    params,
}: ArtistPageProps): Promise<Metadata> {
    const { id } = await params;
    const artist = await getArtistDetail(id);
    if (!artist) return { title: "Artist Not Found" };
    return {
        title: artist.name,
        description:
            artist.bio ??
            `Top Tracks, Albums, And Similar Artists For ${artist.name}`,
    };
}

const ArtistPage = async ({ params }: ArtistPageProps) => {
    const { id } = await params;
    const [artist, feed] = await Promise.all([
        getArtistDetail(id),
        getHomeFeed(),
    ]);
    if (!artist) notFound();
    const similar = feed.popularArtists
        .filter((a) => a.id !== artist.id)
        .slice(0, 6);
    return <ArtistContent artist={artist} similar={similar} />;
};

export default ArtistPage;
