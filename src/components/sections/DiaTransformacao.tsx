import Image from "next/image";
import { dayPhases } from "@/data/business";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function DiaTransformacao() {
  return (
    <section className="torn-edge relative overflow-hidden bg-anita-black py-20 text-white md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionTitle
          title="O Anita acompanha o seu dia."
          subtitle="Começa com café. Pode terminar em chope."
          light
        />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h3 className="font-display text-2xl tracking-wide text-anita-orange uppercase">
                {dayPhases.morning.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {dayPhases.morning.items.map((item) => (
                  <li key={item} className="text-lg text-white/80">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-center">
              <span className="text-4xl text-anita-orange">↓</span>
            </div>

            <div className="rounded-2xl border border-anita-orange/30 bg-anita-orange/10 p-6">
              <h3 className="font-display text-2xl tracking-wide text-anita-orange uppercase">
                {dayPhases.evening.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {dayPhases.evening.items.map((item) => (
                  <li key={item} className="text-lg text-white/80">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src="/images/manha-padaria.jpg"
                  alt="Padaria fresca no Anita — pães e itens feitos na hora"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-anita-orange/20" />
                <span className="absolute bottom-3 left-3 rounded bg-anita-black/80 px-2 py-1 text-xs font-bold text-white">
                  Manhã
                </span>
              </div>
              <div className="relative mt-8 aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600&q=80"
                  alt="Chope no happy hour"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-anita-black/30" />
                <span className="absolute bottom-3 left-3 rounded bg-anita-orange px-2 py-1 text-xs font-bold text-white">
                  Noite
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CafeManha() {
  return (
    <section className="bg-anita-cream py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center gap-8 overflow-hidden rounded-3xl bg-white shadow-sm md:flex-row">
          <div className="relative h-64 w-full md:h-80 md:w-1/2">
            <Image
              src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80"
              alt="Padaria fresca no Armazém Anita — pães e itens feitos na hora"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="p-8 md:w-1/2 md:p-12">
            <p className="text-sm font-bold tracking-widest text-anita-orange uppercase">
              Bom dia, Jardim Botânico.
            </p>
            <h3 className="mt-2 font-display text-4xl tracking-wide text-anita-black uppercase">
              Café da manhã no Anita
            </h3>
            <p className="mt-4 text-anita-gray">
              No armazém tem o que você precisa pra montar o café da manhã:
              padaria feita na hora, pães quentinhos, frios, mercadinho e o
              essencial do dia a dia — tudo no mesmo lugar.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-anita-black/80">
              <li>• Itens de padaria frescos, feitos na hora</li>
              <li>• Pães, salgados e o básico do café</li>
              <li>• Mercadinho para completar a mesa</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
