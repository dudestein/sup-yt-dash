"use client";
import { useState } from "react";
import SideBar from "./components/SideBar/SideBar";
import YouTubePlayer from "./components/Video/Video";
import { getClippingForVideoId } from "./helpers/clipping";
import { Trim } from "@/types";

export default function Home() {
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const [clipping, setClipping] = useState<Trim | null>(null);
  const handleVideoSelection = async (videoId: string) => {
    console.log(videoId);
    setCurrentVideo(videoId);
    const currentClipping = await getClippingForVideoId(currentVideo);
    setClipping(currentClipping);
  };

  return (
    <div className="flex flex-col-reverse md:flex-row justify-items-stretch">
      <aside
        id="sidebar"
        className="h-screen md:w-64 pb-36 md:pb-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 overflow-y-auto"
        aria-label="Sidebar"
      >
        <SideBar handleVideoSelection={handleVideoSelection} />
      </aside>
      <main
        className="bg-white dark:bg-gray-900 md:p-4 rounded grow-2 flex flex-col justify-items-stretch sticky top-0 md:static"
        aria-label="Main Content"
      >
        <YouTubePlayer videoId={currentVideo} trim={clipping} />
      </main>
    </div>
  );
}
