import { SearchResult } from "@/types/api";
import ThumbDisplay from "./ThumbDisplay";
import DetailDisplay from "./DetailDisplay";

type VideoItemProps = {
  video: SearchResult;
  displayMode: "thumbnail" | "list";
  onClick: () => void;
};

/*
 * VideoItem component to display video information
 * @param {VideoItemProps} props - video and display mode
 *
 * ---- comments ----
 * We could improve this by making the rendering function more generic
 * and instantiating the correct component based on the display mode without
 * the need for a conditional statement.
 */

const VideoItem: React.FC<VideoItemProps> = ({
  video,
  displayMode,
  onClick,
}) => {
  return (
    <div className="video-item" onClick={onClick}>
      {displayMode === "thumbnail" && (
        <ThumbDisplay
          title={video.snippet.title}
          thumbnailUrl={video.snippet.thumbnails.medium.url}
        />
      )}
      {displayMode === "list" && (
        <DetailDisplay
          title={video.snippet.title}
          description={video.snippet.description}
        />
      )}
    </div>
  );
};

VideoItem.displayName = "VideoItem";

export default VideoItem;
