import { memo, useState } from "react";
import type { CodeBlockData } from "../lib/types";
import { Check, Copy } from "lucide-react";

export const CodeBlockComponent = memo(function CodeBlockComponent({ data }: { data: CodeBlockData }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(data.content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  return (
    <div className="px-4 py-3">
      <div className="rounded-lg border border-zinc-800/80 bg-zinc-950 overflow-hidden">
        <div className="flex items-center gap-3 px-3 py-2 border-b border-zinc-800/60 bg-zinc-900/40">
          <span className="text-[10px] font-mono text-zinc-500 tracking-wide flex-1">
            {data.language || "text"}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-zinc-600 hover:text-zinc-300 transition-colors"
          >
            {copied
              ? <><Check className="w-3.5 h-3.5 text-emerald-400" /><span className="text-[10px] font-mono text-emerald-400">copied</span></>
              : <><Copy className="w-3.5 h-3.5" /><span className="text-[10px] font-mono">copy</span></>
            }
          </button>
        </div>
        <pre className="overflow-x-auto px-4 py-3 text-[12px] font-mono text-zinc-300 leading-relaxed">
          <code>{data.content}</code>
        </pre>
      </div>
    </div>
  );
});
