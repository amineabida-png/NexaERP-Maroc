import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NexaERP Maroc',
  description: 'ERP SaaS marocain multi-tenant'
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
