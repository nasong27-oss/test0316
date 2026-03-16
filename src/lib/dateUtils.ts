import {
  startOfWeek, addDays, format, addWeeks,
  isToday,
} from 'date-fns';
import { ko } from 'date-fns/locale';
import { Booking, RoomId } from '@/types/booking';
import { TIME_START, TIME_END, SLOT_MINUTES } from './constants';

// ── Week ─────────────────────────────────────────────────────────────────────

export function getWeekDays(offset: number): Date[] {
  const now = new Date();
  const monday = startOfWeek(addWeeks(now, offset), { weekStartsOn: 1 });
  return Array.from({ length: 7 }, (_, i) => addDays(monday, i));
}

export function formatDate(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

export function formatDayLabel(date: Date): string {
  const dayNames = ['월', '화', '수', '목', '금', '토', '일'];
  const dow = (date.getDay() + 6) % 7; // Mon=0
  return `${format(date, 'M/d')} (${dayNames[dow]})`;
}

export function formatWeekRange(days: Date[]): string {
  const start = days[0];
  const end = days[6];
  return `${format(start, 'yyyy년 M월 d일')} – ${format(end, 'M월 d일', { locale: ko })}`;
}

export function isDateToday(date: Date): boolean {
  return isToday(date);
}

// ── Slots ─────────────────────────────────────────────────────────────────────

export function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let h = TIME_START; h < TIME_END; h++) {
    slots.push(`${String(h).padStart(2, '0')}:00`);
    slots.push(`${String(h).padStart(2, '0')}:30`);
  }
  return slots;
}

export function generateEndTimeOptions(startTime: string): string[] {
  const slots = generateTimeSlots();
  const idx = slots.indexOf(startTime);
  if (idx === -1) return [];
  return slots.slice(idx + 1);
}

export function timeToMinutes(t: string): number {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

export function minutesToTime(m: number): string {
  const h = Math.floor(m / 60);
  const min = m % 60;
  return `${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
}

export function slotRowIndex(time: string): number {
  const timeMin = timeToMinutes(time);
  const startMin = TIME_START * 60;
  return Math.round((timeMin - startMin) / SLOT_MINUTES);
}

export function bookingRowSpan(startTime: string, endTime: string): number {
  return Math.round((timeToMinutes(endTime) - timeToMinutes(startTime)) / SLOT_MINUTES);
}

// ── Overlap ───────────────────────────────────────────────────────────────────

export function hasOverlap(
  bookings: Booking[],
  candidate: { roomId: RoomId; date: string; startTime: string; endTime: string },
  excludeId?: string,
): boolean {
  return bookings
    .filter(b => b.roomId === candidate.roomId && b.date === candidate.date && b.id !== excludeId)
    .some(b =>
      timeToMinutes(candidate.startTime) < timeToMinutes(b.endTime) &&
      timeToMinutes(candidate.endTime) > timeToMinutes(b.startTime),
    );
}
