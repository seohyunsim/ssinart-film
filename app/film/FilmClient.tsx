"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Pagination from "../components/Pagination";
import SiteShell from "../components/SiteShell";
import useQueryPage from "../../src/hooks/useQueryPage";
import { urlFor } from "@/src/lib/sanity.image";
import Image from "next/image";

type Film = {
  _id: string;
  title: string;
  youtubeUrl: string;
  publishedAt: string;
  coverImage: any;
};

type FilmClientProps = {
  isFallback?: boolean;
  films: Film[];
};

export default function FilmClient({
  isFallback = false,
  films,
}: FilmClientProps) {
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
          {pageItems.map((film) => {
            const img = urlFor(film.coverImage)
              .width(900)
              .height(900)
              .fit("crop")
              .url();

            return (
              <a
                key={film._id}
                href={film.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="group block"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-md bg-gray-100">
                  <Image
                    src={img}
                    alt={film.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <p className="mt-3 text-sm text-gray-900">{film.title}</p>
              </a>
            );
          })}
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
