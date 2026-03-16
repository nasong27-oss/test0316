export type RoomId = 'lab5' | 'lab6';

export interface Room {
  id: RoomId;
  label: string;
}

export interface Booking {
  id: string;
  roomId: RoomId;
  date: string;       // "YYYY-MM-DD"
  startTime: string;  // "HH:MM"
  endTime: string;    // "HH:MM"
  bookerName: string; // 예약자명 (필수)
  title: string;      // 회의제목 (필수)
  attendees?: string; // 참석자 (선택)
  details?: string;   // 회의 상세 (선택)
  createdAt: string;
}

export interface SlotSelection {
  roomId: RoomId;
  date: string;
  startTime: string;
}

export type ModalMode = 'create' | 'edit' | 'view';

export interface BookingStore {
  version: number;
  bookings: Booking[];
}
