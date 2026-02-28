import { memo, useState } from "react";
import type { PanelData } from "../lib/types";
import { ComponentRenderer } from "./ComponentRenderer";
import { ChevronDown } from "lucide-react";

export const PanelComponent = memo(function PanelComponent({ data }: { data: PanelData }) {
  const [open, setOpen] = useState(!data.collapsed);
  const collapsible = data.collapsible;

  return (
    <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/20 overflow-hidden">
      {/* Header */}
      <div
        className={`flex items-center justify-between px-4 py-3 bg-zinc-900/60 border-b border-zinc-800/60 ${collapsible ? "cursor-pointer select-none hover:bg-zinc-900/80 transition-colors" : ""}`}
        onClick={collapsible ? () => setOpen((v) => !v) : undefined}
      >
        <span className="text-xs font-semibold text-zinc-300 tracking-wide">{data.title}</span>
        {collapsible && (
          <ChevronDown
            className={`w-3.5 h-3.5 text-zinc-500 transition-transform duration-200 ${open ? "" : "-rotate-90"}`}
          />
        )}
      </div>
      {/* Body */}
      {open && (
        <div className="p-4 flex flex-col gap-3">
          {(data.children ?? []).map((c, i) => (
            <ComponentRenderer key={i} component={c} />
          ))}
        </div>
      )}
    </div>
  );
});
