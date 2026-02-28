import { memo } from "react";
import type { LogViewData, LogEntry } from "../lib/types";
import { Terminal } from "lucide-react";

const SEV: Record<string, { label: string; labelCls: string; textCls: string; rowCls: string }> = {
  DEFAULT: { label: "—",       labelCls: "text-zinc-600",    textCls: "text-zinc-400",      rowCls: ""                     },
  INFO:    { label: "INFO",    labelCls: "text-blue-400",    textCls: "text-zinc-300",      rowCls: ""                     },
  SUCCESS: { label: "OK",      labelCls: "text-emerald-400", textCls: "text-zinc-300",      rowCls: ""                     },
  WARNING: { label: "WARN",    labelCls: "text-amber-400",   textCls: "text-amber-200/80",  rowCls: "bg-amber-500/5"       },
  ERROR:   { label: "ERR",     labelCls: "text-red-400",     textCls: "text-red-200/80",    rowCls: "bg-red-500/5"         },
};

function formatTime(epochMs: number): string {
  try {
    return new Date(epochMs).toLocaleTimeString(undefined, {
      hour: "2-digit", minute: "2-digit", second: "2-digit",
    });
  } catch {
    return String(epochMs);
  }
}

function EntryRow({ entry }: { entry: LogEntry }) {
  const s = SEV[entry.severity] ?? SEV.DEFAULT;
  return (
    <div className={`flex items-start gap-2.5 px-3 py-1 ${s.rowCls}`}>
      <span className="text-[10px] text-zinc-700 font-mono tabular-nums shrink-0 mt-px leading-[1.6]">
        {formatTime(entry.timestamp)}
      </span>
      <span className={`text-[10px] font-bold font-mono shrink-0 w-10 mt-px leading-[1.6] ${s.labelCls}`}>
        {s.label}
      </span>
      <span className={`text-[11px] font-mono leading-relaxed min-w-0 break-all ${s.textCls}`}>
        {entry.message}
      </span>
    </div>
  );
}

export const LogViewComponent = memo(function LogViewComponent({ data }: { data: LogViewData }) {
  const entries = data.entries ?? [];

  return (
    <div className="px-4 py-3">
      <div className="rounded-lg border border-zinc-800/80 bg-zinc-950 overflow-hidden">
        <div className="flex items-center gap-2 px-3 py-2 border-b border-zinc-800/60 bg-zinc-900/40">
          <Terminal className="w-3 h-3 text-zinc-600" />
          <span className="text-[10px] font-mono text-zinc-500">
            {entries.length} {entries.length === 1 ? "entry" : "entries"}
          </span>
        </div>
        <div className="overflow-y-auto py-1" style={{ maxHeight: "240px" }}>
          {entries.length === 0 ? (
            <p className="text-center text-zinc-700 text-xs py-4 font-mono">no entries</p>
          ) : (
            entries.map((entry, i) => <EntryRow key={i} entry={entry} />)
          )}
        </div>
      </div>
    </div>
  );
});
