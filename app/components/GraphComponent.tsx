import type { GraphData } from "../lib/types";

export function GraphComponent({ data }: { data: GraphData }) {
  const entries = Object.entries(data.dataPoints);
  const max = Math.max(...entries.map(([, v]) => v), 1);

  return (
    <div className="px-3 py-2 space-y-2">
      {data.title && (
        <p className="text-zinc-400 text-xs font-medium uppercase tracking-wider">
          {data.title}
        </p>
      )}
      <div className="space-y-1.5">
        {entries.map(([label, value]) => {
          const pct = (value / max) * 100;
          return (
            <div key={label} className="flex items-center gap-3">
              <span className="text-zinc-400 text-xs font-mono w-32 shrink-0 truncate text-right">
                {label}
              </span>
              <div className="flex-1 flex items-center gap-2">
                <div className="flex-1 h-4 bg-zinc-800 rounded-sm overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-sm"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-zinc-300 text-xs font-mono tabular-nums w-16 text-right">
                  {Number.isInteger(value) ? value : value.toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
