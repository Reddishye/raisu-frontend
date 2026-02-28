import { memo } from "react";
import type { TableData } from "../lib/types";

export const TableComponent = memo(function TableComponent({
  data,
}: {
  data: TableData;
}) {
  return (
    <div className="px-5 py-3">
      <div className="overflow-x-auto rounded-xl border border-zinc-800/60">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800/60 bg-zinc-900/60">
              {data.headers.map((h, i) => (
                <th
                  key={i}
                  className="px-4 py-2.5 text-left text-zinc-500 font-semibold text-[10px] uppercase tracking-widest"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, ri) => (
              <tr
                key={ri}
                className="border-b border-zinc-800/30 last:border-0 hover:bg-white/2 transition-colors"
              >
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className="px-4 py-2 text-zinc-300 text-xs font-mono"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});
