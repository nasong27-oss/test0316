'use client';

import { useState, useEffect, useCallback } from 'react';
import { Booking, RoomId } from '@/types/booking';
import { loadBookings, saveBookings } from '@/lib/storage';
import { hasOverlap } from '@/lib/dateUtils';

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    setBookings(loadBookings());
  }, []);

  useEffect(() => {
    saveBookings(bookings);
  }, [bookings]);

  const createBooking = useCallback((data: Omit<Booking, 'id' | 'createdAt'>): string | null => {
    if (hasOverlap(bookings, data)) return '해당 시간에 이미 예약이 있습니다.';
    const newBooking: Booking = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setBookings(prev => [...prev, newBooking]);
    return null;
  }, [bookings]);

  const updateBooking = useCallback((id: string, data: Omit<Booking, 'id' | 'createdAt'>): string | null => {
    if (hasOverlap(bookings, data, id)) return '해당 시간에 이미 예약이 있습니다.';
    setBookings(prev =>
      prev.map(b => b.id === id ? { ...b, ...data } : b),
    );
    return null;
  }, [bookings]);

  const deleteBooking = useCallback((id: string) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  }, []);

  const getBookingsForDay = useCallback((date: string, roomId: RoomId): Booking[] => {
    return bookings.filter(b => b.date === date && b.roomId === roomId);
  }, [bookings]);

  return { bookings, createBooking, updateBooking, deleteBooking, getBookingsForDay };
}
