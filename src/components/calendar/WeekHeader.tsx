import { Button } from '@/components/ui/Button';

interface WeekHeaderProps {
  weekLabel: string;
  offset: number;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

export function WeekHeader({ weekLabel, offset, onPrev, onNext, onToday }: WeekHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b bg-white sticky top-0 z-20">
      <div className="flex items-center gap-2">
        <Button variant="secondary" size="sm" onClick={onPrev}>‹ 이전 주</Button>
        <Button variant="secondary" size="sm" onClick={onToday} disabled={offset === 0}>
          이번 주
        </Button>
        <Button variant="secondary" size="sm" onClick={onNext}>다음 주 ›</Button>
      </div>
      <h2 className="text-base font-semibold text-gray-800">{weekLabel}</h2>
      <div className="w-32" />
    </div>
  );
}
