import * as Icons from "lucide-react";
import type { LucideProps } from "lucide-react";
import {
  Server, Cpu, HardDrive, Users, Globe, Zap, Settings, BarChart2, Layers,
  Package, Database, Activity, Network, MemoryStick, Plug, Gamepad2, Map,
  Clock, AlertTriangle, Bug, Terminal, FileText, Shield, Flame, Box,
  RefreshCw, Wrench, Gauge,
} from "lucide-react";

type IconComponent = React.ComponentType<LucideProps>;

const EMOJI_TO_ICON: Record<string, IconComponent> = {
  "🖥️": Server, "💻": Server, "🖱️": Server, "🔌": Plug, "⚡": Zap,
  "🔥": Flame, "⚙️": Settings, "🔧": Wrench, "🛠️": Wrench, "🔩": Settings,
  "⏱️": Clock, "⏳": Clock, "🕐": Clock,
  "📈": Activity, "📉": Activity, "📊": BarChart2, "🎯": Gauge,
  "💾": HardDrive, "🗄️": Database, "📦": Package, "🗃️": Database,
  "🌍": Globe, "🌎": Globe, "🌏": Globe, "🌐": Network, "🔗": Network,
  "👤": Users, "🧑": Users, "👾": Gamepad2, "🎮": Gamepad2,
  "🗺️": Map, "🏔️": Map, "🌲": Map, "🏕️": Map,
  "🗂️": Layers, "📂": Layers, "📁": Layers,
  "🐛": Bug, "🚨": AlertTriangle, "⚠️": AlertTriangle, "❗": AlertTriangle,
  "📋": FileText, "📝": FileText, "💡": Zap, "🔑": Shield, "🛡️": Shield,
  "🔄": RefreshCw, "♻️": RefreshCw, ">_": Terminal, "📡": Network,
  "🧠": Cpu, "💿": HardDrive, "📀": HardDrive, "📟": Server, "🖨️": Server,
  "📲": Box, "🧩": Box, "🔐": Shield, "🪄": Zap, "🪣": MemoryStick,
  // Extra
  "✅": Icons.CheckCircle2 as IconComponent,
  "👥": Users,
};

function toPascalCase(str: string): string {
  return str
    .split(/[-_\s]/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}

export function CategoryIcon({
  icon,
  className,
}: {
  icon: string;
  className?: string;
}) {
  const cls = className ?? "w-4 h-4";

  // Handle :lucide:iconName format
  const lucideMatch = icon.match(/^:lucide:(.+)$/);
  if (lucideMatch) {
    const name = toPascalCase(lucideMatch[1]);
    const IconComponent = (Icons as Record<string, unknown>)[name] as IconComponent | undefined;
    if (IconComponent) {
      return <IconComponent className={cls} aria-hidden />;
    }
  }

  // Emoji → Lucide mapping
  const Icon = EMOJI_TO_ICON[icon];
  if (Icon) {
    return <Icon className={cls} aria-hidden />;
  }

  // Raw emoji / text fallback
  return (
    <span className="leading-none select-none" aria-hidden>
      {icon}
    </span>
  );
}
