import { memo } from "react";
import type { StatData } from "../lib/types";
import { TrendingUp, TrendingDown } from "lucide-react";

export const StatComponent = memo(function StatComponent({ data }: { data: StatData }) {
  const hasTrend = data.trend !== undefined && data.trend !== null;
  const isUp     = hasTrend && (data.trend as number) > 0;
  const isDown   = hasTrend && (data.trend as number) < 0;
  const trendAbs = hasTrend ? Math.abs(data.trend as number) : 0;
  const trendCls = isUp ? "text-emerald-400" : isDown ? "text-red-400" : "text-zinc-600";

  return (
    <div className="px-5 py-4">
      <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-1.5">
        {data.label}
      </p>
      <div className="flex items-baseline gap-2 flex-wrap">
        <span className="text-3xl font-black text-zinc-100 tabular-nums leading-none tracking-tight">
          {data.value}
        </span>
        {data.unit && (
          <span className="text-sm text-zinc-500 font-medium">{data.unit}</span>
        )}
        {hasTrend && (
          <span className={`flex items-center gap-0.5 text-xs font-semibold tabular-nums ${trendCls}`}>
            {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : isDown ? <TrendingDown className="w-3.5 h-3.5" /> : null}
            {trendAbs !== 0 && (
              <span>
                {isUp ? "+" : isDown ? "\u2212" : ""}
                {trendAbs.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </span>
            )}
          </span>
        )}
      </div>
      {data.description && (
        <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed">{data.description}</p>
      )}
    </div>
  );
});
