import { useState } from 'react';
import { Booking, RoomId, SlotSelection } from '@/types/booking';
import { ROOMS } from '@/lib/constants';
import { generateEndTimeOptions } from '@/lib/dateUtils';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';

interface BookingFormProps {
  mode: 'create' | 'edit';
  slot?: SlotSelection | null;
  booking?: Booking | null;
  onCreate: (data: Omit<Booking, 'id' | 'createdAt'>) => string | null;
  onUpdate: (id: string, data: Omit<Booking, 'id' | 'createdAt'>) => string | null;
  onClose: () => void;
}

export function BookingForm({ mode, slot, booking, onCreate, onUpdate, onClose }: BookingFormProps) {
  const roomId: RoomId = booking?.roomId ?? slot?.roomId ?? 'lab5';
  const date = booking?.date ?? slot?.date ?? '';
  const startTime = booking?.startTime ?? slot?.startTime ?? '';
  const endTimeOptions = generateEndTimeOptions(startTime);

  const [bookerName, setBookerName] = useState(booking?.bookerName ?? '');
  const [title, setTitle] = useState(booking?.title ?? '');
  const [endTime, setEndTime] = useState(booking?.endTime ?? endTimeOptions[0] ?? '');
  const [attendees, setAttendees] = useState(booking?.attendees ?? '');
  const [details, setDetails] = useState(booking?.details ?? '');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [overlapError, setOverlapError] = useState('');

  const roomLabel = ROOMS.find(r => r.id === roomId)?.label ?? roomId;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!bookerName.trim()) e.bookerName = '예약자명을 입력해주세요.';
    if (!title.trim()) e.title = '회의제목을 입력해주세요.';
    if (!endTime) e.endTime = '종료시간을 선택해주세요.';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    const data: Omit<Booking, 'id' | 'createdAt'> = {
      roomId, date, startTime, endTime,
      bookerName: bookerName.trim(),
      title: title.trim(),
      attendees: attendees.trim() || undefined,
      details: details.trim() || undefined,
    };

    const err = mode === 'create'
      ? onCreate(data)
      : onUpdate(booking!.id, data);

    if (err) { setOverlapError(err); return; }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Read-only info */}
      <div className="flex gap-4 text-sm bg-gray-50 rounded-md px-3 py-2">
        <span className="text-gray-500">회의실</span>
        <span className="font-medium text-gray-800">{roomLabel}</span>
        <span className="text-gray-500 ml-4">날짜</span>
        <span className="font-medium text-gray-800">{date}</span>
        <span className="text-gray-500 ml-4">시작</span>
        <span className="font-medium text-gray-800">{startTime}</span>
      </div>

      {/* End time */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          종료시간<span className="text-red-500 ml-0.5">*</span>
        </label>
        <select
          value={endTime}
          onChange={e => setEndTime(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {endTimeOptions.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        {errors.endTime && <p className="text-xs text-red-500">{errors.endTime}</p>}
      </div>

      <Input
        label="예약자명"
        required
        value={bookerName}
        onChange={e => setBookerName(e.target.value)}
        placeholder="예) 홍길동"
        error={errors.bookerName}
      />

      <Input
        label="회의제목"
        required
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="예) 주간 팀 미팅"
        error={errors.title}
      />

      <Input
        label="참석자"
        value={attendees}
        onChange={e => setAttendees(e.target.value)}
        placeholder="예) 홍길동, 김철수 (선택)"
      />

      <Textarea
        label="회의 상세"
        value={details}
        onChange={e => setDetails(e.target.value)}
        placeholder="회의 내용이나 메모를 입력하세요 (선택)"
      />

      {overlapError && (
        <p className="text-sm text-red-600 bg-red-50 rounded-md px-3 py-2">{overlapError}</p>
      )}

      <div className="flex justify-end gap-2 pt-2 border-t">
        <Button type="button" variant="secondary" onClick={onClose}>취소</Button>
        <Button type="submit" variant="primary">
          {mode === 'create' ? '예약하기' : '수정하기'}
        </Button>
      </div>
    </form>
  );
}
