import { memo } from "react";
import type { TimelineData } from "../lib/types";

function formatTime(epochMs: number): string {
  try {
    return new Date(epochMs).toLocaleTimeString(undefined, {
      hour: "2-digit", minute: "2-digit", second: "2-digit",
    });
  } catch {
    return String(epochMs);
  }
}

export const TimelineComponent = memo(function TimelineComponent({ data }: { data: TimelineData }) {
  const events = data.events ?? [];

  return (
    <div className="px-5 py-3.5">
      {events.length === 0 && (
        <p className="text-xs text-zinc-700 py-1 font-mono">no events</p>
      )}
      {events.map((event, i) => (
        <div key={i} className="flex gap-3.5">
          {/* Rail */}
          <div className="flex flex-col items-center pt-1 shrink-0">
            <div className="w-1.5 h-1.5 rounded-full bg-violet-500 ring-[3px] ring-violet-500/15 shrink-0" />
            {i < events.length - 1 && (
              <div
                className="w-px flex-1 mt-1.5"
                style={{ background: "linear-gradient(to bottom, rgba(139,92,246,0.25), transparent)" }}
              />
            )}
          </div>
          {/* Content */}
          <div className={`min-w-0 flex-1 ${i < events.length - 1 ? "pb-4" : "pb-0"}`}>
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-sm font-semibold text-zinc-200 leading-snug">{event.label}</span>
              <span className="text-[10px] text-zinc-600 font-mono tabular-nums">
                {formatTime(event.timestamp)}
              </span>
            </div>
            {event.description && (
              <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">{event.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
});
