"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { TrimControls } from "./TrimControls";
import { getClippingForVideoId } from "@/app/helpers/clipping";
import { useAppContext } from "@/app/context/AppContext";
import { Trim } from "@/types";

const YouTubePlayer = () => {
  const { currentVideo } = useAppContext();
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const playerInstanceRef = useRef<YT.Player | null>(null);
  const playbackIntervalRef = useRef<number | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [currentClip, setCurrentClip] = useState<Trim>({
    start: undefined,
    end: undefined,
  });

  const updatePlayBackState = useCallback(
    (data: YT.PlayerState) => {
      // Playing and Buffering states are considered as playing as the user doesn't have to manually play the video
      setIsPlaying(
        [YT.PlayerState.PLAYING, YT.PlayerState.BUFFERING].includes(data)
      );
      if (data === YT.PlayerState.ENDED) {
        console.log("Clip Ended");
      }
    },
    [setIsPlaying]
  );

  const loadVideo = async () => {
    if (currentVideo && playerInstanceRef.current) {
      playerInstanceRef.current.cueVideoById(currentVideo);
      setVideoDuration(playerInstanceRef.current.getDuration());
      updateClipping();
    }
  };

  const trackProgress = () => {
    if (
      playerInstanceRef.current &&
      playerInstanceRef.current.getPlayerState() === YT.PlayerState.PLAYING
    ) {
      const currentTime = playerInstanceRef.current.getCurrentTime();
      const duration = playerInstanceRef.current.getDuration();
      const progressPercent = (currentTime / duration) * 100;
      setProgress(progressPercent);
    }
  };

  const updateClipping = async () => {
    const clipping = (await getClippingForVideoId(currentVideo)) || {
      start: undefined,
      end: undefined,
    };
    setCurrentClip(clipping);
    playerInstanceRef.current?.seekTo(clipping.start ?? 0, true);
  };

  useEffect(() => {
    const initializePlayer = async () => {
      if (
        !playerInstanceRef.current &&
        playerContainerRef.current &&
        window.YT &&
        currentVideo
      ) {
        const player = new YT.Player(playerContainerRef.current, {
          videoId: currentVideo,
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 0,
            loop: 0,
            controls: 0,
            modestbranding: 1,
            rel: 0,
            enablejsapi: 1,
          },
          events: {
            onReady: (event) => {
              console.log("Player Ready");
              playerInstanceRef.current = event.target;
              setVideoDuration(event.target.getDuration());
              startProgressTracking();
            },
          },
        });

        player.addEventListener("onStateChange", (event) => {
          setVideoDuration(playerInstanceRef.current?.getDuration() ?? 0);
          updatePlayBackState(event.data);
        });

        const startProgressTracking = () => {
          console.log("track progress");
          playbackIntervalRef.current = window.setInterval(() => {
            trackProgress();
          }, 100);
        };
      }
    };

    if (!playerInstanceRef.current) {
      console.log("No Player Instance, initializing...");
      initializePlayer();
    } else {
      loadVideo();
    }

    // Clean up intervals and events on unmount
    return () => {
      if (playbackIntervalRef.current)
        clearInterval(playbackIntervalRef.current);
    };
  }, [currentVideo, playerContainerRef.current]);

  const handlePlay = async () => {
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
          videoDuration={videoDuration}
          start={currentClip.start}
          end={currentClip.end}
          progress={progress}
        />
      </div>
    </>
  );
};

export default YouTubePlayer;
