import type { Metadata } from "next";
import "./globals.css";

// Troque pelo endereço real que a Vercel gerar (ou pelo seu domínio próprio)
const siteUrl = "https://aow-melhorado.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AOW Jiu-Jitsu | Treine com propósito",
  description:
    "Disciplina, técnica e comunidade em cada faixa. Encontre o polo mais perto de você.",
  openGraph: {
    title: "AOW Jiu-Jitsu | Treine com propósito",
    description: "Treine com propósito. Evolua com a gente.",
    url: "/",
    siteName: "AOW Jiu-Jitsu",
    type: "website",
    locale: "pt_BR",
    images: [
      { url: "/og.jpg", width: 1200, height: 630, alt: "AOW Jiu-Jitsu" },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
