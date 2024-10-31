// Type definitions for API responses
// -----------------------------------
// It may seem overkill to define overloading types like ApiResponse<T>, but it can be useful when
// you have a complex API response structure and you want to reuse your api library to fetch results
// from differente sources and types.
// It will help to avoid repeating the same types in multiple places and make your code more
// readable and maintainable, helping with self-documenting the code as well.

export interface ApiResponse<T> {
  data: T;
  status: number;
  error?: string;
}

export interface YoutubeSearchResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: PageInfo;
  items: SearchResult[];
}

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface SearchResult {
  kind: string;
  etag: string;
  id: VideoId;
  snippet: Snippet;
}

export interface VideoId {
  kind: string;
  videoId: string;
}

export interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
}

export interface Thumbnails {
  default: Thumbnail;
  medium: Thumbnail;
  high: Thumbnail;
}

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface Trim {
  start?: number | undefined;
  end?: number | undefined;
}
