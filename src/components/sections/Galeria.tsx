"use client";

import Image from "next/image";
import { useState } from "react";
import { galleryImages } from "@/data/gallery";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/utils";

export function Galeria() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = galleryImages[activeIndex];

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionTitle
          title="Um pouco do Anita."
          subtitle="Fotos reais do estabelecimento e do dia a dia no armazém."
        />

        <div className="grid gap-4 md:grid-cols-[1.4fr_1fr] md:gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-anita-cream md:aspect-auto md:min-h-[420px] lg:min-h-[520px]">
            <Image
              key={active.src}
              src={active.src}
              alt={active.alt}
              fill
              className="object-cover transition-opacity duration-300"
              sizes="(max-width: 768px) 100vw, 60vw"
              priority
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-anita-black/80 to-transparent p-5 pt-16 md:p-6 md:pt-20">
              <p className="font-display text-xl tracking-wide text-white uppercase md:text-2xl">
                {active.title}
              </p>
              <p className="mt-1 text-sm text-white/80 md:text-base">
                {active.description}
              </p>
            </div>
          </div>

          <ul className="flex max-h-[420px] flex-col gap-2 overflow-y-auto md:max-h-[520px]">
            {galleryImages.map((img, i) => {
              const isActive = i === activeIndex;
              return (
                <li key={img.src}>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    aria-pressed={isActive}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border p-2 text-left transition-all duration-200",
                      isActive
                        ? "border-anita-orange bg-anita-cream shadow-sm"
                        : "border-anita-cream-dark/60 bg-white hover:border-anita-orange/50 hover:bg-anita-cream/40",
                    )}
                  >
                    <span className="relative h-14 w-16 shrink-0 overflow-hidden rounded-lg md:h-16 md:w-20">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        sizes="80px"
                        loading="lazy"
                      />
                    </span>
                    <span className="min-w-0 flex-1 pr-1">
                      <span
                        className={cn(
                          "block text-sm font-semibold uppercase tracking-wide",
                          isActive ? "text-anita-orange" : "text-anita-black",
                        )}
                      >
                        {img.title}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-anita-gray md:text-sm">
                        {img.description}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
