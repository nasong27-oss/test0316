'use client';

import { useEffect } from 'react';
import { Booking, SlotSelection, ModalMode } from '@/types/booking';
import { BookingForm } from './BookingForm';
import { BookingDetail } from './BookingDetail';
import { ROOMS } from '@/lib/constants';

interface BookingModalProps {
  mode: ModalMode;
  slot: SlotSelection | null;
  booking: Booking | null;
  onClose: () => void;
  onSwitchEdit: () => void;
  onCreate: (data: Omit<Booking, 'id' | 'createdAt'>) => string | null;
  onUpdate: (id: string, data: Omit<Booking, 'id' | 'createdAt'>) => string | null;
  onDelete: (id: string) => void;
}

export function BookingModal({
  mode, slot, booking, onClose, onSwitchEdit, onCreate, onUpdate, onDelete,
}: BookingModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const title = mode === 'create' ? '새 예약'
    : mode === 'edit' ? '예약 수정'
    : '예약 상세';

  const roomLabel = booking
    ? ROOMS.find(r => r.id === booking.roomId)?.label
    : slot
    ? ROOMS.find(r => r.id === slot.roomId)?.label
    : '';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
          <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            {roomLabel && (
              <p className="text-xs text-gray-500 mt-0.5">{roomLabel}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {mode === 'view' && booking ? (
            <BookingDetail
              booking={booking}
              onEdit={onSwitchEdit}
              onDelete={onDelete}
              onClose={onClose}
            />
          ) : (
            <BookingForm
              mode={mode === 'edit' ? 'edit' : 'create'}
              slot={slot}
              booking={booking}
              onCreate={onCreate}
              onUpdate={onUpdate}
              onClose={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}
