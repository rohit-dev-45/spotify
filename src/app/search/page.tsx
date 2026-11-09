import { SearchContent } from "@/components/search/SearchContent";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Search",
    description: "Search Spotify For Songs, Albums, Artists, And Playlists",
};

const SearchPage = () => {
    return <SearchContent />;
};

export default SearchPage;
