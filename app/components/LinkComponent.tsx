import { memo } from "react";
import type { LinkData } from "../lib/types";
import { ArrowUpRight, Link2 } from "lucide-react";

function isExternal(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

export const LinkComponent = memo(function LinkComponent({ data }: { data: LinkData }) {
  const external = isExternal(data.url);
  return (
    <div className="px-4 py-3">
      <a
        href={data.url}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="group inline-flex items-center gap-1.5 text-sm text-violet-400 hover:text-violet-300 transition-colors"
      >
        <Link2 className="w-3.5 h-3.5 shrink-0" />
        <span className="underline-offset-2 group-hover:underline">{data.label}</span>
        {external && (
          <ArrowUpRight className="w-3 h-3 opacity-40 -translate-x-0.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150" />
        )}
      </a>
    </div>
  );
});
