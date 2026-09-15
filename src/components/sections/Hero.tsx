import Image from "next/image";
import { business } from "@/data/business";
import { images } from "@/data/images";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-anita-black"
    >
      <Image
        src={images.fachada}
        alt="Fachada do Armazém Anita — mesas na calçada, toldo laranja e letreiro no Jardim Botânico"
        fill
        priority
        quality={92}
        className="object-cover object-[center_32%] md:object-[center_28%]"
        sizes="100vw"
      />
      {/* Gradiente mais leve no topo para o letreiro permanecer visível */}
      <div className="absolute inset-0 bg-gradient-to-t from-anita-black via-anita-black/55 to-anita-black/10" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-anita-black/50 to-transparent md:h-24" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-end px-4 pb-28 pt-36 md:px-6 md:pb-20 md:pt-44">
        {/* Espaço reservado ao letreiro na foto (faixa superior do hero) */}
        <div
          className="pointer-events-none mb-auto hidden min-h-[22vh] w-full md:block lg:min-h-[26vh]"
          aria-hidden
        />
        <div className="max-w-xl animate-fade-up lg:max-w-2xl">
          <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-anita-orange uppercase">
            Jardim Botânico — Porto Alegre
          </p>
          <h1 className="font-display text-4xl leading-[0.95] tracking-wide text-white uppercase sm:text-5xl md:text-6xl lg:text-7xl">
            Do café ao happy hour.
          </h1>
          <p className="mt-5 max-w-md text-base text-white/80 md:text-lg">
            {business.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/cardapio">Ver Cardápio</Button>
            <Button href={business.mapsUrl} variant="outline" external>
              Como Chegar
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center gap-1 text-anita-orange">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-lg">
                  ★
                </span>
              ))}
            </div>
            <div className="text-sm text-white/70">
              <span className="font-bold text-white">
                {business.googleRating}
              </span>{" "}
              no Google ·{" "}
              <span className="font-medium text-white">
                +{business.googleReviews} avaliações
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
