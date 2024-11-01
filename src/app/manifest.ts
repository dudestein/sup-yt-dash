import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Youtube Playlist Dashboard",
    short_name: "YPD",
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
  };
}
