"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

type UseQueryPageOptions = {
  param?: string;
  totalPages: number;
  fallback?: number;
};

export default function useQueryPage({
  param = "page",
  totalPages,
  fallback = 1,
}: UseQueryPageOptions) {
  const searchParams = useSearchParams();

  return useMemo(() => {
    const rawValue = searchParams.get(param) ?? String(fallback);
    const parsed = Number(rawValue);
    const safe =
      Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback;

    return Math.min(Math.max(safe, 1), Math.max(totalPages, 1));
  }, [fallback, param, searchParams, totalPages]);
}
