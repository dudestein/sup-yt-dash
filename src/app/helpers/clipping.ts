import { Trim } from "@/types";

export const getClippingForVideoId = async (videoId: string | null) => {
  if (!videoId) {
    return null;
  }
  // get from localStorage the serialized clipping information containing start and end times
  const clipping = localStorage.getItem(`${videoId}-clipping`);
  if (clipping) {
    return JSON.parse(clipping) as Trim;
  }
  return null;
};

export const setClippingForVideoId = async (
  videoId: string | null,
  clipping: Trim
) => {
  if (!videoId) {
    return;
  }
  // store in localStorage the serialized clipping information containing start and end times
  localStorage.setItem(`${videoId}-clipping`, JSON.stringify(clipping));
};
