import { Booking, RoomId, SlotSelection } from '@/types/booking';
import { generateTimeSlots, bookingRowSpan, formatDate } from '@/lib/dateUtils';
import { SLOT_HEIGHT, ROOM_COLORS } from '@/lib/constants';
import { clsx } from 'clsx';

interface DayColumnProps {
  date: Date;
  roomId: RoomId;
  bookings: Booking[];
  onSlotClick: (selection: SlotSelection) => void;
  onBookingClick: (booking: Booking) => void;
}

export function DayColumn({ date, roomId, bookings, onSlotClick, onBookingClick }: DayColumnProps) {
  const slots = generateTimeSlots();
  const dateStr = formatDate(date);
  const colors = ROOM_COLORS[roomId];

  // Build a set of slot times that are covered by a booking (not the start)
  const coveredSlots = new Set<string>();
  const bookingStarts = new Map<string, Booking>();

  for (const b of bookings) {
    const startIdx = slots.indexOf(b.startTime);
    const span = bookingRowSpan(b.startTime, b.endTime);
    bookingStarts.set(b.startTime, b);
    for (let i = 1; i < span; i++) {
      if (slots[startIdx + i]) coveredSlots.add(slots[startIdx + i]);
    }
  }

  return (
    <div className="relative border-r border-gray-200 min-w-0">
      {slots.map((slot) => {
        if (coveredSlots.has(slot)) {
          return <div key={slot} style={{ height: SLOT_HEIGHT }} className="border-b border-gray-100" />;
        }

        const booking = bookingStarts.get(slot);
        const span = booking ? bookingRowSpan(booking.startTime, booking.endTime) : 1;
        const blockHeight = span * SLOT_HEIGHT;

        if (booking) {
          return (
            <div
              key={slot}
              style={{ height: blockHeight }}
              className={clsx(
                'relative border-b border-gray-100 cursor-pointer z-[1]',
              )}
              onClick={() => onBookingClick(booking)}
            >
              <div
                className={clsx(
                  'absolute inset-0.5 rounded-md border-l-4 px-1.5 py-1 overflow-hidden',
                  colors.bg, colors.border, colors.text,
                )}
              >
                <p className="text-xs font-semibold leading-tight truncate">{booking.title}</p>
                <p className="text-xs opacity-70 truncate">{booking.bookerName}</p>
                <p className="text-xs opacity-60">{booking.startTime}–{booking.endTime}</p>
              </div>
            </div>
          );
        }

        return (
          <div
            key={slot}
            style={{ height: SLOT_HEIGHT }}
            className={clsx(
              'border-b border-gray-100 cursor-pointer group',
              colors.hover,
            )}
            onClick={() => onSlotClick({ roomId, date: dateStr, startTime: slot })}
          >
            <div className="h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-gray-400 text-xs">+</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
