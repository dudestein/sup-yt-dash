import { SearchResult, Trim, YoutubeSearchResponse } from "@/types";

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

export const searchVideo = (
  query: string,
  videoList: SearchResult[] | null
) => {
  if (!videoList) {
    return [] as SearchResult[];
  }
  if (!query) {
    return videoList;
  }
  return videoList.filter((item) => {
    /*
     * simple simple simple search.
     * search in title and description of the video
     *
     * Ideally we'd make sure this search happens on the server side, with some optimized
     * fuzzy search algorithm, but for now this will do.
     */
    return (
      item.snippet.title.toLowerCase().includes(query.toLowerCase()) ||
      item.snippet.description.toLowerCase().includes(query.toLowerCase())
    );
  });
};

export const getVideoById = (
  videoId: string,
  videoList: YoutubeSearchResponse
) => {
  return videoList.items.find((item) => item.id.videoId === videoId);
};

export const getPageResults = (
  items: SearchResult[] | undefined,
  page: number,
  perPage: number = 10
) => {
  if (!items) {
    return [] as SearchResult[];
  }
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return items.slice(start, end);
};
