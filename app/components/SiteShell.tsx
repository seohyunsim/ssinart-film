 "use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const navLinkClass = (href: string) => {
    const isActive = pathname === href;
    return [
      "transition-colors hover:text-black hover:font-black",
      isActive ? "text-black font-black" : "",
    ]
      .filter(Boolean)
      .join(" ");
  };

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900">
      <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-6 pb-20 pt-10 sm:px-10 sm:pt-14 border">
        <header className="flex items-center justify-center">
          <nav
            className="flex w-full items-center justify-around text-[13px] tracking-[0.04em] text-zinc-600 sm:text-sm"
            style={{ fontFamily: "var(--font-nanum-myeongjo)" }}
          >
            <Link className={navLinkClass("/")} href="/">
              HOME
            </Link>
            <Link className={navLinkClass("/film")} href="/film">
              FILM
            </Link>
            <Link className={navLinkClass("/info")} href="/info">
              INFO
            </Link>
          </nav>
        </header>

        <section className="flex flex-1 flex-col items-center justify-center gap-10 py-16 sm:py-18">
          {children}
        </section>

        <footer className="flex flex-col items-center gap-6 text-[12px]">
          <p className="font-bold">@s00m1nn</p>
          <div className="text-center leading-5">
            <p>Tel) 010. 9283. 1584</p>
            <p>E-mail) sinyart08@naver.com</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
