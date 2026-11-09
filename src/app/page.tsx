import { HomeContent } from "@/components/home/HomeContent";
import { getHomeFeed } from "@/lib/catalogues";
import React from "react";

const Home = async () => {
    const feed = await getHomeFeed();

    return <HomeContent feed={feed} />;
};

export default Home;
