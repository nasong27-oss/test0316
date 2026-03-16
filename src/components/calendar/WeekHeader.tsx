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
    <div className="flex items-center justify-between px-4 py-3 border-b bg-olive-800 sticky top-0 z-20">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onPrev} className="text-white hover:bg-olive-700">‹ 이전 주</Button>
        <Button variant="ghost" size="sm" onClick={onToday} disabled={offset === 0} className="text-white hover:bg-olive-700 disabled:text-white/40">
          이번 주
        </Button>
        <Button variant="ghost" size="sm" onClick={onNext} className="text-white hover:bg-olive-700">다음 주 ›</Button>
      </div>
      <h2 className="text-base font-semibold text-white">{weekLabel}</h2>
      <div className="w-32" />
    </div>
  );
}
