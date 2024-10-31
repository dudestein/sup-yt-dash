import {
  setClippingForVideoId,
  getClippingForVideoId,
} from "@/app/helpers/clipping";
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "@/app/context/AppContext";

type TrimControlsProps = {
  videoDuration: number;
  start?: number;
  end?: number;
  progress?: number;
};
export const TrimControls: React.FC<TrimControlsProps> = ({
  start,
  end,
  videoDuration,
}) => {
  const clipBarRef = useRef<HTMLDivElement>(null);
  const { currentVideo } = useAppContext();
  const [clipStart, setClipStart] = useState(start ?? 0);
  const [clipEnd, setClipEnd] = useState(end ?? videoDuration);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "start") {
      // if (parseInt(e.target.value) < clipEnd) {
      setClipStart(parseInt(e.target.value));
      // }
    } else {
      // if (
      //   clipStart !== undefined &&
      //   parseInt(e.target.value) >= clipStart + 1
      // ) {
      setClipEnd(parseInt(e.target.value));
      // }
    }
    // setClippingForVideoId(currentVideo, {
    //   start: start ?? 0,
    //   end: end ?? videoDuration,
    // });
  };
  // useEffect(() => {
  //   const updateClipping = async () => {
  //     if (!currentVideo) {
  //       return;
  //     }
  //     const trim = await getClippingForVideoId(currentVideo);
  //     setClipStart(trim?.start ?? 0);
  //     setClipEnd(trim?.end ?? videoDuration);
  //   };
  //   updateClipping();
  // }, [currentVideo, videoDuration]);
  if (!currentVideo) {
    return null;
  }

  return (
    <>
      <div className="track items-center gap-2 grow-0 rounded">
        <div className="w-full bg-gray-300 dark:bg-gray-700 h-4 rounded relative">
          <div
            ref={clipBarRef}
            className="bg-gray-500 h-4 absolute"
            style={{
              left: `${(clipStart / videoDuration) * 100}%`,
              width: `${(clipEnd - clipStart) / videoDuration}) * 100}%`,
            }}
          ></div>
          <input
            className="range-slider"
            id="start"
            max={100}
            min={0}
            onChange={handleChange}
            type="range"
            value={clipStart ?? 0}
          />
          <input
            className="range-slider"
            id="end"
            max={videoDuration}
            min={0}
            onChange={handleChange}
            type="range"
            value={50}
          />
        </div>
      </div>
    </>
  );
};

export default TrimControls;
