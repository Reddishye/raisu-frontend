import type { TableData } from "../lib/types";

export function TableComponent({ data }: { data: TableData }) {
  return (
    <div className="overflow-x-auto rounded-md border border-zinc-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-800 bg-zinc-900">
            {data.headers.map((h, i) => (
              <th
                key={i}
                className="px-4 py-2 text-left text-zinc-400 font-medium text-xs uppercase tracking-wider"
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
              className="border-b border-zinc-800/50 last:border-0 hover:bg-white/5 transition-colors"
            >
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-2 text-zinc-200 font-mono">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
