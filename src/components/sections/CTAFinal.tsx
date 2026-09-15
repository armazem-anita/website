import { business } from "@/data/business";
import { Button } from "@/components/ui/Button";

export function CTAFinal() {
  return (
    <section className="relative overflow-hidden bg-anita-orange py-12 md:py-16">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-white" />
        <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-anita-black" />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-4 text-center md:px-6">
        <h2 className="font-display text-3xl leading-tight tracking-wide text-white uppercase md:text-4xl">
          Do café ao chope, a gente se encontra no Anita.
        </h2>
        <p className="mt-3 text-base text-white/90 md:text-lg">
          Passa no Armazém e aproveita o melhor do bairro.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href="/cardapio" variant="secondary">
            Ver Cardápio
          </Button>
          <Button
            href={business.mapsUrl}
            variant="outline"
            className="!border-white !text-white hover:!bg-white hover:!text-anita-orange"
            external
          >
            Como Chegar
          </Button>
        </div>
      </div>
    </section>
  );
}
