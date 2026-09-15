import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBar } from "@/components/layout/MobileBar";
import { Hero } from "@/components/sections/Hero";
import { TudoUmPouco } from "@/components/sections/TudoUmPouco";
import { CardapioSection } from "@/components/sections/CardapioSection";
import { Destaques } from "@/components/sections/Destaques";
import { CafeManha, DiaTransformacao } from "@/components/sections/DiaTransformacao";
import { HappyHour } from "@/components/sections/HappyHour";
import { Eventos } from "@/components/sections/Eventos";
import { Galeria } from "@/components/sections/Galeria";
import { Avaliacoes } from "@/components/sections/Avaliacoes";
import { Sobre } from "@/components/sections/Sobre";
import { Localizacao } from "@/components/sections/Localizacao";
import { CTAFinal } from "@/components/sections/CTAFinal";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TudoUmPouco />
        <CardapioSection limit={4} />
        <Destaques />
        <CafeManha />
        <DiaTransformacao />
        <HappyHour />
        <Eventos />
        <Galeria />
        <Avaliacoes />
        <Sobre />
        <Localizacao />
        <CTAFinal />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
