import { memo } from "react";
import type { ProgressBarData } from "../lib/types";

const BAR_COLOR = (pct: number) =>
  pct >= 90
    ? "from-red-600 to-red-500"
    : pct >= 70
      ? "from-amber-600 to-amber-400"
      : pct >= 50
        ? "from-yellow-600 to-yellow-400"
        : "from-emerald-600 to-emerald-400";

export const ProgressBar = memo(function ProgressBar({
  data,
}: {
  data: ProgressBarData;
}) {
  const pct = Math.min(100, Math.max(0, (data.current / data.max) * 100));

  return (
    <div className="px-5 py-3 space-y-2">
      <div className="flex justify-between items-center gap-4">
        <span className="text-zinc-300 text-sm font-medium">{data.label}</span>
        <span className="text-zinc-500 text-xs font-mono tabular-nums shrink-0">
          {data.current.toFixed(1)}{" "}
          <span className="text-zinc-700">/</span>{" "}
          {data.max.toFixed(1)}{" "}
          <span className="text-zinc-600 ml-1">({pct.toFixed(1)}%)</span>
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-zinc-800/80 overflow-hidden">
        <div
          className={`h-full rounded-full bg-linear-to-r transition-all duration-500 ${BAR_COLOR(pct)}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
});
