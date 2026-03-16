import { Booking, BookingStore } from '@/types/booking';
import { STORAGE_KEY, STORE_VERSION } from './constants';

export function loadBookings(): Booking[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const store: BookingStore = JSON.parse(raw);
    if (store.version !== STORE_VERSION) return [];
    return store.bookings ?? [];
  } catch {
    return [];
  }
}

export function saveBookings(bookings: Booking[]): void {
  if (typeof window === 'undefined') return;
  const store: BookingStore = { version: STORE_VERSION, bookings };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}
