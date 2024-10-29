"use client";

import { useEffect, useState } from "react";
import { fetchJson, FetchError } from "@/app/lib/fetchJson";
import { YoutubeSearchResponse } from "@/types";
import VideoThumb from "./VideoItem";

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

type SideBarProps = {
  handleVideoSelection: (videoId: string) => void;
};

const SideBar: React.FC<SideBarProps> = ({ handleVideoSelection }) => {
  const [data, setData] = useState<YoutubeSearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [displayMode, setDisplayMode] = useState<"list" | "thumbnail">(
    "thumbnail"
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchJson<YoutubeSearchResponse>(
          "/mockdata/data.json"
        );
        setData(result);
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
  if (!data) return <p>Loading...</p>;

  return (
    <>
      <div className="flex items-center flex-col w-full md:w-64">
        <div className="flex z-10 flex-col fixed bottom-0 left-0 w-full md:sticky md:top-0 bg-gray-900 p-4 dark:bg-black gap-2 text-white">
          <div className="w-full z-20">
            <div className="relative">
              <input
                className="search-input"
                placeholder="Search by title or description..."
              />
              <button
                className="absolute top-1 right-1 flex items-center rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 mr-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                    clipRule="evenodd"
                  />
                </svg>
                Search
              </button>
            </div>
          </div>
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
        </div>
        <div className="video-list flex z-0 flex-col overflow-auto order-1 md:order-2 w-full md:w-64">
          {data.items.map((item) => (
            <VideoThumb
              key={`${item.id.videoId}_${item.id.kind}`}
              video={item}
              displayMode={displayMode}
              onClick={() => handleVideoSelection(item.id.videoId)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

SideBar.displayName = "SideBar";

export default SideBar;
