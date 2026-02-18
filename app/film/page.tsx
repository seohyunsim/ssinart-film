import { Suspense } from "react";
import FilmClient from "./FilmClient";

export default function FilmPage() {
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
      <FilmClient />
    </Suspense>
  );
}
