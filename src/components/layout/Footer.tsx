import Image from "next/image";
import Link from "next/link";
import { business } from "@/data/business";
import { images } from "@/data/images";

const footerLinks = [
  { href: "#inicio", label: "Início" },
  { href: "/cardapio", label: "Cardápio" },
  { href: "#eventos", label: "Eventos" },
  { href: "#sobre", label: "Sobre" },
  { href: "#localizacao", label: "Localização" },
  { href: business.googleReviewsUrl, label: "Google", external: true },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-anita-black text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 md:flex-row md:items-center md:justify-between md:gap-6 md:px-6 md:py-4">
        <div className="flex min-w-0 items-center gap-3">
          <Image
            src={images.logo}
            alt="Armazém Anita"
            width={64}
            height={64}
            className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-anita-orange/35"
          />
          <div className="min-w-0 leading-tight">
            <p className="truncate font-display text-base tracking-wide text-white uppercase">
              {business.name}
            </p>
            <p className="truncate text-xs text-white/50">
              {business.address.street}, {business.address.neighborhood}
            </p>
            <a
              href={business.phoneLink}
              className="text-xs font-semibold text-anita-orange hover:underline"
            >
              {business.phone}
            </a>
          </div>
        </div>

        <nav
          aria-label="Links do rodapé"
          className="flex flex-wrap items-center gap-x-4 gap-y-1 md:justify-end"
        >
          {footerLinks.map((link) => {
            const className =
              "text-xs text-white/60 transition-colors hover:text-anita-orange";
            return link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {link.label}
              </a>
            ) : (
              <Link key={link.label} href={link.href} className={className}>
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-white/10 px-4 py-2.5 text-center text-[10px] text-white/30 md:px-6">
        © {new Date().getFullYear()} {business.name} · Desenvolvido por{" "}
        <a
          href="https://www.xpresssolutions.com.br/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/45 transition-colors hover:text-anita-orange"
        >
          Xpress Solutions
        </a>
      </div>
    </footer>
  );
}
