"use client";

import { useEffect, useState } from "react";
import {
  business,
  locationTabs,
  locations,
  openingHours,
  openingHoursNote,
  type Location,
  type LocationKind,
} from "@/data/business";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/utils";

export function Localizacao() {
  const [kind, setKind] = useState<LocationKind>("mercado-e-bar");
  const [mapsReady, setMapsReady] = useState(false);
  const active = locations.filter((location) => location.kind === kind);
  const maps =
    kind === "mercado-e-bar" ? [...active].reverse() : active;
  const primary = active.find((location) => !location.pending) ?? active[0];
  const phone = primary?.phone ?? business.phone;
  const phoneLink = primary?.phoneLink ?? business.phoneLink;

  useEffect(() => {
    setMapsReady(true);
  }, []);

  return (
    <section id="localizacao" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionTitle
          title="Onde estamos"
          subtitle="Mercado e bar no Jardim Botânico e no Encantado. Mercados no bairro."
        />

        <div
          role="tablist"
          aria-label="Tipo de unidade"
          className="mb-8 inline-flex max-w-full gap-1 overflow-x-auto rounded-xl bg-anita-cream p-1"
        >
          {locationTabs.map((tab) => {
            const selected = kind === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setKind(tab.id)}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-semibold whitespace-nowrap transition-all",
                  selected
                    ? "bg-white text-anita-orange shadow-sm"
                    : "text-anita-black/70 hover:text-anita-black",
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="order-1 rounded-2xl bg-anita-cream p-6">
            <h3 className="font-display text-xl tracking-wide text-anita-black uppercase">
              Endereço
            </h3>

            <div className="mt-4 grid items-stretch gap-6 sm:grid-cols-2">
              {active.map((location) => (
                <LocationCard key={location.id} location={location} />
              ))}
            </div>

            <h3 className="mt-8 font-display text-xl tracking-wide text-anita-black uppercase">
              Telefone
            </h3>
            <a
              href={phoneLink}
              className="mt-2 inline-block text-lg font-semibold text-anita-orange hover:underline"
            >
              {phone}
            </a>

            <div className="mt-8 flex flex-wrap gap-3">
              {primary?.mapsUrl ? (
                <Button href={primary.mapsUrl} external>
                  Abrir no Google Maps
                </Button>
              ) : null}
              <Button href={phoneLink} variant="secondary">
                Ligar Agora
              </Button>
            </div>
          </div>

          {maps.map((location, index) => (
            <div
              key={`${location.id}-map`}
              className={cn(
                "relative min-h-[280px] overflow-hidden rounded-2xl",
                index === 0 ? "order-2" : "order-3 lg:order-4",
              )}
            >
              {location.mapsEmbed ? (
                mapsReady ? (
                  <iframe
                    title={`${location.label} no Google Maps`}
                    src={location.mapsEmbed}
                    className="absolute inset-0 h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <div className="absolute inset-0 bg-anita-cream" aria-hidden />
                )
              ) : (
                <div className="flex h-full min-h-[280px] items-center justify-center bg-anita-cream px-6 text-center">
                  <p className="text-sm text-anita-gray">
                    Mapa em breve — endereço ainda não confirmado.
                  </p>
                </div>
              )}
            </div>
          ))}

          {kind === "mercado-e-bar" ? (
            <div className="order-4 rounded-2xl border border-dashed border-anita-gray/30 p-6 lg:order-3">
              <h3 className="font-display text-xl tracking-wide text-anita-black uppercase">
                Horários
              </h3>
              <p className="mt-2 rounded-lg bg-anita-orange/10 px-3 py-2 text-sm text-anita-black/80">
                {openingHoursNote}
              </p>
              <ul className="mt-4 space-y-2">
                {openingHours.map((h) => (
                  <li
                    key={h.day}
                    className="flex justify-between text-sm text-anita-gray"
                  >
                    <span className="font-medium text-anita-black">{h.day}</span>
                    <span
                      className={
                        h.hours === "Fechado"
                          ? "font-semibold text-anita-orange"
                          : undefined
                      }
                    >
                      {h.hours}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-anita-gray">
                * Sexta e sábado sujeitos à programação de eventos.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function LocationCard({ location }: { location: Location }) {
  return (
    <div className="flex h-full flex-col">
      <p className="min-h-8 text-xs leading-4 font-bold tracking-widest text-anita-orange uppercase">
        {location.label}
      </p>
      <p className="mt-2 flex-1 text-sm leading-6 text-anita-gray">
        {location.pending ? (
          <>
            Endereço a confirmar
            <br />
            Porto Alegre - RS
          </>
        ) : (
          <>
            {location.street}
            <br />
            {location.neighborhood}
            <br />
            {location.city} - {location.state}
            {location.zip ? (
              <>
                <br />
                CEP {location.zip}
              </>
            ) : null}
          </>
        )}
      </p>
      <InstagramLink href={location.instagram} />
    </div>
  );
}

function InstagramLink({ href }: { href?: string }) {
  const className =
    "mt-4 inline-flex min-h-6 items-center gap-2 text-sm font-semibold leading-none text-anita-orange hover:text-anita-orange-dark";

  if (!href) {
    return (
      <p className="mt-4 inline-flex min-h-6 items-center gap-2 text-sm leading-none text-anita-gray">
        <InstagramIcon />
        Instagram a confirmar
      </p>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <InstagramIcon />
      Instagram
    </a>
  );
}

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}
