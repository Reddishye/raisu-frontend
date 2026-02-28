import { useEffect, useRef, useState, useMemo, memo } from "react";
import type { Snapshot, Category } from "../lib/types";
import { CategoryCard } from "../components/CategoryCard";
import { CategoryIcon } from "../components/CategoryIcon";
import { parseCategoryName } from "../lib/raisu";
import { Link } from "react-router";
import { ArrowLeft, Bug } from "lucide-react";

export function meta() {
  return [
    { title: "Raisu — Component Showcase" },
    { name: "description", content: "Debug page showing all V2 components." },
  ];
}

const T = 1_700_000_000_000;

const MOCK: Snapshot = {
  version: 2,
  timestamp: T,
  serverVersion: "Paper 1.21.4-build.142",
  javaVersion: "21.0.3",
  categories: [
    {
      id: "status",
      name: "Server Status",
      icon: "🖥️",
      priority: 1,
      components: [
        {
          type: "ROW",
          data: {
            alignment: "CENTER",
            gap: "SMALL",
            wrap: true,
            children: [
              { type: "BADGE", data: { text: "Online", severity: "SUCCESS" } },
              { type: "BADGE", data: { text: "High GC pressure", severity: "WARNING" } },
              { type: "BADGE", data: { text: "Vanilla metrics unavailable", severity: "DEFAULT" } },
            ],
          },
        },
        { type: "STAT",  data: { label: "Online players", value: "42",          trend: 3,     description: "Compared to 1 hour ago" } },
        { type: "STAT",  data: { label: "TPS",            value: "19.95",        trend: -0.05, description: "20.0 is ideal" } },
        { type: "STAT",  data: { label: "Server version", value: "Paper 1.21.4" } },
        { type: "GAUGE", data: { label: "Heap usage",  current: 1536, max: 2048, unit: "MB" } },
        { type: "GAUGE", data: { label: "CPU load",    current: 72,   max: 100,  unit: "%" } },
        { type: "GAUGE", data: { label: "Disk I/O",    current: 28,   max: 100,  unit: "%" } },
      ],
    },
    {
      id: "alerts",
      name: "Alerts",
      icon: "🔔",
      priority: 2,
      components: [
        { type: "ALERT", data: { severity: "ERROR",   title: "OOM Imminent",      message: "Heap at 90%. Increase -Xmx or investigate leaks immediately." } },
        { type: "ALERT", data: { severity: "WARNING", title: null,                 message: "TPS dropped below 18.0 during world save at 14:32." } },
        { type: "ALERT", data: { severity: "INFO",    title: "Maintenance Window", message: "Scheduled restart tonight at 03:00 UTC." } },
        { type: "ALERT", data: { severity: "SUCCESS", title: "Backup Complete",    message: "World backup finished in 3.2 seconds with no errors." } },
        { type: "ALERT", data: { severity: "DEFAULT", title: null,                 message: "No additional notes for this server." } },
      ],
    },
    {
      id: "metrics",
      name: "Metrics",
      icon: "📈",
      priority: 3,
      components: [
        { type: "SPARKLINE", data: { label: "TPS (last 10 ticks)",     values: [20, 19.9, 20, 19.7, 18.5, 17.8, 18.2, 19.5, 19.9, 20],   unit: "tps"     } },
        { type: "SPARKLINE", data: { label: "Online players (1h)",     values: [12, 14, 18, 22, 20, 25, 28, 30, 28, 35],                   unit: "players" } },
        { type: "SPARKLINE", data: { label: "Heap used (last 10 min)", values: [800, 850, 900, 820, 950, 1000, 980, 1100, 1200, 1536],     unit: "MB"      } },
      ],
    },
    {
      id: "logs",
      name: "Recent Logs",
      icon: "📋",
      priority: 4,
      components: [
        {
          type: "LOG_VIEW",
          data: {
            entries: [
              { timestamp: T - 60_000, severity: "INFO",    message: "Server started on port 25565" },
              { timestamp: T - 55_000, severity: "SUCCESS", message: "12 plugins loaded in 1.4s" },
              { timestamp: T - 40_000, severity: "WARNING", message: "Plugin 'EcoPlugin' took 230ms to tick" },
              { timestamp: T - 30_000, severity: "ERROR",   message: "NullPointerException in net.eco.EcoPlugin.onTick() line 42" },
              { timestamp: T - 20_000, severity: "INFO",    message: "Player xXSlayer99Xx joined from 127.0.0.1" },
              { timestamp: T - 10_000, severity: "DEFAULT", message: "World save completed (3 worlds)" },
              { timestamp: T -  5_000, severity: "WARNING", message: "GC pause of 180ms detected" },
              { timestamp: T -  1_000, severity: "INFO",    message: "TPS report: 19.95 avg over last 60s" },
            ],
          },
        },
      ],
    },
    {
      id: "timeline",
      name: "Event Timeline",
      icon: "🕐",
      priority: 5,
      components: [
        {
          type: "TIMELINE",
          data: {
            events: [
              { label: "Server started",       timestamp: T - 3_600_000, description: "JVM boot 8.4s, world load 3.2s" },
              { label: "First player joined",  timestamp: T - 3_200_000, description: "xXSlayer99Xx — total online: 1" },
              { label: "World save",           timestamp: T - 1_800_000, description: "3 worlds saved, 0 errors" },
              { label: "GC pressure detected", timestamp: T -   600_000, description: "Heap at 82%, consecutive GC events" },
              { label: "Backup complete",      timestamp: T -   300_000, description: "Written to /backups/world-20240101.zip" },
            ],
          },
        },
      ],
    },
    {
      id: "code",
      name: "Config Snippets",
      icon: "💻",
      priority: 6,
      components: [
        {
          type: "CODE_BLOCK",
          data: {
            language: "yaml",
            content: `max-players: 100\nview-distance: 10\nsimulation-distance: 8\nonline-mode: true\nspawn-protection: 16`,
          },
        },
        {
          type: "CODE_BLOCK",
          data: {
            language: "java",
            content: `Category.builder()\n    .id("my:status")\n    .name(Component.text("Server Status"))\n    .icon(":lucide:monitor")\n    .add(Badge.of("Online", Severity.SUCCESS))\n    .add(Stat.builder("Players", String.valueOf(online)).trend(delta).build())\n    .build();`,
          },
        },
      ],
    },
    {
      id: "grid",
      name: "Layout: Grid & Row",
      icon: ":lucide:layout-grid",
      priority: 7,
      components: [
        {
          type: "GRID",
          data: {
            columns: 2,
            gap: "MEDIUM",
            children: [
              { type: "STAT", data: { label: "Loaded chunks",   value: "1,248" } },
              { type: "STAT", data: { label: "Entity count",    value: "3,891" } },
              { type: "STAT", data: { label: "Block updates/s", value: "24,502", unit: "/s" } },
              { type: "STAT", data: { label: "Tick time avg",   value: "4.2",    unit: "ms" } },
            ],
          },
        },
        {
          type: "ROW",
          data: {
            alignment: "CENTER",
            gap: "SMALL",
            wrap: true,
            children: [
              { type: "BADGE", data: { text: "Paper 1.21.4", severity: "DEFAULT" } },
              { type: "BADGE", data: { text: "Java 21",      severity: "INFO"    } },
              { type: "BADGE", data: { text: "Linux x64",    severity: "DEFAULT" } },
              { type: "BADGE", data: { text: "Docker",       severity: "INFO"    } },
            ],
          },
        },
      ],
    },
    {
      id: "panel",
      name: "Layout: Panel",
      icon: ":lucide:panel-top",
      priority: 8,
      components: [
        {
          type: "PANEL",
          data: {
            title: "Advanced Heap Stats",
            collapsible: true,
            collapsed: false,
            children: [
              { type: "GAUGE", data: { label: "Eden space", current: 480, max: 600,  unit: "MB" } },
              { type: "GAUGE", data: { label: "Survivor",   current: 96,  max: 120,  unit: "MB" } },
              { type: "GAUGE", data: { label: "Old gen",    current: 960, max: 1328, unit: "MB" } },
            ],
          },
        },
        {
          type: "PANEL",
          data: {
            title: "Plugin Performance (collapsed)",
            collapsible: true,
            collapsed: true,
            children: [
              { type: "STAT", data: { label: "Slowest plugin",     value: "EcoPlugin", description: "230ms avg tick" } },
              { type: "STAT", data: { label: "Total plugin ticks", value: "1,842",     unit: "/s" } },
            ],
          },
        },
      ],
    },
    {
      id: "links",
      name: "Links",
      icon: "🔗",
      priority: 9,
      components: [
        { type: "LINK", data: { label: "PaperMC Documentation", url: "https://docs.papermc.io" } },
        { type: "LINK", data: { label: "SpigotMC Forums",       url: "https://www.spigotmc.org" } },
        { type: "LINK", data: { label: "View live snapshot",    url: "/view" } },
        { type: "LINK", data: { label: "Developer docs",        url: "/docs" } },
      ],
    },
    {
      id: "iframe",
      name: "Embedded View",
      icon: ":lucide:app-window",
      priority: 10,
      components: [
        {
          type: "IFRAME",
          data: {
            url: "https://status.papermc.io",
            title: "PaperMC Status",
            height: 420,
          },
        },
      ],
    },
  ],
};

