import { memo } from "react";
import type { BadgeData } from "../lib/types";

const S: Record<string, { pill: string; dot: string; pulse: boolean }> = {
  DEFAULT: { pill: "bg-zinc-800/60 text-zinc-400 border-zinc-700/50",          dot: "bg-zinc-500",    pulse: false },
  INFO:    { pill: "bg-blue-500/12 text-blue-300 border-blue-500/25",          dot: "bg-blue-400",    pulse: false },
  SUCCESS: { pill: "bg-emerald-500/12 text-emerald-300 border-emerald-500/25", dot: "bg-emerald-400", pulse: true  },
  WARNING: { pill: "bg-amber-500/12 text-amber-300 border-amber-500/25",       dot: "bg-amber-400",   pulse: false },
  ERROR:   { pill: "bg-red-500/12 text-red-300 border-red-500/25",             dot: "bg-red-400",     pulse: true  },
};

export const BadgeComponent = memo(function BadgeComponent({ data }: { data: BadgeData }) {
  const s = S[data.severity] ?? S.DEFAULT;
  return (
    <div className="px-4 py-3">
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${s.pill}`}>
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dot} ${s.pulse ? "animate-pulse" : ""}`} />
        {data.text}
      </span>
    </div>
  );
});
