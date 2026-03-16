import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '회의실 예약',
  description: '랩5, 랩6 회의실 예약 시스템',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
