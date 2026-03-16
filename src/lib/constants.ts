import { Room } from '@/types/booking';

export const ROOMS: Room[] = [
  { id: 'lab5', label: '랩5' },
  { id: 'lab6', label: '랩6' },
];

export const TIME_START = 9;       // 09:00
export const TIME_END = 22;        // 22:00 (마지막 슬롯 시작: 21:30)
export const SLOT_MINUTES = 30;
export const STORAGE_KEY = 'meeting_room_bookings';
export const STORE_VERSION = 1;
export const SLOT_HEIGHT = 48;     // px per 30-min slot

export const ROOM_COLORS: Record<string, { bg: string; border: string; text: string; hover: string }> = {
  lab5: { bg: 'bg-blue-100', border: 'border-blue-400', text: 'text-blue-900', hover: 'hover:bg-blue-50' },
  lab6: { bg: 'bg-emerald-100', border: 'border-emerald-400', text: 'text-emerald-900', hover: 'hover:bg-emerald-50' },
};
