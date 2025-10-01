import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dashboard de Métricas | Orasis',
  description: 'Painel administrativo para visualização de métricas de usuários da plataforma',
  keywords: 'dashboard, métricas, usuários, administração, analytics',
  authors: [{ name: 'Orasis Tech Team' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="theme-color" content="#0ea5e9" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <main role="main" id="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}