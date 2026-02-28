import { memo } from "react";
import type { SparklineData } from "../lib/types";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export const SparklineComponent = memo(function SparklineComponent({ data }: { data: SparklineData }) {
  const values = data.values ?? [];
  if (!values.length) return null;

  const min    = Math.min(...values);
  const max    = Math.max(...values);
  const range  = max - min || 1;
  const H      = 48;
  const W      = 160;
  const padX   = 2;
  const padY   = 4;
  const innerW = W - padX * 2;
  const innerH = H - padY * 2;

  const pts = values.map((v, i) => {
    const x = padX + (i / Math.max(values.length - 1, 1)) * innerW;
    const y = padY + innerH - ((v - min) / range) * innerH;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  });
  const polyline = pts.join(" ");

  const lastVal  = values[values.length - 1];
  const firstVal = values[0];
  const diff     = lastVal - firstVal;
  const isFlat   = diff === 0;
  const TrendIcon = diff > 0 ? TrendingUp : diff < 0 ? TrendingDown : Minus;
  const trendCls  = diff > 0 ? "text-emerald-400" : diff < 0 ? "text-red-400" : "text-zinc-600";
  const valCls    = diff > 0 ? "text-emerald-300" : diff < 0 ? "text-red-300"  : "text-zinc-100";
  const lineColor = diff > 0 ? "#34d399" : diff < 0 ? "#f87171" : "#8b5cf6";

  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4">
      <div className="min-w-0">
        <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-1.5">
          {data.label}
        </p>
        <div className="flex items-baseline gap-1.5">
          <span className={`text-2xl font-black tabular-nums leading-none tracking-tight ${valCls}`}>
            {lastVal.toLocaleString()}
          </span>
          {data.unit && <span className="text-xs text-zinc-600">{data.unit}</span>}
        </div>
        <div className={`flex items-center gap-1 mt-1 text-xs font-semibold ${trendCls}`}>
          <TrendIcon className="w-3 h-3" />
          {!isFlat && (
            <span className="font-mono text-[10px] tabular-nums">
              {diff > 0 ? "+" : ""}{diff.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </span>
          )}
        </div>
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="shrink-0"
        style={{ width: 100, height: 36 }}
        aria-hidden
      >
        <defs>
          <linearGradient id={`sg-${data.label}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={lineColor} stopOpacity="0.4" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon
          points={`${padX},${H - padY} ${polyline} ${W - padX},${H - padY}`}
          fill={`url(#sg-${data.label})`}
        />
        <polyline
          points={polyline}
          fill="none"
          stroke={lineColor}
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
});
