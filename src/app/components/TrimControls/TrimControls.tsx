import { setClippingForVideoId } from "@/app/helpers/clipping";
import { Trim } from "@/types";
import { useState } from "react";
type TrimControlsProps = {
  videoId: string | null;
  videoDuration: number;
  start?: number;
  end?: number;
  progress?: number;
  onTrimChange?: () => Trim;
};
const TrimControls: React.FC<TrimControlsProps> = ({
  videoId,
  start,
  end,
  videoDuration,
  progress,
}) => {
  const [clipStart, setClipStart] = useState(0 || start);
  const [clipEnd, setClipEnd] = useState(end || videoDuration);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "start") {
      if (parseInt(e.target.value) < clipEnd) {
        setClipStart(parseInt(e.target.value));
      }
    } else {
      if (
        clipStart !== undefined &&
        parseInt(e.target.value) >= clipStart + 1
      ) {
        setClipEnd(parseInt(e.target.value));
      }
      setClippingForVideoId(videoId, { start: clipStart, end: clipEnd });
    }
  };
  if (!videoId) {
    return null;
  }
  return (
    <>
      <div className="track items-center gap-2 grow-0 rounded">
        <div className="w-full bg-gray-300 dark:bg-gray-700 h-4 rounded relative">
          <div
            className="bg-gray-500 h-4 absolute"
            style={{
              left: `${((clipStart || 0) / videoDuration) * 100}%`,
              width: `${((clipEnd - (clipStart || 0)) / videoDuration) * 100}%`,
            }}
          ></div>
          <input
            className="range-slider"
            id="start"
            max={Math.max(end || 0, videoDuration) - 1}
            min="0"
            onChange={handleChange}
            type="range"
            value={clipStart}
          />
          <input
            className="range-slider"
            id="end"
            max={videoDuration}
            min={0}
            onChange={handleChange}
            type="range"
            value={clipEnd}
          />
        </div>
      </div>
    </>
  );
};

export default TrimControls;