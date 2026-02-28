import { memo } from "react";
import type { GridData } from "../lib/types";
import { ComponentRenderer } from "./ComponentRenderer";

const COLS: Record<number, string> = { 1: "grid-cols-1", 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4" };
const GAP: Record<string, string> = {
  NONE: "gap-0", SMALL: "gap-2", MEDIUM: "gap-4", LARGE: "gap-6",
};

export const GridComponent = memo(function GridComponent({ data }: { data: GridData }) {
  const cols = COLS[data.columns] ?? "grid-cols-2";
  const gap = GAP[data.gap] ?? "gap-3";
  return (
    <div className={`grid ${cols} ${gap}`}>
      {(data.children ?? []).map((c, i) => (
        <ComponentRenderer key={i} component={c} />
      ))}
    </div>
  );
});
