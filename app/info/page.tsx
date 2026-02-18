import SiteShell from "../components/SiteShell";

export default function InfoPage() {
  return (
    <SiteShell>
      <div className="w-full self-stretch text-left">
        <div className="max-w-sm space-y-4 text-zinc-700">
          <p className="text-[15px] leading-6">
            Since 2024 ...
            <br />
            Contact anything ...
            <br />
            : Phone , Mail , Kakao , DM
          </p>
        </div>
      </div>
    </SiteShell>
  );
}
