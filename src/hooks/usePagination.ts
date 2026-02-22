"use client";

import { useMemo } from "react";

type UsePaginationOptions = {
  currentPage: number;
  totalPages: number;
  maxVisible?: number;
};

export default function usePagination({
  currentPage,
  totalPages,
  maxVisible = 5,
}: UsePaginationOptions) {
  return useMemo(() => {
    if (totalPages <= 0) {
      return {
        visiblePages: [],
        showStartEllipsis: false,
        showEndEllipsis: false,
      };
    }

    const allPages = Array.from({ length: totalPages }, (_, i) => i + 1);

    if (totalPages <= maxVisible) {
      return {
        visiblePages: allPages,
        showStartEllipsis: false,
        showEndEllipsis: false,
      };
    }

    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    start = Math.max(1, end - maxVisible + 1);

    return {
      visiblePages: allPages.slice(start - 1, end),
      showStartEllipsis: start > 1,
      showEndEllipsis: end < totalPages,
    };
  }, [currentPage, maxVisible, totalPages]);
}
