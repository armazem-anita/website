export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  day: string;
  time: string;
  image: string;
  type: "futebol" | "musica" | "happy-hour" | "especial" | "promocao";
  isToday?: boolean;
  isPlaceholder?: boolean;
}

export const events: Event[] = [
  {
    id: "grenal",
    title: "Transmissão do Grenal",
    description: "Futebol, chope e aquele clima de boteco.",
    date: "",
    day: "",
    time: "",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
    type: "futebol",
  },
  {
    id: "musica-ao-vivo",
    title: "Música ao vivo",
    description: "Noite com música e aquele clima de armazém de bairro.",
    date: "",
    day: "",
    time: "",
    image: "/images/musica-ao-vivo.jpg",
    type: "musica",
  },
  {
    id: "happy-hour",
    title: "Happy Hour",
    description: "Chope gelado, petiscos e encontro entre amigos.",
    date: "",
    day: "",
    time: "",
    image: "/images/instagram/ig-07-Dcgx5i4OChQ.jpg",
    type: "happy-hour",
  },
];

export const todayHighlight: Event = {
  id: "hoje-grenal",
  title: "Transmissão do Grenal",
  description: "Futebol, chope e aquele clima de boteco no Anita.",
  date: "Hoje",
  day: "HOJE",
  time: "",
  image:
    "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
  type: "futebol",
  isToday: true,
};
