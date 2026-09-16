export const locations = [
  {
    id: "jardim-botanico",
    label: "Unidade Jardim Botânico",
    street: "R. Buenos Aires, 373",
    neighborhood: "Jardim Botânico",
    city: "Porto Alegre",
    state: "RS",
    zip: "90670-130",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=R.+Buenos+Aires,+373,+Jardim+Botânico,+Porto+Alegre+-+RS",
  },
  {
    id: "encantado",
    label: "Unidade Encantado",
    street: "Av. Encantado, 313",
    neighborhood: "Petrópolis",
    city: "Porto Alegre",
    state: "RS",
    zip: "90470-420",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Av.+Encantado,+313,+Petr%C3%B3polis,+Porto+Alegre+-+RS",
  },
] as const;

export const business = {
  name: "Armazém Anita",
  tagline: "O primeiro armazém e bar do Brasil.",
  slogan: "Do café ao happy hour.",
  description:
    "O Armazém Anita é aquele lugar de bairro onde tem um pouco de tudo: café, comida, compras rápidas e chope gelado no Jardim Botânico.",
  address: {
    street: locations[0].street,
    neighborhood: locations[0].neighborhood,
    city: locations[0].city,
    state: locations[0].state,
    zip: locations[0].zip,
    full: "R. Buenos Aires, 373 — Jardim Botânico, Porto Alegre - RS",
  },
  phone: "(51) 3276-0903",
  phoneLink: "tel:+555132760903",
  googleRating: 4.5,
  googleReviews: 263,
  priceRange: "R$ 20–100 por pessoa",
  mapsUrl: locations[0].mapsUrl,
  googleReviewsUrl:
    "https://www.google.com/maps/search/?api=1&query=Armazém+Anita+Porto+Alegre",
  coordinates: { lat: -30.0589, lng: -51.1889 },
} as const;

export const features = [
  {
    icon: "☕",
    title: "Café",
    description: "Comece o dia com um café no Anita.",
  },
  {
    icon: "🥖",
    title: "Padaria",
    description: "Itens para aquele café da manhã ou lanche.",
  },
  {
    icon: "🛒",
    title: "Mercadinho",
    description: "As compras rápidas que salvam o dia.",
  },
  {
    icon: "🍽",
    title: "Comida",
    description: "Para quando bate aquela fome.",
  },
  {
    icon: "🍺",
    title: "Chope",
    description: "Porque o final do dia merece.",
  },
  {
    icon: "🔥",
    title: "Churrasquinho",
    description: "Comida simples, direta e com cara de boteco.",
  },
] as const;

export const dayPhases = {
  morning: {
    title: "De manhã...",
    items: ["🥖 Padaria na hora", "🛒 Mercadinho", "☕ Café da manhã completo"],
  },
  evening: {
    title: "No fim do dia...",
    items: ["🍺 Chope", "🔥 Churrasquinho", "⚽ Futebol", "🎶 Música", "🍽 Comida"],
  },
} as const;

export const openingHoursNote =
  "Horário de sexta e sábado pode variar conforme a programação de eventos.";

export const openingHours = [
  { day: "Segunda", hours: "08:00 às 20:30" },
  { day: "Terça", hours: "08:00 às 20:30" },
  { day: "Quarta", hours: "08:00 às 20:30" },
  { day: "Quinta", hours: "08:00 às 20:30" },
  { day: "Sexta", hours: "08:00 às 20:30*" },
  { day: "Sábado", hours: "08:00 às 20:30*" },
  { day: "Domingo", hours: "Fechado" },
] as const;

/** @deprecated use openingHours */
export const hoursPlaceholder = openingHours;

export const reviewThemes = [
  "Padaria",
  "Mercadinho",
  "Boteco",
  "Música ao vivo",
  "Churrasquinho",
  "Chope",
  "Compras rápidas",
  "Happy hour",
] as const;
