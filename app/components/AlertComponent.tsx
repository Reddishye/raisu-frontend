import { memo } from "react";
import type { AlertData } from "../lib/types";
import { Info, AlertTriangle, XCircle, CheckCircle2, Circle } from "lucide-react";

const S: Record<string, {
  bar: string; bg: string;
  icon: typeof Info; iconCls: string; titleCls: string; textCls: string;
}> = {
  DEFAULT: { bar: "border-l-zinc-600",    bg: "",                   icon: Circle,        iconCls: "text-zinc-500",    titleCls: "text-zinc-300",    textCls: "text-zinc-400"       },
  INFO:    { bar: "border-l-blue-500",    bg: "bg-blue-500/5",      icon: Info,          iconCls: "text-blue-400",    titleCls: "text-blue-200",    textCls: "text-blue-300/90"    },
  SUCCESS: { bar: "border-l-emerald-500", bg: "bg-emerald-500/5",   icon: CheckCircle2,  iconCls: "text-emerald-400", titleCls: "text-emerald-200", textCls: "text-emerald-300/90" },
  WARNING: { bar: "border-l-amber-500",   bg: "bg-amber-500/5",     icon: AlertTriangle, iconCls: "text-amber-400",   titleCls: "text-amber-200",   textCls: "text-amber-300/90"   },
  ERROR:   { bar: "border-l-red-500",     bg: "bg-red-500/5",       icon: XCircle,       iconCls: "text-red-400",     titleCls: "text-red-200",     textCls: "text-red-300/90"     },
};

export const AlertComponent = memo(function AlertComponent({ data }: { data: AlertData }) {
  const s = S[data.severity] ?? S.DEFAULT;
  const Icon = s.icon;

  return (
    <div className={`flex gap-3 border-l-[3px] ${s.bar} ${s.bg} px-4 py-3.5`}>
      <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${s.iconCls}`} />
      <div className="min-w-0">
        {data.title && (
          <p className={`text-sm font-semibold mb-0.5 ${s.titleCls}`}>{data.title}</p>
        )}
        <p className={`text-sm leading-relaxed ${s.textCls}`}>{data.message}</p>
      </div>
    </div>
  );
});
