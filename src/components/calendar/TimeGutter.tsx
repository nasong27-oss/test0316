import { generateTimeSlots } from '@/lib/dateUtils';
import { SLOT_HEIGHT } from '@/lib/constants';

export function TimeGutter() {
  const slots = generateTimeSlots();
  return (
    <div className="sticky left-0 z-10 bg-white border-r">
      {slots.map((slot) => (
        <div
          key={slot}
          className="flex items-start justify-end pr-2 text-xs text-gray-400 border-b border-gray-100"
          style={{ height: SLOT_HEIGHT }}
        >
          <span className="-mt-2">{slot}</span>
        </div>
      ))}
    </div>
  );
}
