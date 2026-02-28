import { memo } from "react";
import type { RowData } from "../lib/types";
import { ComponentRenderer } from "./ComponentRenderer";

const GAP: Record<string, string> = {
  NONE: "gap-0", SMALL: "gap-2", MEDIUM: "gap-4", LARGE: "gap-6",
};
const ALIGN: Record<string, string> = {
  START: "items-start", CENTER: "items-center", END: "items-end", STRETCH: "items-stretch",
};

export const RowComponent = memo(function RowComponent({ data }: { data: RowData }) {
  const gap   = GAP[data.gap] ?? "gap-3";
  const align = ALIGN[data.alignment] ?? "items-start";
  const wrap  = data.wrap ? "flex-wrap" : "flex-nowrap";
  return (
    <div className={`flex flex-row ${wrap} ${gap} ${align}`}>
      {(data.children ?? []).map((c, i) => (
        <div key={i} className="min-w-0">
          <ComponentRenderer component={c} />
        </div>
      ))}
    </div>
  );
});
