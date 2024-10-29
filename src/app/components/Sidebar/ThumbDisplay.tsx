import React from "react";
import ImageWithFallback from "../Shared/ImageWithFallback";

interface ThumbDisplayProps {
  title: string;
  thumbnailUrl: string;
}

/*
 * Component to display a video thumbnail with a title overlay
 */

const VideoTile: React.FC<ThumbDisplayProps> = ({ title, thumbnailUrl }) => {
  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow-lg">
      <ImageWithFallback
        src={thumbnailUrl}
        fallbackSrc="/default.svg"
        alt={title}
        width={220}
        height={160}
        className="object-cover w-full"
      />
      <div className="absolute bottom-0 w-full bg-black bg-opacity-60 text-white px-4 py-2 text-sm font-normal">
        {title}
      </div>
    </div>
  );
};

export default VideoTile;