// ── Sidebar ────────────────────────────────────────────────────────────────────

const Sidebar = memo(function Sidebar({
  categories,
  activeId,
  onSelect,
}: {
  categories: Category[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <nav className="flex flex-col gap-0.5 p-3">
      <p className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest px-2 pb-2">
        Components
      </p>
      {categories.map((cat) => {
        const name = parseCategoryName(cat.name);
        const isActive = cat.id === activeId;
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all duration-150 text-left group ${
              isActive
                ? "bg-violet-500/12 text-violet-300 border border-violet-500/20"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 border border-transparent"
            }`}
          >
            <span className={`shrink-0 transition-colors ${isActive ? "text-violet-400" : "text-zinc-600 group-hover:text-zinc-400"}`}>
              <CategoryIcon icon={cat.icon} className="w-4 h-4" />
            </span>
            <span className="truncate font-medium leading-none">{name}</span>
          </button>
        );
      })}
    </nav>
  );
});

// ── Page ───────────────────────────────────────────────────────────────────────

export default function DebugExampleCodePage() {
  const sorted = useMemo(
    () => [...MOCK.categories].sort((a, b) => a.priority - b.priority),
    []
  );
  const [activeId, setActiveId] = useState(sorted[0]?.id ?? "");
  const mainRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver for sidebar highlighting
  useEffect(() => {
    const root = mainRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.getAttribute("data-cat-id") ?? "");
          }
        }
      },
      { root, rootMargin: "-10% 0px -75% 0px" }
    );
    sorted.forEach((cat) => {
      const el = root.querySelector(`[data-cat-id="${cat.id}"]`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sorted]);

  function scrollTo(id: string) {
    const el = mainRef.current?.querySelector(`[data-cat-id="${id}"]`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="h-screen flex flex-col bg-zinc-950 text-zinc-100 overflow-hidden">
      {/* Header */}
      <header className="shrink-0 border-b border-zinc-800/60 bg-zinc-950/90 backdrop-blur-sm z-20">
        <div className="flex items-center gap-3 px-4 h-13">
          <Link to="/" className="text-zinc-600 hover:text-zinc-300 transition-colors" aria-label="Back">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <span className="font-bold text-sm tracking-tight text-white">Raisu</span>
          <div className="w-px h-4 bg-zinc-800" />
          <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
            <Bug className="w-3.5 h-3.5 text-violet-500" />
            <span className="font-mono text-violet-400">component showcase</span>
          </div>
          <div className="ml-auto flex items-center gap-2 text-xs text-zinc-600 font-mono">
            <span>9 categories · all V2 types</span>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="sidebar-w shrink-0 border-r border-zinc-800/50 overflow-y-auto bg-zinc-950 hidden md:block">
          <Sidebar categories={sorted} activeId={activeId} onSelect={scrollTo} />
        </aside>

        {/* Main scroll area */}
        <main ref={mainRef} className="flex-1 overflow-y-auto scroll-smooth">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-8 space-y-5">
            {sorted.map((cat) => (
              <section
                key={cat.id}
                data-cat-id={cat.id}
                style={{ scrollMarginTop: "1.5rem" }}
              >
                <CategoryCard category={cat} />
              </section>
            ))}
          </div>
        </main>
      </div>

      {/* Mobile tabs */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-20 border-t border-zinc-800/60 bg-zinc-950/95 backdrop-blur-sm">
        <div className="flex overflow-x-auto gap-1 p-2 scrollbar-hide">
          {sorted.map((cat) => {
            const name = parseCategoryName(cat.name);
            const isActive = cat.id === activeId;
            return (
              <button
                key={cat.id}
                onClick={() => scrollTo(cat.id)}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? "bg-violet-500/15 text-violet-300 border border-violet-500/25"
                    : "text-zinc-500 border border-transparent hover:text-zinc-300"
                }`}
              >
                <CategoryIcon icon={cat.icon} className="w-3.5 h-3.5" />
                <span className="max-w-[80px] truncate">{name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
