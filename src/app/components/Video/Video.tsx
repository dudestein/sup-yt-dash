"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import TrimControls from "../TrimControls/TrimControls";
import { Trim } from "@/types";

interface YouTubePlayerProps {
  videoId: string | null;
  width?: string | number;
  height?: string | number;
  autoplay?: boolean;
  loop?: boolean;
  trim?: Trim | null;
  onReady?: (player: YT.Player) => void;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  videoId,
  width = "100%",
  height = "100%",
  autoplay = false,
  loop = false,
  trim = { start: undefined, end: undefined },
  onReady,
}) => {
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const playerInstanceRef = useRef<YT.Player | null>(null);
  const playbackIntervalRef = useRef<number | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [videoDuration, setVideoDuration] = useState<number>(0);

  const updatePlayBackState = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (data: any) => {
      if (data === YT.PlayerState.ENDED) {
        setIsPlaying(false);
        if (loop) {
          playerInstanceRef.current?.playVideo();
        }
      }
    },
    [loop]
  );

  useEffect(() => {}, [progress]);

  useEffect(() => {
    const initializePlayer = () => {
      if (playerContainerRef.current && window.YT && videoId) {
        const player = new YT.Player(playerContainerRef.current, {
          videoId: videoId,
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: autoplay ? 1 : 0,
            loop: loop ? 1 : 0,
            controls: 0,
            modestbranding: 1,
            rel: 0,
            enablejsapi: 1,
            start: trim?.start,
            end: trim?.end,
          },
          events: {
            onReady: (event) => {
              playerInstanceRef.current = event.target;
              startProgressTracking();
              setVideoDuration(playerInstanceRef.current?.getDuration());
              if (onReady) {
                onReady(event.target);
              }
            },
          },
        });

        player.addEventListener("onStateChange", (event) => {
          updatePlayBackState(event.data);
        });

        const startProgressTracking = () => {
          playbackIntervalRef.current = window.setInterval(() => {
            if (
              playerInstanceRef.current &&
              playerInstanceRef.current.getPlayerState() ===
                YT.PlayerState.PLAYING
            ) {
              const currentTime = playerInstanceRef.current.getCurrentTime();
              const duration = playerInstanceRef.current.getDuration();
              const progressPercent = (currentTime / duration) * 100;
              setProgress(progressPercent);
            }
          }, 100);
        };
      }
    };

    if (window.YT && window.YT.Player) {
      initializePlayer();
    } else {
      window.onYouTubeIframeAPIReady = initializePlayer;
    }

    // Clean up intervals on unmount
    return () => {
      if (playbackIntervalRef.current)
        clearInterval(playbackIntervalRef.current);
    };
  }, [
    videoId,
    width,
    height,
    autoplay,
    loop,
    onReady,
    trim?.start,
    trim?.end,
    updatePlayBackState,
  ]);

  useEffect(() => {
    if (playerInstanceRef.current && videoId) {
      setIsPlaying(false);
      playerInstanceRef.current.loadVideoById(videoId);
      playerInstanceRef.current.stopVideo();
    }
  }, [videoId]);

  const handlePlay = () => {
    playerInstanceRef.current?.seekTo(trim?.start || 0, true);
    playerInstanceRef.current?.playVideo();
    setIsPlaying(true);
  };

  const handlePause = () => {
    playerInstanceRef.current?.pauseVideo();
    setIsPlaying(false);
  };

  return (
    <>
      <div className="p-2 md:p-0 w-full grow-2 h-64 max-h-screen rounded">
        <div ref={playerContainerRef} className="grow-2 rounded" />
      </div>
      <div className="controls items-center gap-2 p-2 md:p-0 grow-0">
        {isPlaying ? (
          <button
            onClick={handlePause}
            className="bg-gray-500 dark:bg-gray-200 text-white dark:text-gray-800 p-2 rounded hover:bg-gray-600 dark:hover:bg-gray-300 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
            </svg>
          </button>
        ) : (
          <button
            onClick={handlePlay}
            className="bg-gray-500 dark:bg-gray-200 text-white dark:text-gray-800 p-2 rounded hover:bg-gray-600 dark:hover:bg-gray-300 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        )}
        <TrimControls
          videoId={videoId}
          videoDuration={videoDuration || 0}
          start={trim?.start || 0}
          end={trim?.end || videoDuration}
          progress={progress}
        />
      </div>
    </>
  );
};

export default YouTubePlayer;
