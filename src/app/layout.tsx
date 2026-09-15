import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import { business } from "@/data/business";
import { images } from "@/data/images";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Armazém Anita | Do café ao happy hour — Jardim Botânico, Porto Alegre",
  description:
    "Armazém Anita no Jardim Botânico: padaria, mercadinho, comida, churrasquinho, chope e happy hour. Cardápio, eventos, horários e como chegar.",
  keywords: [
    "Armazém Anita",
    "Armazém Anita Porto Alegre",
    "Armazém Anita Jardim Botânico",
    "Mercado Jardim Botânico Porto Alegre",
    "Padaria Jardim Botânico",
    "Boteco Jardim Botânico",
    "Happy Hour Jardim Botânico",
    "Chopp Jardim Botânico",
    "Bar Jardim Botânico Porto Alegre",
    "Churrasquinho Jardim Botânico",
    "Mercado de bairro Porto Alegre",
  ],
  openGraph: {
    title: "Armazém Anita — Do café ao happy hour",
    description: business.description,
    type: "website",
    locale: "pt_BR",
    siteName: business.name,
    images: [{ url: images.fachada, width: 1200, height: 630, alt: "Fachada do Armazém Anita" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Armazém Anita — Do café ao happy hour",
    description: business.description,
  },
  robots: { index: true, follow: true },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Restaurant", "Bakery", "BarOrPub"],
  name: business.name,
  description: business.description,
  image: [images.fachada, images.logo],
  telephone: business.phone,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address.street,
    addressLocality: business.address.city,
    addressRegion: business.address.state,
    postalCode: business.address.zip,
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: business.coordinates.lat,
    longitude: business.coordinates.lng,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: business.googleRating,
    reviewCount: business.googleReviews,
    bestRating: 5,
  },
  servesCuisine: ["Brasileira", "Padaria", "Boteco"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${bebas.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>
      <body className="font-body antialiased">
        {children}
        <div className="h-20 md:hidden" aria-hidden="true" />
      </body>
    </html>
  );
}
