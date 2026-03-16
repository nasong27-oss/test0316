'use client';

import { useState } from 'react';
import { Booking, SlotSelection, ModalMode } from '@/types/booking';
import { useWeekNavigation } from '@/hooks/useWeekNavigation';
import { useBookings } from '@/hooks/useBookings';
import { ROOMS } from '@/lib/constants';
import { formatDate, formatDayLabel, isDateToday } from '@/lib/dateUtils';
import { WeekHeader } from './WeekHeader';
import { TimeGutter } from './TimeGutter';
import { DayColumn } from './DayColumn';
import { BookingModal } from '@/components/booking/BookingModal';
import { clsx } from 'clsx';

interface ModalState {
  open: boolean;
  mode: ModalMode;
  slot: SlotSelection | null;
  booking: Booking | null;
}

export function WeeklyCalendar() {
  const { weekDays, weekLabel, offset, goPrev, goNext, goToday } = useWeekNavigation();
  const { createBooking, updateBooking, deleteBooking, getBookingsForDay } = useBookings();
  const [modal, setModal] = useState<ModalState>({ open: false, mode: 'create', slot: null, booking: null });

  const openCreate = (slot: SlotSelection) =>
    setModal({ open: true, mode: 'create', slot, booking: null });

  const openView = (booking: Booking) =>
    setModal({ open: true, mode: 'view', slot: null, booking });

  const closeModal = () =>
    setModal(m => ({ ...m, open: false }));

  const switchToEdit = () =>
    setModal(m => ({ ...m, mode: 'edit' }));

  return (
    <div className="flex flex-col h-screen bg-olive-50">
      <WeekHeader weekLabel={weekLabel} offset={offset} onPrev={goPrev} onNext={goNext} onToday={goToday} />

      {/* Grid header: day + room names */}
      <div className="sticky top-[57px] z-10 bg-white border-b shadow-sm">
        <div className="flex">
          {/* Time gutter spacer */}
          <div className="w-16 shrink-0 border-r" />
          {/* Day columns */}
          {weekDays.map(day => {
            const today = isDateToday(day);
            return (
              <div key={day.toISOString()} className="flex-1 min-w-0 border-r">
                <div className={clsx(
                  'text-center text-xs font-semibold py-1 border-b',
                  today ? 'text-olive-800 bg-olive-100' : 'text-gray-600',
                )}>
                  {formatDayLabel(day)}
                </div>
                <div className="flex">
                  {ROOMS.map(room => (
                    <div key={room.id} className={clsx(
                      'flex-1 text-center text-xs py-1 font-medium border-r last:border-r-0',
                      today ? 'bg-olive-100' : 'bg-olive-50',
                      room.id === 'lab5' ? 'text-olive-800' : 'text-warm-700',
                    )}>
                      {room.label}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scrollable calendar body */}
      <div className="flex-1 overflow-auto">
        <div className="flex">
          {/* Time gutter */}
          <div className="w-16 shrink-0">
            <TimeGutter />
          </div>
          {/* Day + room columns */}
          {weekDays.map(day => {
            const dateStr = formatDate(day);
            return (
              <div key={day.toISOString()} className="flex-1 min-w-0 flex border-r">
                {ROOMS.map(room => (
                  <div key={room.id} className="flex-1 min-w-0 border-r last:border-r-0">
                    <DayColumn
                      date={day}
                      roomId={room.id}
                      bookings={getBookingsForDay(dateStr, room.id)}
                      onSlotClick={openCreate}
                      onBookingClick={openView}
                    />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {modal.open && (
        <BookingModal
          mode={modal.mode}
          slot={modal.slot}
          booking={modal.booking}
          onClose={closeModal}
          onSwitchEdit={switchToEdit}
          onCreate={createBooking}
          onUpdate={updateBooking}
          onDelete={deleteBooking}
        />
      )}
    </div>
  );
}
