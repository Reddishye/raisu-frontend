import { memo } from "react";
import type { GraphData } from "../lib/types";

export const GraphComponent = memo(function GraphComponent({
  data,
}: {
  data: GraphData;
}) {
  const entries = Object.entries(data.dataPoints);
  const max = Math.max(...entries.map(([, v]) => v), 1);

  return (
    <div className="px-5 py-3 space-y-3">
      {data.title && (
        <p className="text-zinc-500 text-[10px] font-semibold uppercase tracking-widest">
          {data.title}
        </p>
      )}
      <div className="space-y-2">
        {entries.map(([label, value]) => {
          const pct = (value / max) * 100;
          return (
            <div key={label} className="flex items-center gap-3 group">
              <span className="text-zinc-500 text-xs font-mono w-28 shrink-0 truncate text-right group-hover:text-zinc-400 transition-colors">
                {label}
              </span>
              <div className="flex-1 flex items-center gap-2.5">
                <div className="flex-1 h-2 bg-zinc-800/80 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-violet-600 to-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-zinc-400 text-xs font-mono tabular-nums w-14 text-right shrink-0">
                  {Number.isInteger(value) ? value : value.toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
