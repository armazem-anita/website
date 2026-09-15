import Image from "next/image";
import { events } from "@/data/events";
import { SectionTitle } from "@/components/ui/SectionTitle";

const typeIcons: Record<string, string> = {
  futebol: "⚽",
  musica: "🎶",
  "happy-hour": "🍺",
  especial: "✨",
  promocao: "🏷",
};

export function Eventos() {
  return (
    <section id="eventos" className="bg-anita-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionTitle
          title="Agenda do Armazém"
          subtitle="Futebol, música ao vivo, happy hour e muito mais."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <article
              key={event.id}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                />
                {event.date ? (
                  <div className="absolute top-3 left-3">
                    <span className="rounded bg-anita-orange px-2 py-1 text-xs font-bold text-white uppercase">
                      {event.date}
                    </span>
                  </div>
                ) : null}
              </div>

              <div className="flex flex-1 flex-col p-5">
                {(event.day || typeIcons[event.type]) && (
                  <p className="text-xs font-bold tracking-widest text-anita-orange uppercase">
                    {typeIcons[event.type]}
                    {event.day ? ` ${event.day}` : ""}
                  </p>
                )}
                <h3 className="mt-1 font-display text-2xl tracking-wide text-anita-black uppercase">
                  {event.title}
                </h3>
                <p className="mt-2 text-sm text-anita-gray">{event.description}</p>
                {event.time ? (
                  <p className="mt-3 text-xs text-anita-gray-light">{event.time}</p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
