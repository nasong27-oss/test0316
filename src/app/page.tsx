'use client';

import dynamic from 'next/dynamic';

const WeeklyCalendar = dynamic(
  () => import('@/components/calendar/WeeklyCalendar').then(m => m.WeeklyCalendar),
  { ssr: false },
);

export default function Home() {
  return <WeeklyCalendar />;
}
