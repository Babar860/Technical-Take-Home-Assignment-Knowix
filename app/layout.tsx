import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Content Review Queue',
  description: 'Editorial workflow dashboard for reviewing content submissions',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
