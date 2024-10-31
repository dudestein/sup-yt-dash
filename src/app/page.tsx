"use client";
import { useEffect, useState } from "react";
import { fetchJson, FetchError } from "@/app/lib/fetchJson";
import { YoutubeSearchResponse } from "@/types";
import { useAppContext } from "@/app/context/AppContext";
import SideBar from "@/app/components/SideBar/SideBar";
import YouTubePlayer from "@/app/components/Video/Video";
import LoadingScreen from "./components/Shared/LoadingScreen";

export default function Home() {
  const { videoList, setVideoList, setSearchResults } = useAppContext();
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchJson<YoutubeSearchResponse>("/api/videos");
        setVideoList(result);
        setSearchResults(result.items);
      } catch (err) {
        if (err instanceof FetchError) {
          setError(`Error: ${err.message}`);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    fetchData();
  }, []);

  if (error) return <p>{error}</p>;
  if (!videoList) return <LoadingScreen />;

  return (
    <div className="flex flex-col-reverse md:flex-row justify-items-stretch">
      <aside
        id="sidebar"
        className="h-screen md:w-64 pb-36 md:pb-0 bg-gray-800 border-r border-gray-600 dark:bg-gray-800 dark:border-gray-700 overflow-y-auto"
        aria-label="Sidebar"
      >
        <SideBar />
      </aside>
      <main
        className="bg-white dark:bg-gray-900 md:p-4 rounded grow-2 flex flex-col justify-items-stretch sticky top-0 md:static"
        aria-label="Main Content"
      >
        <YouTubePlayer />
      </main>
    </div>
  );
}
