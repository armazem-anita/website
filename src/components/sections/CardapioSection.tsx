"use client";

import { useState } from "react";
import {
  MenuCategory,
  MenuItem,
  menuCategories,
  menuItems,
  sortMenuItems,
} from "@/data/menu";
import { MenuCard } from "@/components/cardapio/MenuCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface CardapioSectionProps {
  showAll?: boolean;
  limit?: number;
}

export function CardapioSection({
  showAll = false,
  limit = 4,
}: CardapioSectionProps) {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("todos");
  const [search, setSearch] = useState("");

  const filtered = sortMenuItems(
    menuItems.filter((item) => {
      const matchesCategory =
        activeCategory === "todos" || item.category === activeCategory;
      const matchesSearch =
        search === "" ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    }),
  );

  const displayItems = showAll ? filtered : filtered.slice(0, limit);

  return (
    <section
      id="cardapio"
      className={cn(
        "bg-white",
        showAll ? "pt-8 pb-20 md:pt-10 md:pb-28" : "py-20 md:py-28",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionTitle
          title="Cardápio"
          subtitle="Confira o que tem para comer e beber no Anita."
        />

        {showAll && (
          <div className="mb-6">
            <div className="relative">
              <span className="absolute top-1/2 left-4 -translate-y-1/2 text-anita-gray">
                🔎
              </span>
              <input
                type="search"
                placeholder="Buscar café, chopp, comida..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-full border border-anita-cream-dark bg-anita-cream/50 py-3 pr-4 pl-11 text-sm outline-none transition-colors focus:border-anita-orange focus:ring-2 focus:ring-anita-orange/20"
              />
            </div>
          </div>
        )}

        <div className="scrollbar-hide -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200",
                activeCategory === cat.id
                  ? "bg-anita-orange text-white shadow-md"
                  : "bg-anita-cream text-anita-black hover:bg-anita-cream-dark",
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div
          className={cn(
            "grid gap-4",
            showAll
              ? "sm:grid-cols-2 lg:grid-cols-3"
              : "sm:grid-cols-2",
          )}
        >
          {displayItems.map((item: MenuItem) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>

        {displayItems.length === 0 && (
          <p className="py-12 text-center text-anita-gray">
            Nenhum item encontrado. Tente outra busca ou categoria.
          </p>
        )}

        {!showAll && (
          <div className="mt-10 text-center">
            <Button href="/cardapio">Ver Cardápio Completo</Button>
          </div>
        )}
      </div>
    </section>
  );
}
