import Image from "next/image";
import { featuredItems } from "@/data/menu";
import { MenuCard } from "@/components/cardapio/MenuCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function Destaques() {
  const realItems = featuredItems.filter((i) => i.isReal);

  return (
    <section id="destaques" className="bg-anita-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionTitle
          title="Os queridinhos do Anita"
          subtitle="Os favoritos de quem passa no armazém."
        />

        <div className="mb-12 grid gap-8 lg:grid-cols-2">
          {realItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-3xl bg-anita-black"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-anita-black via-transparent to-transparent" />
              </div>
              <div className="absolute right-0 bottom-0 left-0 p-6 md:p-8">
                <p className="text-xs font-bold tracking-widest text-anita-orange uppercase">
                  Destaque
                </p>
                <h3 className="mt-1 font-display text-3xl tracking-wide text-white uppercase md:text-4xl">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm text-white/70">{item.description}</p>
                <p className="mt-3 font-display text-2xl text-anita-orange uppercase">
                  {item.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredItems.slice(0, 3).map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
