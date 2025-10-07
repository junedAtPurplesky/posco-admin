"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getPages = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push(2);
      pages.push(3);
      pages.push("...");
      pages.push(totalPages - 1);
      pages.push(totalPages);
    }
    return pages;
  };

  const pagesToRender = getPages();

  return (
    <div className="mt-4 flex items-center gap-1">
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`rounded-lg      flex items-center gap-1      px-3      py-1      text-[0.9rem]       ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 hover:text-tertiary"
        }`}
      >
        <FiChevronLeft className="w-4 h-4" />
        Previous
      </button>

      {pagesToRender.length > 0 &&
        pagesToRender.map((page, idx) =>
          page === "..." ? (
            <span key={`ellipsis-${idx}`} className="px-2 text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(Number(page))}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-[0.9rem] ${
                page === currentPage
                  ? "bg-[#0B7AB5] text-white"
                  : "text-gray-700 hover:text-tertiary"
              }`}
            >
              {page}
            </button>
          )
        )}

      <button
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
        className={`flex items-center gap-1      px-3      py-1      text-[0.9rem]      rounded      ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 hover:text-primary"
        }`}
      >
        Next
        <FiChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
