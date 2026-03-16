'use client';

import { useState, useMemo } from 'react';
import { getWeekDays, formatWeekRange } from '@/lib/dateUtils';

export function useWeekNavigation() {
  const [offset, setOffset] = useState(0);

  const weekDays = useMemo(() => getWeekDays(offset), [offset]);
  const weekLabel = useMemo(() => formatWeekRange(weekDays), [weekDays]);

  return {
    weekDays,
    weekLabel,
    offset,
    goPrev: () => setOffset(o => o - 1),
    goNext: () => setOffset(o => o + 1),
    goToday: () => setOffset(0),
  };
}
