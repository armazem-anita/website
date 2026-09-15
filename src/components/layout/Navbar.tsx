"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { business } from "@/data/business";
import { images } from "@/data/images";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#inicio", label: "Início" },
  { href: "#cardapio", label: "Cardápio" },
  { href: "#destaques", label: "Destaques" },
  { href: "#eventos", label: "Eventos" },
  { href: "#sobre", label: "Sobre" },
  { href: "#avaliacoes", label: "Avaliações" },
  { href: "#localizacao", label: "Onde Estamos" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-anita-black/95 py-2 shadow-lg backdrop-blur-md"
            : "bg-transparent py-4",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6">
          <Link href="#inicio" className="flex items-center gap-2">
            <Image
              src={images.logo}
              alt="Armazém Anita — logo"
              width={96}
              height={96}
              className="h-16 w-16 rounded-full object-cover md:h-20 md:w-20"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/80 transition-colors hover:text-anita-orange"
              >
                {link.label}
              </a>
            ))}
            <Button href="/cardapio" className="!px-5 !py-2 !text-xs">
              Ver Cardápio
            </Button>
          </nav>

          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            <span
              className={cn(
                "h-0.5 w-6 bg-white transition-all",
                menuOpen && "translate-y-2 rotate-45",
              )}
            />
            <span
              className={cn(
                "h-0.5 w-6 bg-white transition-all",
                menuOpen && "opacity-0",
              )}
            />
            <span
              className={cn(
                "h-0.5 w-6 bg-white transition-all",
                menuOpen && "-translate-y-2 -rotate-45",
              )}
            />
          </button>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-anita-black/98 transition-opacity duration-300 lg:hidden",
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <nav className="flex h-full flex-col items-center justify-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-3xl tracking-wide text-white uppercase hover:text-anita-orange"
            >
              {link.label}
            </a>
          ))}
          <Button href="/cardapio" className="mt-4">
            Ver Cardápio
          </Button>
          <a
            href={business.phoneLink}
            className="mt-2 text-sm text-white/60"
            onClick={() => setMenuOpen(false)}
          >
            {business.phone}
          </a>
        </nav>
      </div>
    </>
  );
}
