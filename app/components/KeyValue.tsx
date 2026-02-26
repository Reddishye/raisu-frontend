import type { KeyValueData } from "../lib/types";

export function KeyValue({ data }: { data: KeyValueData }) {
  return (
    <div className="flex items-baseline gap-3 py-1.5 px-3 rounded-md hover:bg-white/5 transition-colors">
      <span className="text-zinc-400 text-sm font-medium shrink-0 min-w-32">
        {data.key}
      </span>
      <span className="text-zinc-100 text-sm font-mono break-all">
        {data.value}
      </span>
    </div>
  );
}
