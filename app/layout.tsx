import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { CONTACT, PROFILES } from "@/lib/data";

// Définis NEXT_PUBLIC_SITE_URL dans Vercel (ex. https://ton-domaine.vercel.app)
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arnold-edwin.vercel.app";
const TITLE = "Arnold Edwin FOMEDONG : Administrateur Systèmes, Réseaux & Cybersécurité";
const DESC =
  "Jeune diplômé en ingénierie systèmes, réseaux et cybersécurité, à la recherche d'un poste d'administrateur systèmes et réseaux sécurisés en Île-de-France. Projets, expériences et certifications vérifiables.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s | Arnold Edwin FOMEDONG" },
  description: DESC,
  keywords: ["administrateur systèmes et réseaux", "Active Directory", "Windows Server", "Linux", "Proxmox", "VMware", "cybersécurité", "durcissement", "Île-de-France"],
  authors: [{ name: "Arnold Edwin FOMEDONG" }],
  alternates: { canonical: "/" },
  openGraph: { title: TITLE, description: DESC, url: SITE_URL, siteName: "Hackthus", locale: "fr_FR", type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#000000", colorScheme: "dark" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Arnold Edwin FOMEDONG",
  jobTitle: "Administrateur Systèmes, Réseaux & Cybersécurité",
  knowsAbout: ["Active Directory", "Windows Server", "Linux", "Réseaux", "Cybersécurité", "Proxmox", "VMware ESXi"],
  url: SITE_URL,
  email: CONTACT.email,
  sameAs: PROFILES.filter((p) => p.url).map((p) => p.url),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="bg-black antialiased">
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
