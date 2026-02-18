import SiteShell from "./components/SiteShell";

export default function Home() {
  return (
    <SiteShell>
      <p className="text-[13px] text-zinc-800">SSIN.</p>
      <div className="w-full max-w-[420px] bg-zinc-100">
        <div className="aspect-[3/4] w-full bg-zinc-900" />
      </div>
    </SiteShell>
  );
}
