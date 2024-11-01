import React from "react";
import { truncateLongWords } from "@/app/helpers/string";

interface ThumbDisplayProps {
  title: string;
  description: string;
}

/*
 * Component to display the title and description of a video
 */

const VideoTile: React.FC<ThumbDisplayProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col gap-2 items-start">
      <h5 className="text-lg font-semibold text-white">{title}</h5>
      <p className="truncate-multi-line text-sm text-gray-500">
        {truncateLongWords(description)}
      </p>
    </div>
  );
};

export default VideoTile;
