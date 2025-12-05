import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MegaTech Trackers - Dashboard',
  description: 'MegaTech Trackers - Grafana Dashboard Viewer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

