import { Suspense } from "react";
import FilmClient from "./FilmClient";
import { sanity } from "@/src/lib/sanity.client";
import { FILM_LIST_QUERY } from "@/src/lib/sanity.queries";

export const revalidate = 60; // 60초마다 갱신

export default async function FilmPage() {
  const films = await sanity.fetch(FILM_LIST_QUERY);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white font-sans text-zinc-900">
          <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center justify-center px-6 pb-20 pt-10 sm:px-10 sm:pt-14">
            <p className="text-[13px] text-zinc-500">Loading...</p>
          </main>
        </div>
      }
    >
      <FilmClient films={films} />
    </Suspense>
  );
}
