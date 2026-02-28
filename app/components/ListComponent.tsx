import { memo } from "react";
import type { ListData } from "../lib/types";

export const ListComponent = memo(function ListComponent({
  data,
}: {
  data: ListData;
}) {
  return (
    <ul className="space-y-0.5 px-5 py-2.5">
      {data.items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 py-0.5 group">
          <span className="text-violet-600 mt-0.5 shrink-0 text-xs leading-none select-none group-hover:text-violet-400 transition-colors">
            ›
          </span>
          <span className="text-zinc-300 text-sm font-mono break-all group-hover:text-zinc-200 transition-colors">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
});
