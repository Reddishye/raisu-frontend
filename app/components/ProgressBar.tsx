import type { ProgressBarData } from "../lib/types";

export function ProgressBar({ data }: { data: ProgressBarData }) {
  const pct = Math.min(100, Math.max(0, (data.current / data.max) * 100));

  const color =
    pct >= 90
      ? "bg-red-500"
      : pct >= 70
        ? "bg-amber-500"
        : pct >= 50
          ? "bg-yellow-500"
          : "bg-emerald-500";

  return (
    <div className="px-3 py-2 space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-zinc-300 text-sm">{data.label}</span>
        <span className="text-zinc-400 text-xs font-mono tabular-nums">
          {data.current.toFixed(1)} / {data.max.toFixed(1)}{" "}
          <span className="text-zinc-600">({pct.toFixed(1)}%)</span>
        </span>
      </div>
      <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
