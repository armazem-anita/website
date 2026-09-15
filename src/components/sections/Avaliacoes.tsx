import { business, reviewThemes } from "@/data/business";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function Avaliacoes() {
  return (
    <section id="avaliacoes" className="bg-anita-black py-20 text-white md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionTitle
          title="Quem é do bairro já conhece."
          subtitle="Avaliações reais disponíveis no Google."
          light
        />

        <div className="mb-12 flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm md:flex-row md:justify-center md:gap-8">
          <div>
            <p className="font-display text-6xl tracking-wide text-anita-orange">
              {business.googleRating}
            </p>
            <div className="mt-1 flex justify-center gap-0.5 text-anita-orange">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
          </div>
          <div className="h-px w-full bg-white/10 md:h-16 md:w-px" />
          <div>
            <p className="text-3xl font-bold">+{business.googleReviews}</p>
            <p className="text-sm text-white/60">avaliações no Google</p>
            <p className="mt-1 text-sm text-white/40">{business.priceRange}</p>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {reviewThemes.map((theme) => (
            <span
              key={theme}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70"
            >
              {theme}
            </span>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-6"
            >
              <div className="mb-3 flex gap-0.5 text-anita-orange text-sm">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="text-sm text-white/50 italic">
                Confira as avaliações reais no Google — tema #{n}.
              </p>
              <p className="mt-4 text-xs text-white/30">— Cliente Google</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button href={business.googleReviewsUrl} variant="outline" external>
            Ver Avaliações no Google
          </Button>
        </div>
      </div>
    </section>
  );
}
