import Image from "next/image";
import { business } from "@/data/business";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function HappyHour() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <Image
        src="/images/happy-hour-ig.jpg"
        alt="Happy hour no Anita — chope e petiscos"
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority={false}
      />
      <div className="absolute inset-0 bg-anita-black/75" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        <SectionTitle
          title="Depois do trabalho, o destino é Anita."
          subtitle="Chope gelado, churrasquinho, futebol e aquele clima de boteco de bairro."
          light
        />

        <div className="flex flex-wrap gap-3">
          {["🍺 Chope", "🔥 Churrasquinho", "⚽ Futebol", "🎶 Música", "🍽 Petiscos"].map(
            (item) => (
              <span
                key={item}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm"
              >
                {item}
              </span>
            ),
          )}
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/cardapio">Ver Cardápio</Button>
          <Button href={business.mapsUrl} variant="outline" external>
            Como Chegar
          </Button>
        </div>
      </div>
    </section>
  );
}
