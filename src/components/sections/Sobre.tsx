import Image from "next/image";
import { business } from "@/data/business";
import { images } from "@/data/images";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function Sobre() {
  return (
    <section id="sobre" className="bg-anita-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle title="Sobre o Armazém" />
            <div className="space-y-4 text-anita-gray">
              <p className="text-lg leading-relaxed text-anita-black">
                Um armazém de bairro daquele jeito que a gente gosta.
              </p>
              <p>
                O {business.name} é aquele lugar onde você passa de manhã para
                tomar um café, compra o que precisa no mercadinho e, quando o
                dia vira, encontra os amigos para um chope, um churrasquinho e
                aquele clima de boteco no Jardim Botânico.
              </p>
              <p>
                Não é só padaria. Não é só mercado. Não é só bar. É a mistura
                que faz ser Anita — {business.tagline.toLowerCase()}
              </p>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lg">
            <Image
              src="/images/instagram/ig-09-Dcb0rGzD9_J.jpg"
              alt="Interior do Armazém Anita — padaria, salgados e prateleiras"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-anita-black/60 to-transparent" />
            <div className="absolute right-4 bottom-4 left-4">
              <Image
                src={images.logo}
                alt="Logo Armazém Anita"
                width={120}
                height={120}
                className="h-14 w-14 rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
