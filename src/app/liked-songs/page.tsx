import { LikedSongsContent } from "@/components/library/LikedSongsContent";
import { safeAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Track } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Liked Songs",
    description: "Every Track You've Hearted, In One Place.",
};

const LikedSongsPage = async () => {
    const session = await safeAuth();
    let tracks: Track[] = [];
    let ownerName = "You";

    if (session?.user?.id) {
        const rows = await prisma.likedTrack.findMany({
            where: { userId: session.user.id },
            orderBy: { likedAt: "desc" },
        });
        tracks = rows.map((t) => ({
            id: t.trackId,
            title: t.title,
            artist: t.artist,
            artistId: t.artistId ?? "",
            album: t.album ?? "",
            albumId: t.albumId ?? "",
            duration: t.durationSec,
            coverUrl: t.coverUrl ?? "",
            audioUrl: t.audioUrl ?? undefined,
            addedAt: t.likedAt.toISOString(),
        }));
        ownerName = session.user.name ?? session.user.email ?? "You";
    }

    return <LikedSongsContent tracks={tracks} ownerName={ownerName} />;
};

export default LikedSongsPage;
