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
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
            {
                protocol: "https",
                hostname: "fastly.picsum.photos",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                pathname: "/**",
            },
            { protocol: "https", hostname: "i.scdn.co", pathname: "/**" },
            {
                protocol: "https",
                hostname: "cdn-images.dzcdn.net",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "e-cdns-images.dzcdn.net",
                pathname: "/**",
            },
            { protocol: "https", hostname: "api.deezer.com", pathname: "/**" },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
