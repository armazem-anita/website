import { business } from "@/data/business";
import Link from "next/link";

export function MobileBar() {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-40 border-t border-anita-cream-dark bg-white/95 p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-lg gap-3">
        <Link
          href="/cardapio"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-anita-orange py-3 text-sm font-bold tracking-wide text-white uppercase transition-transform active:scale-95"
        >
          <span>🍽</span> Cardápio
        </Link>
        <a
          href={business.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-anita-black py-3 text-sm font-bold tracking-wide text-white uppercase transition-transform active:scale-95"
        >
          <span>📍</span> Rotas
        </a>
      </div>
    </div>
  );
}
