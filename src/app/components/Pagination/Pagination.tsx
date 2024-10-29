import { useAppContext } from "@/app/context/AppContext";
import React from "react";

interface PaginationProps<T> {
  list: T[];
  pageSize: number;
}

const Pagination = <T,>({ list, pageSize }: PaginationProps<T>) => {
  const { currentPage, setCurrentPage } = useAppContext();
  const totalPages = Math.ceil(list.length / pageSize);

  if (totalPages <= 1) {
    setCurrentPage(1);
    return null;
  }

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-row gap-2 justify-end items-center">
      <span>Pages:</span>
      {/* Render pagination links */}
      <div className="pagination-links flex items-center justify-end gap-2 text-sm">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className={`px-2 py-1 rounded ${
              currentPage === i + 1
                ? "bg-white text-black"
                : "bg-gray-400 text-black"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
