import { todayHighlight } from "@/data/events";

export function HojeNoAnita() {
  return (
    <section className="bg-anita-orange py-4">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 sm:flex-row md:px-6">
        <div className="flex items-center gap-3">
          <span className="rounded bg-anita-black px-2 py-0.5 text-xs font-bold tracking-widest text-white uppercase">
            Hoje no Anita
          </span>
        </div>
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
          <p className="text-center text-sm font-semibold text-white sm:text-base">
            ⚽ {todayHighlight.title}
          </p>
          <a
            href="#eventos"
            className="rounded-full bg-anita-black px-4 py-1.5 text-xs font-bold tracking-wide text-white uppercase transition-transform hover:scale-105"
          >
            Ver Detalhes
          </a>
        </div>
      </div>
    </section>
  );
}
