import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { images } from "@/data/images";
import { CardapioSection } from "@/components/sections/CardapioSection";
import { MobileBar } from "@/components/layout/MobileBar";

export const metadata: Metadata = {
  title: "Cardápio | Armazém Anita — Jardim Botânico, Porto Alegre",
  description:
    "Cardápio do Armazém Anita: petiscos, espetinhos, chopes, cervejas e drinks. Jardim Botânico, Porto Alegre.",
};

export default function CardapioPage() {
  return (
    <>
      <header className="bg-anita-black">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <Link href="/">
            <Image
              src={images.logo}
              alt="Armazém Anita"
              width={100}
              height={100}
              className="h-12 w-12 rounded-full object-cover"
            />
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-white/70 transition-colors hover:text-anita-orange"
          >
            ← Voltar ao início
          </Link>
        </div>
      </header>

      <main>
        <CardapioSection showAll />
      </main>

      <MobileBar />
    </>
  );
}
