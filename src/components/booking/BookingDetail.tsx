import { useState } from 'react';
import { Booking } from '@/types/booking';
import { ROOMS } from '@/lib/constants';
import { Button } from '@/components/ui/Button';

interface BookingDetailProps {
  booking: Booking;
  onEdit: () => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export function BookingDetail({ booking, onEdit, onDelete, onClose }: BookingDetailProps) {
  const [confirming, setConfirming] = useState(false);
  const roomLabel = ROOMS.find(r => r.id === booking.roomId)?.label ?? booking.roomId;

  const handleDelete = () => {
    onDelete(booking.id);
    onClose();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-3">
        <Row label="회의제목" value={booking.title} highlight />
        <Row label="예약자명" value={booking.bookerName} />
        <Row label="회의실" value={roomLabel} />
        <Row label="날짜" value={booking.date} />
        <Row label="시간" value={`${booking.startTime} – ${booking.endTime}`} />
        {booking.attendees && <Row label="참석자" value={booking.attendees} />}
        {booking.details && <Row label="회의 상세" value={booking.details} multiline />}
      </div>

      <div className="flex justify-between pt-2 border-t">
        {confirming ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-red-600">정말 삭제하시겠습니까?</span>
            <Button variant="danger" size="sm" onClick={handleDelete}>삭제</Button>
            <Button variant="ghost" size="sm" onClick={() => setConfirming(false)}>취소</Button>
          </div>
        ) : (
          <Button variant="danger" size="sm" onClick={() => setConfirming(true)}>삭제</Button>
        )}
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={onClose}>닫기</Button>
          <Button variant="primary" size="sm" onClick={onEdit}>수정</Button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, highlight, multiline }: { label: string; value: string; highlight?: boolean; multiline?: boolean }) {
  return (
    <div className="flex gap-3">
      <span className="text-sm text-gray-500 w-20 shrink-0">{label}</span>
      <span className={`text-sm ${highlight ? 'font-semibold text-gray-900' : 'text-gray-700'} ${multiline ? 'whitespace-pre-wrap' : ''}`}>
        {value}
      </span>
    </div>
  );
}
