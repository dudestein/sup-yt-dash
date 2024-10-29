"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import TrimControls from "../TrimControls/TrimControls";
import { getClippingForVideoId } from "@/app/helpers/clipping";
import { useAppContext } from "@/app/context/AppContext";

const YouTubePlayer = () => {
  const defaultOptions = {
    width: "100%",
    height: "100%",
    autoplay: false,
    loop: false,
    trim: { start: undefined, end: undefined },
  };
  const { currentVideo } = useAppContext();
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
        if (defaultOptions.loop) {
          playerInstanceRef.current?.playVideo();
        }
      }
    },
    [defaultOptions.loop]
  );

  useEffect(() => {
    console.log(currentVideo, progress);
  }, [progress]);

  useEffect(() => {
    const initializePlayer = async () => {
      if (playerContainerRef.current && window.YT && currentVideo) {
        const trim = await getClippingForVideoId(currentVideo);
        const player = new YT.Player(playerContainerRef.current, {
          videoId: currentVideo,
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: defaultOptions.autoplay ? 1 : 0,
            loop: defaultOptions.loop ? 1 : 0,
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
  }, [currentVideo, updatePlayBackState]);

  useEffect(() => {
    if (playerInstanceRef.current && currentVideo) {
      setIsPlaying(false);
      playerInstanceRef.current.loadVideoById(currentVideo);
      playerInstanceRef.current.stopVideo();
    }
  }, [currentVideo]);

  const handlePlay = async () => {
    const trim = await getClippingForVideoId(currentVideo);
    debugger;
    playerInstanceRef.current?.seekTo(trim?.start || 0, true);
    playerInstanceRef.current?.playVideo();
    setIsPlaying(true);
  };

  const handlePause = () => {
    playerInstanceRef.current?.pauseVideo();
    setIsPlaying(false);
  };

  if (!currentVideo) {
    return (
      <div className="p-2 md:p-0 w-full h-64 max-h-screen rounded">
        Select a video from the sidebar to start playing
      </div>
    );
  }

  return (
    <>
      <div className="p-2 md:p-0 w-full grow-2 h-64 max-h-screen rounded">
        <div ref={playerContainerRef} className="grow-2 rounded" />
      </div>
      <div className="controls items-center gap-2 p-2 md:p-0 grow-0">
        {isPlaying ? (
          <button onClick={handlePause} className="control-button">
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
          <button onClick={handlePlay} className="control-button">
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
          videoId={currentVideo}
          videoDuration={videoDuration || 0}
          start={0}
          end={videoDuration}
          progress={progress}
        />
      </div>
    </>
  );
};

export default YouTubePlayer;
