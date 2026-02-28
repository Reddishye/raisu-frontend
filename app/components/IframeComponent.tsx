import { memo } from "react";
import type { IframeData } from "../lib/types";
import { ExternalLink } from "lucide-react";

export const IframeComponent = memo(function IframeComponent({ data }: { data: IframeData }) {
  const h = data.height ?? 400;

  return (
    <div className="px-4 py-3 space-y-2">
      {data.title && (
        <div className="flex items-center gap-2 text-[10px] font-semibold text-zinc-500 uppercase tracking-widest">
          <ExternalLink className="w-3 h-3" />
          {data.title}
        </div>
      )}
      <iframe
        src={data.url}
        title={data.title ?? "Embedded content"}
        height={h}
        className="w-full rounded-lg border border-zinc-800/60 bg-zinc-900/50"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        loading="lazy"
      />
    </div>
  );
});
