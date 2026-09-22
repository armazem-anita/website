export type MenuCategory =
  | "todos"
  | "petiscos"
  | "churrasquinho"
  | "chopes"
  | "cervejas"
  | "drinks";

export type MenuTag =
  | "mais-pedido"
  | "especial-casa"
  | "para-compartilhar"
  | "novidade"
  | "happy-hour"
  | "sem-alcool";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  /** Observação ao lado do preço (ex.: por unidade). */
  priceNote?: string;
  category: Exclude<MenuCategory, "todos">;
  image: string;
  tags?: MenuTag[];
  isPlaceholder?: boolean;
  isReal?: boolean;
}

export const menuCategories: { id: MenuCategory; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "petiscos", label: "Petiscos" },
  { id: "churrasquinho", label: "Espetinhos" },
  { id: "drinks", label: "Drinks" },
  { id: "chopes", label: "Chopes" },
  { id: "cervejas", label: "Cervejas" },
];

export const tagLabels: Record<MenuTag, string> = {
  "mais-pedido": "Mais pedido",
  "especial-casa": "Especial da casa",
  "para-compartilhar": "Para compartilhar",
  novidade: "Novidade",
  "happy-hour": "Happy Hour",
  "sem-alcool": "Sem álcool",
};

const menuImg = (file: string) => `/images/menu/${file}`;

