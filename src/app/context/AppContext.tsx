import { YoutubeSearchResponse } from "@/types";
import { createContext, useContext, useState, ReactNode } from "react";

interface AppContextType {
  currentVideo: string | null;
  videoList: YoutubeSearchResponse | null;
  searchResults: YoutubeSearchResponse | null;
  currentPage: number | null;
  setCurrentVideo: (video: string) => void;
  setCurrentPage: (pageNumber: number) => void;
  setSearchResults: (results: YoutubeSearchResponse) => void;
  setVideoList: (list: YoutubeSearchResponse) => void;
}

// Create a context with undefined initial value
const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

// App provider component
export const AppProvider = ({ children }: AppProviderProps) => {
  const [videoList, setVideoList] = useState<YoutubeSearchResponse | null>(
    null
  );
  const [searchResults, setSearchResults] =
    useState<YoutubeSearchResponse | null>(null);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const playVideo = (video: string) => {
    setCurrentVideo(video);
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <AppContext.Provider
      value={{
        currentVideo,
        videoList,
        searchResults,
        currentPage,
        setCurrentVideo: playVideo,
        setCurrentPage: goToPage,
        setVideoList: setVideoList,
        setSearchResults: setSearchResults,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access the auth context
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
