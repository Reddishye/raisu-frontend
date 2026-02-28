import { memo } from "react";
import type { ColumnData } from "../lib/types";
import { ComponentRenderer } from "./ComponentRenderer";

const GAP: Record<string, string> = {
  NONE: "gap-0", SMALL: "gap-2", MEDIUM: "gap-4", LARGE: "gap-6",
};
const ALIGN: Record<string, string> = {
  START: "items-start", CENTER: "items-center", END: "items-end", STRETCH: "items-stretch",
};

export const ColumnComponent = memo(function ColumnComponent({ data }: { data: ColumnData }) {
  const gap = GAP[data.gap] ?? "gap-3";
  const align = ALIGN[data.alignment] ?? "items-stretch";
  return (
    <div className={`flex flex-col ${gap} ${align}`}>
      {(data.children ?? []).map((c, i) => (
        <ComponentRenderer key={i} component={c} />
      ))}
    </div>
  );
});