export const menuItems: MenuItem[] = [
  // ═══════════════════════════════════════════
  // PETISCOS — PDF oficial
  // ═══════════════════════════════════════════
  {
    id: "pastel-carne-queijo",
    name: "Pastel Carne / Queijo",
    description: "Pastel frito na hora — escolha carne ou queijo.",
    price: "R$ 8,00",
    priceNote: "Por unidade",
    category: "petiscos",
    image: menuImg("pastel-pro.jpg"),
    tags: ["mais-pedido"],
    isReal: true,
  },
  {
    id: "batata-frita",
    name: "Batata Frita",
    description: "Porção generosa de batata frita crocante.",
    price: "R$ 39,90",
    category: "petiscos",
    image: menuImg("batata-frita-pro.jpg"),
    tags: ["para-compartilhar"],
    isReal: true,
  },
  {
    id: "cebola-milanesa",
    name: "Cebola à Milanesa",
    description: "Anéis de cebola empanados e crocantes, servidos com molho.",
    price: "R$ 39,90",
    category: "petiscos",
    image: menuImg("cebola-milanesa-pro.jpg"),
    tags: ["para-compartilhar"],
    isReal: true,
  },
  {
    id: "iscas-frango",
    name: "Iscas de Frango à Milanesa",
    description:
      "Porção de iscas de frango empanadas, servidas com molhos da casa e limão.",
    price: "R$ 59,90",
    category: "petiscos",
    image: menuImg("iscas-frango-pro.jpg"),
    tags: ["mais-pedido", "para-compartilhar"],
    isReal: true,
  },
  {
    id: "iscas-tilapia",
    name: "Iscas de Tilápia à Milanesa",
    description:
      "Porção de iscas de tilápia empanadas, servidas com molhos da casa e limão.",
    price: "R$ 79,90",
    category: "petiscos",
    image: menuImg("iscas-tilapia-pro.jpg"),
    tags: ["especial-casa", "para-compartilhar"],
    isReal: true,
  },
  {
    id: "picado-anita",
    name: "Picado Anita",
    description:
      "Tábua com queijo, salaminho, picles e pão — o picado da casa.",
    price: "R$ 59,90",
    category: "petiscos",
    image: menuImg("picado-anita-pro.jpg"),
    tags: ["especial-casa", "para-compartilhar"],
    isReal: true,
  },
  {
    id: "bolinho-carne-seca",
    name: "Bolinho de Carne Seca",
    description: "Bolinhos fritos de carne seca, servidos com molho e limão.",
    price: "R$ 55,90",
    category: "petiscos",
    image: menuImg("bolinho-carne-seca-pro.jpg"),
    tags: ["para-compartilhar"],
    isReal: true,
  },

  // Extras enviados no WhatsApp (ainda sem preço no PDF)
  {
    id: "polenta-linguica-provolone",
    name: "Polenta de Linguiça Campeira c/ Provolone",
    description:
      "Polenta frita recheada com linguiça campeira e queijo provolone. Porção de 500 g.",
    price: "R$ 59,90",
    category: "petiscos",
    image: menuImg("polenta-pro.jpg"),
    tags: ["novidade", "para-compartilhar"],
    isReal: true,
  },
  {
    id: "raviolloni-linguicinha",
    name: "Raviolloni Linguicinha, Minas e Orégano",
    description:
      "Raviolloni frito recheado com linguicinha, queijo minas e orégano. Porção de 500 g.",
    price: "R$ 59,90",
    category: "petiscos",
    image: menuImg("raviolloni-linguicinha-pro.jpg"),
    tags: ["novidade", "para-compartilhar"],
    isReal: true,
  },
  {
    id: "raviolloni-4-queijos",
    name: "Raviolloni de 4 Queijos",
    description: "Raviolloni frito recheado com quatro queijos. Porção de 500 g.",
    price: "R$ 59,90",
    category: "petiscos",
    image: menuImg("raviolloni-4queijos-pro.jpg"),
    tags: ["novidade", "para-compartilhar"],
    isReal: true,
  },

  // ═══════════════════════════════════════════
  // ESPETINHOS — PDF oficial
  // ═══════════════════════════════════════════
  {
    id: "espetinho-carne",
    name: "Espetinho de Carne",
    description: "Espetinho na brasa — carne.",
    price: "R$ 17,00",
    category: "churrasquinho",
    image: menuImg("espetinho-carne-v2.jpg"),
    tags: ["mais-pedido"],
    isReal: true,
  },
  {
    id: "espetinho-frango-bacon",
    name: "Espetinho de Frango c/ Bacon",
    description: "Espetinho na brasa — frango com bacon.",
    price: "R$ 17,00",
    category: "churrasquinho",
    image: menuImg("espetinho-frango-bacon.jpg"),
    isReal: true,
  },
  {
    id: "espetinho-misto",
    name: "Espetinho Misto",
    description: "Espetinho na brasa — misto.",
    price: "R$ 17,00",
    category: "churrasquinho",
    image: menuImg("espetinho-misto.jpg"),
    isReal: true,
  },
  {
    id: "espetinho-coracao",
    name: "Espetinho de Coração",
    description: "Espetinho na brasa — coração.",
    price: "R$ 17,00",
    category: "churrasquinho",
    image: menuImg("espetinho-coracao.jpg"),
    isReal: true,
  },
  {
    id: "espetinho-queijo-coalho",
    name: "Espetinho de Queijo Coalho",
    description: "Espetinho na brasa — queijo coalho.",
    price: "R$ 12,00",
    category: "churrasquinho",
    image: menuImg("espetinho-queijo-coalho.jpg"),
    isReal: true,
  },
  {
    id: "espetinho-pao-alho",
    name: "Espetinho de Pão de Alho",
    description: "Espetinho na brasa — pão de alho.",
    price: "R$ 12,00",
    category: "churrasquinho",
    image: menuImg("espetinho-pao-alho.jpg"),
    isReal: true,
  },
  {
    id: "espetinho-romeu-julieta",
    name: "Espetinho Romeu e Julieta",
    description: "Goiabada cascão, queijo coalho e bacon.",
    price: "R$ 15,00",
    category: "churrasquinho",
    image: menuImg("espetinho-romeu-julieta.jpg"),
    tags: ["especial-casa"],
    isReal: true,
  },
  {
    id: "espetinho-picanha",
    name: "Espetinho de Picanha",
    description: "Espetinho na brasa — picanha.",
    price: "R$ 25,00",
    category: "churrasquinho",
    image: menuImg("espetinho-picanha.jpg"),
    tags: ["especial-casa", "mais-pedido"],
    isReal: true,
  },

  // ═══════════════════════════════════════════
  // DRINKS — PDF oficial
  // ═══════════════════════════════════════════
  {
    id: "mojito",
    name: "Mojito",
    description: "Drink clássico com hortelã fresca, limão e gelo.",
    price: "R$ 29,00",
    category: "drinks",
    image: menuImg("mojito-pro.jpg"),
    isReal: true,
  },
  {
    id: "london-dry-gin-tonica",
    name: "London Dry Gin Tônica",
    description: "Gin London Dry com tônica e toque cítrico.",
    price: "R$ 29,00",
    category: "drinks",
    image: menuImg("gin-tonica-pro.jpg"),
    isReal: true,
  },
  {
    id: "moscow-mule",
    name: "Moscow Mule",
    description: "Clássico na caneca de cobre, com espuma e hortelã.",
    price: "R$ 39,00",
    category: "drinks",
    image: menuImg("moscow-mule-pro.jpg"),
    tags: ["especial-casa"],
    isReal: true,
  },
  {
    id: "soft-moscow",
    name: "Soft Moscow",
    description: "Versão sem álcool do Moscow Mule.",
    price: "R$ 39,00",
    category: "drinks",
    image: menuImg("soft-moscow-pro.jpg"),
    tags: ["sem-alcool"],
    isReal: true,
  },
  {
    id: "drink-campari-licor-43",
    name: "Drink de Campari e Licor 43",
    description: "Drink da casa com Campari e Licor 43.",
    price: "R$ 29,00",
    category: "drinks",
    image: menuImg("drink-campari-pro.jpg"),
    tags: ["novidade"],
    isReal: true,
  },
  {
    id: "aperol",
    name: "Aperol",
    description: "Drink com Aperol, gelo e toque cítrico.",
    price: "R$ 29,00",
    category: "drinks",
    image: menuImg("aperol-pro.jpg"),
    isReal: true,
  },
  {
    id: "caipiras",
    name: "Caipiras",
    description: "Maracujá, morango, kiwi ou limão.",
    price: "R$ 29,00",
    category: "drinks",
    image: menuImg("caipiras-pro.jpg"),
    tags: ["mais-pedido"],
    isReal: true,
  },

  // ═══════════════════════════════════════════
  // CHOPES — PDF oficial
  // ═══════════════════════════════════════════
  {
    id: "chopp-brahma-caneco",
    name: "Chopp Brahma Caneco 400 ml",
    description: "Chopp Brahma servido no caneco de 400 ml.",
    price: "R$ 17,00",
    category: "chopes",
    image: menuImg("chopp-caneco-v5.jpg"),
    tags: ["mais-pedido", "happy-hour"],
    isReal: true,
  },
  {
    id: "chopp-brahma-caldereta",
    name: "Chopp Brahma Caldereta 300 ml",
    description: "Chopp Brahma servido na caldereta de 300 ml.",
    price: "R$ 15,00",
    category: "chopes",
    image: menuImg("chopp-caldereta-v3.jpg"),
    tags: ["happy-hour"],
    isReal: true,
  },

  // ═══════════════════════════════════════════
  // CERVEJAS
  // ═══════════════════════════════════════════
  {
    id: "heineken-600",
    name: "Heineken 600 ml",
    description: "Cerveja Heineken longneck 600 ml gelada.",
    price: "R$ 20,00",
    category: "cervejas",
    image: menuImg("heineken-600-pro.jpg"),
    tags: ["novidade"],
    isReal: true,
  },
  {
    id: "original-600",
    name: "Original 600 ml",
    description: "Cerveja Original longneck 600 ml gelada.",
    price: "R$ 18,00",
    category: "cervejas",
    image: menuImg("original-600-v2.jpg"),
    tags: ["novidade"],
    isReal: true,
  },
];

/** Ordem de exibição: novidades → mais pedido → especial da casa → resto */
export function menuSortRank(item: MenuItem): number {
  if (item.tags?.includes("novidade")) return 0;
  if (item.tags?.includes("mais-pedido")) return 1;
  if (item.tags?.includes("especial-casa")) return 2;
  return 3;
}

export function sortMenuItems(items: MenuItem[]): MenuItem[] {
  return [...items].sort((a, b) => {
    const rank = menuSortRank(a) - menuSortRank(b);
    if (rank !== 0) return rank;
    return a.name.localeCompare(b.name, "pt-BR");
  });
}

export const featuredItems = sortMenuItems(
  menuItems.filter(
    (item) =>
      item.tags?.includes("novidade") ||
      item.tags?.includes("mais-pedido") ||
      item.tags?.includes("especial-casa"),
  ),
);
