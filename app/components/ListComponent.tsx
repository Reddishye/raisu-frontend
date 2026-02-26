import type { ListData } from "../lib/types";

export function ListComponent({ data }: { data: ListData }) {
  return (
    <ul className="space-y-1 px-3 py-1">
      {data.items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-zinc-200">
          <span className="text-zinc-600 mt-0.5 shrink-0">›</span>
          <span className="font-mono break-all">{item}</span>
        </li>
      ))}
    </ul>
  );
}
