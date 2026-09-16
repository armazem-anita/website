import {
  business,
  locations,
  openingHours,
  openingHoursNote,
} from "@/data/business";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function Localizacao() {
  return (
    <section id="localizacao" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionTitle
          title="Pertinho de você."
          subtitle="Duas unidades em Porto Alegre para te receber."
        />

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Mobile: 1 · Desktop: esq. cima */}
          <div className="order-1 rounded-2xl bg-anita-cream p-6">
            <h3 className="font-display text-xl tracking-wide text-anita-black uppercase">
              Endereço
            </h3>

            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              {locations.map((location) => (
                <div key={location.id}>
                  <p className="text-xs font-bold tracking-widest text-anita-orange uppercase">
                    {location.label}
                  </p>
                  <p className="mt-2 text-sm text-anita-gray">
                    {location.street}
                    <br />
                    {location.neighborhood}
                    <br />
                    {location.city} - {location.state}
                    <br />
                    CEP {location.zip}
                  </p>
                </div>
              ))}
            </div>

            <h3 className="mt-8 font-display text-xl tracking-wide text-anita-black uppercase">
              Telefone
            </h3>
            <a
              href={business.phoneLink}
              className="mt-2 inline-block text-lg font-semibold text-anita-orange hover:underline"
            >
              {business.phone}
            </a>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={business.mapsUrl} external>
                Abrir no Google Maps
              </Button>
              <Button href={business.phoneLink} variant="secondary">
                Ligar Agora
              </Button>
            </div>
          </div>

          {/* Mobile: 2 · Desktop: dir. cima */}
          <div className="relative order-2 min-h-[280px] overflow-hidden rounded-2xl">
            <iframe
              title="Unidade Encantado no Google Maps"
              src="https://maps.google.com/maps?q=Av.+Encantado,+313,+Petr%C3%B3polis,+Porto+Alegre+-+RS,+90470-420&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Mobile: 3 · Desktop: dir. baixo */}
          <div className="relative order-3 min-h-[280px] overflow-hidden rounded-2xl lg:order-4">
            <iframe
              title="Unidade Jardim Botânico no Google Maps"
              src="https://maps.google.com/maps?q=R.+Buenos+Aires,+373,+Jardim+Bot%C3%A2nico,+Porto+Alegre+-+RS&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Mobile: 4 · Desktop: esq. baixo */}
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
        </div>
      </div>
    </section>
  );
}
