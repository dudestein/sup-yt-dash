"use client";

import { useEffect, useState } from "react";
import { fetchJson, FetchError } from "@/app/lib/fetchJson";
import { YoutubeSearchResponse } from "@/types";
import VideoThumb from "./VideoItem";
import SearchBar from "./SearchBar";
import { useAppContext } from "@/app/context/AppContext";
import { getPageResults } from "@/app/helpers/clipping";
import Pagination from "../Pagination/Pagination";

export async function getServerSideProps() {
  try {
    const res = await fetch("/mockdata/data.json");
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await res.json();

    return {
      props: { data },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        data: null,
        error: "Failed to load data",
      },
    };
  }
}

const SideBar = () => {
  const {
    videoList,
    searchResults,
    setCurrentVideo,
    setVideoList,
    setSearchResults,
    currentPage,
  } = useAppContext();
  const [error, setError] = useState<string | null>(null);
  const [displayMode, setDisplayMode] = useState<"list" | "thumbnail">(
    "thumbnail"
  );

  const videos =
    getPageResults(searchResults || videoList?.items, currentPage || 1) || [];

  useEffect(() => {});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchJson<YoutubeSearchResponse>(
          "/mockdata/data.json"
        );
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

  const handleDisplayModeChange = (mode: "list" | "thumbnail") => {
    setDisplayMode(mode);
  };

  if (error) return <p>{error}</p>;
  if (!videoList) return <p>Loading...</p>;

  return (
    <>
      <div className="flex items-center flex-col w-full md:w-64">
        <div className="flex z-10 flex-col fixed bottom-0 left-0 w-full md:sticky md:top-0 bg-gray-900 p-4 dark:bg-black gap-2 text-white">
          <SearchBar />
          <div className="flex flex-row gap-2 justify-end items-center">
            <span>Display:</span>
            <div className="inline-flex rounded-md shadow-sm" role="group">
              {/* Shows list with title and description only */}
              <button
                type="button"
                title="List View"
                className={`icon-button ${
                  displayMode === "list" ? "active" : ""
                }`}
                onClick={() => handleDisplayModeChange("list")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <rect x="4" y="6" width="16" height="1.5" />
                  <rect x="4" y="11" width="16" height="1.5" />
                  <rect x="4" y="16" width="16" height="1.5" />
                </svg>
              </button>
              {/* Includes the Thumbnail */}
              <button
                title="Thumbnail View"
                type="button"
                className={`icon-button ${
                  displayMode === "thumbnail" ? "active" : ""
                }`}
                onClick={() => handleDisplayModeChange("thumbnail")}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="2"
                    y="3"
                    width="16"
                    height="14"
                    rx="3"
                    ry="3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <rect x="6" y="12" width="8" height="2" fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>
          <Pagination list={searchResults || videoList.items} pageSize={10} />
        </div>

        <div className="video-list flex z-0 flex-col overflow-auto order-1 md:order-2 w-full md:w-64">
          {videos.map((item) => (
            <VideoThumb
              key={`${item.id.videoId}_${item.id.kind}`}
              video={item}
              displayMode={displayMode}
              onClick={() => setCurrentVideo(item.id.videoId)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

SideBar.displayName = "SideBar";

export default SideBar;
