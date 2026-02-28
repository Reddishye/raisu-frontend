import { memo } from "react";
import type { KeyValueData } from "../lib/types";

export const KeyValue = memo(function KeyValue({
  data,
}: {
  data: KeyValueData;
}) {
  return (
    <div className="flex items-baseline gap-4 px-5 py-2.5 hover:bg-white/2.5 transition-colors group">
      <span className="text-zinc-500 text-xs font-medium shrink-0 min-w-36 group-hover:text-zinc-400 transition-colors">
        {data.key}
      </span>
      <span className="text-zinc-200 text-sm font-mono break-all">
        {data.value}
      </span>
    </div>
  );
});
