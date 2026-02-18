"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Pagination from "../components/Pagination";
import SiteShell from "../components/SiteShell";
import useQueryPage from "../hooks/useQueryPage";

type FilmClientProps = {
  isFallback?: boolean;
};

export default function FilmClient({ isFallback = false }: FilmClientProps) {
  const films = useMemo(
    () =>
      Array.from({ length: 100 }, (_, index) => {
        const id = 100 - index;
        return {
          id,
          title: `테스트 필름 ${id}`,
          seed: `film-${String(id).padStart(2, "0")}`,
        };
      }),
    []
  );

  const [perPage, setPerPage] = useState(9);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const updatePerPage = () => {
      setPerPage(mediaQuery.matches ? 9 : 8);
    };
    updatePerPage();
    mediaQuery.addEventListener("change", updatePerPage);
    return () => mediaQuery.removeEventListener("change", updatePerPage);
  }, []);
  const totalPages = Math.ceil(films.length / perPage);
  const router = useRouter();
  const page = useQueryPage({ totalPages });
  const startIndex = (page - 1) * perPage;
  const pageItems = isFallback
    ? films.slice(0, perPage)
    : films.slice(startIndex, startIndex + perPage);

  const goToPage = (pageNumber: number) => {
    router.push(`/film?page=${pageNumber}`);
  };

  return (
    <SiteShell>
      <div className="w-full self-stretch text-left">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {pageItems.map((film) => (
            <article key={film.id} className="space-y-2">
              <div className="aspect-[3/3] w-full overflow-hidden bg-zinc-200">
                <img
                  src={`https://picsum.photos/seed/${film.seed}/640/480`}
                  alt={film.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <p className="text-[13px] text-zinc-700">{film.title}</p>
            </article>
          ))}
        </div>
        {!isFallback && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onChange={goToPage}
          />
        )}
      </div>
    </SiteShell>
  );
}
