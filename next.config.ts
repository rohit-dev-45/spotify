import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    turbopack: {
        rules: {
            "*.css": {
                loaders: ["@tailwindcss/turbopack"],
                as: "*.css",
            },
        },
    },
    experimental: {
        serverActions: {
            allowedOrigins: [
                "localhost:3000",
                "literate-couscous-97xwp5gwwwqgc7746-3000.app.github.dev",
            ],
        },
    },
};

export default nextConfig;
