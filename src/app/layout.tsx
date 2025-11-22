import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RH Manager - Plataforma de Gestão de Pessoas",
  description: "Sistema completo de gestão de RH com avaliação de desempenho",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-slate-50">
        {children}
      </body>
    </html>
  );
}
