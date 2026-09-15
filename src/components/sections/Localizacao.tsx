import Image from "next/image";
import { business, openingHours, openingHoursNote } from "@/data/business";
import { images } from "@/data/images";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function Localizacao() {
  return (
    <section id="localizacao" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionTitle
          title="Pertinho de você."
          subtitle="Seu ponto de encontro no Jardim Botânico."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl bg-anita-cream p-6">
            <h3 className="font-display text-xl tracking-wide text-anita-black uppercase">
              Endereço
            </h3>
            <p className="mt-3 text-anita-gray">
              {business.address.street}
              <br />
              {business.address.neighborhood}
              <br />
              {business.address.city} - {business.address.state}
              <br />
              CEP {business.address.zip}
            </p>

            <h3 className="mt-6 font-display text-xl tracking-wide text-anita-black uppercase">
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

          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl lg:aspect-auto lg:min-h-full">
            <Image
              src={images.fachada}
              alt="Fachada do Armazém Anita na Rua Buenos Aires"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="mt-6 grid items-stretch gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-dashed border-anita-gray/30 p-6">
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

          <div className="relative h-full min-h-[280px] overflow-hidden rounded-2xl">
            <iframe
              title="Localização Armazém Anita no Google Maps"
              src="https://maps.google.com/maps?q=R.+Buenos+Aires,+373,+Jardim+Bot%C3%A2nico,+Porto+Alegre+-+RS&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
