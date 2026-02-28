import { memo } from "react";
import type { GaugeData } from "../lib/types";

export const GaugeComponent = memo(function GaugeComponent({ data }: { data: GaugeData }) {
  const pct    = data.max > 0 ? Math.min(1, Math.max(0, data.current / data.max)) : 0;
  const pctInt = Math.round(pct * 100);

  const barColor =
    pct > 0.8 ? "bg-red-500"
    : pct > 0.6 ? "bg-amber-500"
    : "bg-violet-500";

  const pctColor =
    pct > 0.8 ? "text-red-400" : pct > 0.6 ? "text-amber-400" : "text-violet-400";

  return (
    <div className="px-5 py-4 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest">
          {data.label}
        </span>
        <span className={`text-sm font-black tabular-nums ${pctColor}`}>
          {pctInt}%
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
        <div
          className={`h-full rounded-full ${barColor} transition-all duration-700 ease-out`}
          style={{ width: `${pct * 100}%` }}
        />
      </div>
      <div className="flex items-center justify-between text-[10px] font-mono tabular-nums">
        <span className="text-zinc-500">
          {data.current.toLocaleString()}{data.unit ? ` ${data.unit}` : ""}
        </span>
        <span className="text-zinc-700">
          {data.max.toLocaleString()}{data.unit ? ` ${data.unit}` : ""} max
        </span>
      </div>
    </div>
  );
});
