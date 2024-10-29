import { useState } from "react";
import { useAppContext } from "@/app/context/AppContext";
import { searchVideo } from "@/app/helpers/clipping";
import { ChangeEvent } from "react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { setSearchResults, setCurrentPage, videoList } = useAppContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
    if (videoList) {
      if (searchTerm === "") {
        setSearchResults(videoList?.items);
      }
      setSearchResults(searchVideo(searchTerm, videoList?.items));
      setCurrentPage(1);
    }
  };
  return (
    <div className="w-full z-20">
      <div className="relative">
        <input
          value={searchTerm}
          onChange={handleChange}
          className="search-input"
          placeholder="Search by title or description..."
        />
        <button
          className="absolute top-1 right-1 flex items-center rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 mr-2"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clipRule="evenodd"
            />
          </svg>
          Search
        </button>
      </div>
    </div>
  );
};

SearchBar.displayName = "SearchBar";

export default SearchBar;
