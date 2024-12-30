import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "archives.bulbagarden.net",
        port: "",
        pathname: "/media/upload/**",
      },
      {
        protocol: "https",
        hostname: "assets.pokemon.com",
        port: "",
        pathname: "/static-assets/content-assets/**",
      },
      {
        protocol: "https",
        hostname: "assets.pokemon-zone.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "wallpapers.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.pokemondb.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s3.us-east-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },

      {
        protocol: "https",
        hostname: "limitlesstcg.nyc3.cdn.digitaloceanspaces.com",
        port: "",
        pathname: "/pocket/**",
      },
      {
        protocol: "https",
        hostname: "fastly.picsum.photos",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
