"use client";

import usePagination from "../../src/hooks/usePagination";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onChange,
}: PaginationProps) {
  const { visiblePages, showStartEllipsis, showEndEllipsis } = usePagination({
    currentPage,
    totalPages,
    maxVisible: 5,
  });

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-15 flex items-center justify-center gap-2 text-[13px] text-zinc-600">
      {showStartEllipsis && (
        <>
          <button
            type="button"
            onClick={() => onChange(1)}
            className="min-w-[20px] transition-colors hover:text-zinc-900 cursor-pointer"
          >
            1
          </button>
          <span className="px-1 text-zinc-400">…</span>
        </>
      )}
      {visiblePages.map((pageNumber) => {
        const isActive = pageNumber === currentPage;
        return (
          <button
            key={pageNumber}
            type="button"
            onClick={() => onChange(pageNumber)}
            className={[
              "min-w-[20px] transition-colors cursor-pointer",
              isActive ? "text-zinc-900 font-black" : "hover:text-zinc-900",
            ].join(" ")}
          >
            {pageNumber}
          </button>
        );
      })}
      {showEndEllipsis && (
        <>
          <span className="px-1 text-zinc-400">…</span>
          <button
            type="button"
            onClick={() => onChange(totalPages)}
            className="min-w-[20px] transition-colors hover:text-zinc-900 cursor-pointer"
          >
            {totalPages}
          </button>
        </>
      )}
    </div>
  );
}
