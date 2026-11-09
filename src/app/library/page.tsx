import { LibraryContent } from "@/components/library/LibraryContent";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Your Library",
    description:
        "Your Playlists, Liked Songs, Saved Albums, And Followed Artists.",
};

const LibraryPage = () => {
    return <LibraryContent />;
};

export default LibraryPage;
