import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/docs";
import {
  ArrowLeft,
  BookOpen,
  Copy,
  Check,
  Info,
  AlertTriangle,
  Bot,
  Palette,
  Layers,
  LayoutGrid,
  Rows3,
  Columns3,
  PanelTop,
  Badge,
  BarChart3,
  Bell,
  Code2,
  ScrollText,
  GitCommitVertical,
  TrendingUp,
  Gauge,
  ExternalLink,
  AppWindow,
} from "lucide-react";
import { RaisuLogo } from "../components/RaisuLogo";
import Prism from "prismjs";
import "prismjs/components/prism-java";
import "prismjs/components/prism-kotlin";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Raisu — Developer Docs" },
    {
      name: "description",
      content:
        "Developer guide for integrating Raisu into your Minecraft server plugin.",
    },
  ];
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Render backtick-wrapped spans as inline code. */
function ic(text: string): ReactNode {
  const parts = text.split(/`([^`]*)`/);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <code
        key={i}
        className="font-mono text-violet-300 bg-violet-500/8 px-1 py-0.5 rounded text-[11px]"
      >
        {part}
      </code>
    ) : (
      part
    )
  );
}

function CodeBlock({ lang, children }: { lang: string; children: string }) {
  const [copied, setCopied] = useState(false);
  const code = children.trim();
  const grammar = Prism.languages[lang];
  const html = grammar ? Prism.highlight(code, grammar, lang) : code;

  function copy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 overflow-hidden my-5">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800/60 bg-zinc-900/60">
        <span className="text-[10px] font-mono font-semibold text-zinc-600 uppercase tracking-widest">
          {lang}
        </span>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-[10px] text-zinc-600 hover:text-zinc-400 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className={`p-5 overflow-x-auto text-sm leading-relaxed language-${lang}`}>
        <code
          className={`language-${lang}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </pre>
    </div>
  );
}

function Callout({
  type = "info",
  children,
}: {
  type?: "info" | "warn";
  children: ReactNode;
}) {
  if (type === "warn") {
    return (
      <div className="flex gap-3 my-5 px-4 py-3.5 rounded-xl border border-amber-500/20 bg-amber-500/6">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p className="text-amber-300/80 text-sm leading-relaxed">{children}</p>
      </div>
    );
  }
  return (
    <div className="flex gap-3 my-5 px-4 py-3.5 rounded-xl border border-violet-500/20 bg-violet-500/6">
      <Info className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
      <p className="text-violet-200/70 text-sm leading-relaxed">{children}</p>
    </div>
  );
}

function DocTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="my-5 overflow-x-auto rounded-xl border border-zinc-800/60">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-800/60 bg-zinc-900/60">
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left text-zinc-500 font-semibold text-[10px] uppercase tracking-widest"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className="border-b border-zinc-800/30 last:border-0 hover:bg-white/2 transition-colors"
            >
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-2.5 text-zinc-300 text-xs font-mono">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SectionH2({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="text-xl font-bold text-zinc-100 mt-0 mb-4 pb-2 border-b border-zinc-800/50 scroll-mt-20"
    >
      {children}
    </h2>
  );
}

function V2Badge({ label, Icon }: { label: string; Icon: React.ElementType }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-violet-500/20 bg-violet-500/8 text-violet-300 text-xs font-mono">
      <Icon className="w-3 h-3" />
      {label}
    </div>
  );
}

// ── Navigation structure ───────────────────────────────────────────────────────

const NAV = [
  {
    group: "Introduction",
    items: [
      { id: "overview", label: "Overview" },
      { id: "pipeline", label: "How it works" },
    ],
  },
  {
    group: "Setup",
    items: [
      { id: "modules", label: "Modules" },
      { id: "gradle", label: "Gradle setup" },
    ],
  },
  {
    group: "Quick Start",
    items: [
      { id: "qs-paper", label: "Paper plugin" },
      { id: "qs-spigot", label: "Spigot plugin" },
      { id: "qs-standalone", label: "Standalone" },
    ],
  },
  {
    group: "Categories",
    items: [
      { id: "cat-static", label: "Static categories" },
      { id: "cat-dynamic", label: "Dynamic providers" },
      { id: "cat-builder", label: "Builder pattern" },
    ],
  },
  {
    group: "Components V1",
    items: [
      { id: "comp-types", label: "Component types" },
      { id: "comp-create", label: "Creating components" },
    ],
  },
  {
    group: "Components V2",
    items: [
      { id: "v2-overview", label: "V2 overview" },
      { id: "v2-layout", label: "Layout components" },
      { id: "v2-display", label: "Display components" },
    ],
  },
  {
    group: "Snapshots",
    items: [
      { id: "snap-take", label: "Taking a snapshot" },
      { id: "snap-encode", label: "Encoding & sharing" },
      { id: "snap-unregister", label: "Unregistering" },
    ],
  },
  {
    group: "Reference",
    items: [
      { id: "ref-builtins", label: "Built-in categories" },
      { id: "ref-platform", label: "RaisuPlatform" },
      { id: "ref-versioning", label: "Snapshot versioning" },
    ],
  },
  {
    group: "AI Resources",
    items: [
      { id: "ai-overview", label: "Library summary" },
      { id: "ai-wire", label: "Wire format spec" },
      { id: "ai-components", label: "Component reference" },
    ],
  },
  {
    group: "Design Guide",
    items: [
      { id: "dg-showcase", label: "Live showcase" },
      { id: "dg-severity", label: "Severity system" },
      { id: "dg-layout", label: "Layout patterns" },
    ],
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DocsPage() {
  const [activeId, setActiveId] = useState("overview");

  useEffect(() => {
    const allIds = NAV.flatMap((g) => g.items.map((i) => i.id));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-10% 0px -70% 0px" }
    );
    allIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-zinc-950 text-zinc-100 flex flex-col" style={{ height: "100dvh" }}>
      {/* ── Header ── */}
      <header className="shrink-0 border-b border-zinc-800/60 bg-zinc-950/90 backdrop-blur-sm z-20">
        <div className="flex items-center gap-3 px-5 h-13">
          <Link
            to="/"
            className="text-zinc-600 hover:text-zinc-300 transition-colors shrink-0"
            aria-label="Back to home"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <RaisuLogo iconSize={22} wordmark className="shrink-0" />
          <div className="w-px h-4 bg-zinc-800 shrink-0" />
          <div className="flex items-center gap-1.5 text-zinc-400 text-sm">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Documentation</span>
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* ── Sidebar ── */}
        <aside className="sidebar-w shrink-0 border-r border-zinc-800/50 overflow-y-auto bg-zinc-950 hidden md:block">
          <nav className="p-4 space-y-5 py-6">
            {NAV.map((group) => (
              <div key={group.group}>
                <p className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest mb-2 px-2 flex items-center gap-1.5">
                  {group.group === "AI Resources" && (
                    <Bot className="w-3 h-3 text-violet-600" />
                  )}
                  {group.group === "Design Guide" && (
                    <Palette className="w-3 h-3 text-violet-500" />
                  )}
                  {group.group}
                </p>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const isActive = activeId === item.id;
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`flex items-center px-2.5 py-1.5 rounded-lg text-sm transition-all duration-150 ${
                          isActive
                            ? "text-violet-300 bg-violet-500/10 border border-violet-500/20"
                            : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 border border-transparent"
                        }`}
                      >
                        {item.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        {/* ── Content ── */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-6 sm:px-10 py-10 pb-24 space-y-16">

            {/* ══════════════════════════════════════════════════════════════ */}
            {/*  INTRODUCTION                                                 */}
            {/* ══════════════════════════════════════════════════════════════ */}

            <section id="overview" className="scroll-mt-20">
              <div className="mb-2 text-xs font-semibold text-violet-400 uppercase tracking-widest">
                Introduction
              </div>
              <h1 className="text-3xl font-black text-white mb-5 tracking-tight">
                Raisu Developer Guide
              </h1>
              <p className="text-zinc-400 text-base leading-relaxed mb-4">
                Raisu is a platform-agnostic debug snapshot library for Minecraft
                servers. Collect structured data from your server, encrypt it,
                upload it to a paste service, and share a compact shortcode that
                the Raisu frontend renders entirely in the browser.
              </p>
              <p className="text-zinc-400 text-base leading-relaxed">
                The library is modular — integrate at the Paper, Spigot, or
                standalone level. You register <strong className="text-zinc-200">categories</strong> (groups of related data)
                and <strong className="text-zinc-200">components</strong> (individual data widgets) that compose each
                category. When you call <code className="font-mono text-violet-300 bg-violet-500/8 px-1.5 py-0.5 rounded text-sm">snapshot()</code>, every registered
                provider is evaluated and the result is packaged for sharing.
              </p>
            </section>

            <section id="pipeline" className="scroll-mt-20">
              <SectionH2>How it works</SectionH2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                When you call{" "}
                <code className="font-mono text-violet-300 bg-violet-500/8 px-1.5 py-0.5 rounded">
                  raisu.encode(snapshot, config)
                </code>
                , the library runs this pipeline server-side:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    n: "01",
                    title: "Serialize",
                    desc: "Categories and components are encoded to a compact MessagePack binary.",
                  },
                  {
                    n: "02",
                    title: "Encrypt",
                    desc: "The binary is encrypted with a randomly generated AES-128-CBC key and prepended with the IV.",
                  },
                  {
                    n: "03",
                    title: "Upload & pack",
                    desc: "The ciphertext is base64-encoded and uploaded to your paste provider. A base64url shortcode is returned bundling the provider ID, paste key, and raw AES key.",
                  },
                ].map((step) => (
                  <div
                    key={step.n}
                    className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-4 space-y-2"
                  >
                    <span className="text-[10px] font-mono text-violet-500">{step.n}</span>
                    <p className="text-zinc-100 text-sm font-semibold">{step.title}</p>
                    <p className="text-zinc-500 text-xs leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mt-5">
                The Raisu frontend reverses this pipeline client-side: decodes
                the shortcode, fetches the ciphertext, decrypts it with the
                embedded AES key, deserializes MessagePack, and renders each
                category and component. No data is sent to any external backend.
              </p>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/*  SETUP                                                        */}
            {/* ══════════════════════════════════════════════════════════════ */}

            <section id="modules" className="scroll-mt-20">
              <SectionH2>Modules</SectionH2>
              <DocTable
                headers={["Artifact", "Purpose"]}
                rows={[
                  [ic("`raisu-bootstrap`"), "Version management — rarely needed directly"],
                  [ic("`raisu-api`"), ic("Core interfaces — use as `compileOnly` or `api` dependency")],
                  [ic("`raisu-core`"), "Engine — AES encryption, MessagePack encoding, paste upload"],
                  [ic("`raisu-spigot`"), "Spigot/Bukkit integration with built-in debug categories"],
                  [ic("`raisu-paper`"), ic("Paper integration — extends Spigot with TPS/MSPT via `raisu:performance`")],
                ]}
              />
              <Callout>
                {ic(
                  "For most Minecraft plugins, depend on `raisu-paper` (Paper servers) or `raisu-spigot` (Spigot/Bukkit). Both transitively include `raisu-core` and `raisu-api`."
                )}
              </Callout>
            </section>

            <section id="gradle" className="scroll-mt-20">
              <SectionH2>Gradle setup</SectionH2>
              <CodeBlock lang="kotlin">{`
repositories {
    maven("https://repo.example.com/raisu")   // replace with your Maven repo
}

dependencies {
    // For Paper plugins:
    implementation("com.redactado:raisu-paper:1.0.0-SNAPSHOT")

    // For Spigot plugins (no Paper-specific APIs):
    // implementation("com.redactado:raisu-spigot:1.0.0-SNAPSHOT")

    // For standalone / non-Minecraft use:
    // implementation("com.redactado:raisu-core:1.0.0-SNAPSHOT")
}
              `}</CodeBlock>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/*  QUICK START                                                  */}
            {/* ══════════════════════════════════════════════════════════════ */}

            <section id="qs-paper" className="scroll-mt-20">
              <SectionH2>Quick start — Paper plugin</SectionH2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                {ic(
                  "Creates a Raisu instance with all built-in categories: `raisu:system`, `raisu:memory`, `raisu:threads`, `raisu:plugins`, `raisu:performance`."
                )}
              </p>
              <CodeBlock lang="java">{`
public final class MyPlugin extends JavaPlugin {

    private Raisu raisu;

    @Override
    public void onEnable() {
        raisu = PaperRaisu.create(this);
    }

    public void onDebugCommand() {
        EncodeConfig config = EncodeConfig.builder()
                .provider(PasteProvider.PASTES_DEV)
                .build();

        String shortcode = raisu.encode(raisu.snapshot(), config);
        getLogger().info("Debug snapshot: https://yoursite.com/view#" + shortcode);
    }
}
              `}</CodeBlock>
            </section>

            <section id="qs-spigot" className="scroll-mt-20">
              <SectionH2>Quick start — Spigot plugin</SectionH2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                Same API as the Paper integration, without the Paper-specific
                performance category.
              </p>
              <CodeBlock lang="java">{`
raisu = SpigotRaisu.create(this);   // same API, no raisu:performance category
              `}</CodeBlock>
            </section>

            <section id="qs-standalone" className="scroll-mt-20">
              <SectionH2>Quick start — Standalone</SectionH2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                {ic(
                  "Implement `RaisuPlatform` directly for any non-Bukkit environment. Only `serverVersion()` is required."
                )}
              </p>
              <CodeBlock lang="java">{`
RaisuPlatform platform = new RaisuPlatform() {
    @Override public String serverVersion() { return "MyApp 1.0"; }
};

Raisu raisu = Raisu.create(platform);
              `}</CodeBlock>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/*  CATEGORIES                                                   */}
            {/* ══════════════════════════════════════════════════════════════ */}

            <section id="cat-static" className="scroll-mt-20">
              <SectionH2>Static categories</SectionH2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                Use static categories when the data is known at registration
                time and doesn't change between snapshots.
              </p>
              <CodeBlock lang="java">{`
Category myCategory = Category.builder()
        .id("my:info")
        .name(Component.text("My Info"))
        .icon("📦")
        .priority(10)
        .add(/* component */)
        .build();

raisu.register(myCategory);
              `}</CodeBlock>
            </section>

            <section id="cat-dynamic" className="scroll-mt-20">
              <SectionH2>Dynamic providers</SectionH2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                {ic(
                  "Use `registerProvider` when data changes over time. The lambda is called each time `raisu.snapshot()` is invoked."
                )}
              </p>
              <Callout type="warn">
                Keep provider lambdas fast — avoid blocking I/O inside them.
              </Callout>
              <CodeBlock lang="java">{`
raisu.registerProvider("my:stats", () -> {
    int activeTasks = scheduler.getActiveTasks();
    return Category.builder()
            .id("my:stats")
            .name(Component.text("Task Stats"))
            .icon("⚙️")
            .priority(10)
            .add(/* KV, Table, etc. */)
            .build();
});
              `}</CodeBlock>
            </section>

            <section id="cat-builder" className="scroll-mt-20">
              <SectionH2>Builder pattern</SectionH2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                {ic(
                  "Mix built-in and custom categories using the platform builder. To disable all `raisu:*` defaults, call `.excludeDefaultCategories()`."
                )}
              </p>
              <CodeBlock lang="java">{`
raisu = PaperRaisu.builder(this)
        // Add your own alongside the defaults:
        .addCategory(myStaticCategory)
        .addProvider("my:economy", () -> buildEconomyCategory())
        // Or start from scratch (disables all raisu:* built-ins):
        // .excludeDefaultCategories()
        .build();
              `}</CodeBlock>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/*  COMPONENTS V1                                                */}
            {/* ══════════════════════════════════════════════════════════════ */}

            <section id="comp-types" className="scroll-mt-20">
              <SectionH2>Component types (V1)</SectionH2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                {ic(
                  "All component interfaces live in `com.redactado.raisu.component`. V1 types are available from `raisu-api` version 1."
                )}
              </p>
              <DocTable
                headers={["Wire type", "Java interface", "Fields"]}
                rows={[
                  [ic("`KEY_VALUE`"), ic("`KeyValue`"), ic("`key`, `value` (Strings)")],
                  [ic("`TEXT`"), ic("`Text`"), ic("`content` (String)")],
                  [ic("`TABLE`"), ic("`Table`"), ic("`headers` (String[]), `rows` (String[][])")],
                  [ic("`LIST`"), ic("`List`"), ic("`items` (String[])")],
                  [ic("`PROGRESS_BAR`"), ic("`ProgressBar`"), ic("`label`, `current`, `max` (doubles)")],
                  [ic("`GRAPH`"), ic("`Graph`"), ic("`title`, `dataPoints` (ordered String→Double map)")],
                  [ic("`TREE`"), ic("`Tree`"), ic("`root` (recursive TreeNode with `label` + `children`)")],
                ]}
              />
            </section>

            <section id="comp-create" className="scroll-mt-20">
              <SectionH2>Creating V1 components</SectionH2>
              <Callout>
                {ic(
                  "Public factory methods on component interfaces are planned for a future release. Until then, use the `*Impl` classes from `raisu-core` directly."
                )}
              </Callout>
              <CodeBlock lang="java">{`
import com.redactado.raisu.core.component.*;

new KeyValueImpl("Server TPS", "19.95")
new TextImpl("Everything looks healthy.")
new ProgressBarImpl("Memory", usedMb, maxMb)
new TableImpl(List.of("Name", "Value"), rows)
new ListImpl(List.of("item1", "item2"))
new GraphImpl("TPS History", dataPoints)     // dataPoints = LinkedHashMap
new TreeImpl(new TreeNodeImpl("root", children))
              `}</CodeBlock>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/*  COMPONENTS V2                                                */}
            {/* ══════════════════════════════════════════════════════════════ */}

            <section id="v2-overview" className="scroll-mt-20">
              <div className="mb-2 text-xs font-semibold text-violet-400 uppercase tracking-widest">
                Components V2
              </div>
              <SectionH2>V2 component system</SectionH2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                The V2 component system extends V1 with two new categories of
                primitives: <strong className="text-zinc-200">layout containers</strong> that compose child
                components, and <strong className="text-zinc-200">rich display widgets</strong> for richer
                server-status UIs.
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                V2 components are fully backward-compatible. Snapshots containing
                V2 components are identified by{" "}
                <code className="font-mono text-violet-300 bg-violet-500/8 px-1.5 py-0.5 rounded text-sm">
                  version: 2
                </code>{" "}
                in the payload. Older frontend versions will render them as
                best-effort.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-violet-400" />
                    <span className="text-sm font-semibold text-zinc-200">Layout</span>
                  </div>
                  <p className="text-zinc-500 text-xs leading-relaxed">
                    Containers that arrange child components: COLUMN, ROW, GRID, PANEL
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-indigo-400" />
                    <span className="text-sm font-semibold text-zinc-200">Display</span>
                  </div>
                  <p className="text-zinc-500 text-xs leading-relaxed">
                    Rich data widgets: BADGE, STAT, ALERT, CODE_BLOCK, LOG_VIEW, TIMELINE, SPARKLINE, GAUGE, LINK, IFRAME
                  </p>
                </div>
              </div>
            </section>

            <section id="v2-layout" className="scroll-mt-20">
              <SectionH2>V2 — Layout components</SectionH2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                Layout components are containers. Their{" "}
                <code className="font-mono text-violet-300 bg-violet-500/8 px-1 py-0.5 rounded text-[11px]">children</code>{" "}
                field holds an ordered array of child{" "}
                <code className="font-mono text-violet-300 bg-violet-500/8 px-1 py-0.5 rounded text-[11px]">RaisuComponent</code>{" "}
                objects. Nesting any depth is supported.
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed mb-5">
                {ic("All layout builders share `Gap` (`NONE` | `SMALL` | `MEDIUM` | `LARGE`) and `Alignment` (`START` | `CENTER` | `END` | `STRETCH`) enums, serialized as their name strings.")}
              </p>

              {/* COLUMN */}
              <div className="mb-8 space-y-3">
                <V2Badge label="COLUMN" Icon={Columns3} />
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Stacks children vertically.
                </p>
                <DocTable
                  headers={["Field", "Type", "Description"]}
                  rows={[
                    [ic("`alignment`"), "Alignment", ic("`START` | `CENTER` | `END` | `STRETCH`")],
                    [ic("`gap`"), "Gap", ic("`NONE` | `SMALL` | `MEDIUM` | `LARGE`")],
                    [ic("`children`"), "Component[]", "Child components, top to bottom"],
                  ]}
                />
                <CodeBlock lang="java">{`
Column.builder()
    .gap(Gap.MEDIUM)
    .add(new KeyValueImpl("Status", "Online"))
    .add(new ProgressBarImpl("Memory", usedMb, maxMb))
    .build()
                `}</CodeBlock>
              </div>

              {/* ROW */}
              <div className="mb-8 space-y-3">
                <V2Badge label="ROW" Icon={Rows3} />
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Arranges children horizontally. Each child gets equal flex width.
                </p>
                <DocTable
                  headers={["Field", "Type", "Description"]}
                  rows={[
                    [ic("`alignment`"), "Alignment", "Cross-axis child alignment"],
                    [ic("`gap`"), "Gap", "Spacing between children"],
                    [ic("`wrap`"), "boolean", "Whether children wrap to the next line"],
                    [ic("`children`"), "Component[]", "Child components, left to right"],
                  ]}
                />
                <CodeBlock lang="java">{`
Row.builder()
    .gap(Gap.SMALL)
    .add(Badge.of("ONLINE", Severity.SUCCESS))
    .add(Badge.of("Paper 1.21.4", Severity.INFO))
    .build()
                `}</CodeBlock>
              </div>

              {/* GRID */}
              <div className="mb-8 space-y-3">
                <V2Badge label="GRID" Icon={LayoutGrid} />
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Places children in a CSS grid with a fixed column count (1–4).
                </p>
                <DocTable
                  headers={["Field", "Type", "Description"]}
                  rows={[
                    [ic("`columns`"), "int", "Number of columns (1–4)"],
                    [ic("`gap`"), "Gap", "Gap between cells"],
                    [ic("`children`"), "Component[]", "Child components, filling left-to-right"],
                  ]}
                />
                <CodeBlock lang="java">{`
Grid.builder(3)
    .gap(Gap.MEDIUM)
    .add(Stat.builder("CPU", "32%").unit("%").build())
    .add(Stat.builder("RAM", "4.2").unit("GB").build())
    .add(Stat.builder("TPS", "19.9").build())
    .build()
                `}</CodeBlock>
              </div>

              {/* PANEL */}
              <div className="mb-8 space-y-3">
                <V2Badge label="PANEL" Icon={PanelTop} />
                <p className="text-zinc-400 text-sm leading-relaxed">
                  A titled card container. Supports optional collapsing.
                </p>
                <DocTable
                  headers={["Field", "Type", "Description"]}
                  rows={[
                    [ic("`title`"), "String", "Panel header label"],
                    [ic("`collapsible`"), "boolean", "Whether the panel can be collapsed by the user"],
                    [ic("`collapsed`"), "boolean", "Initial collapsed state"],
                    [ic("`children`"), "Component[]", "Child components inside the panel"],
                  ]}
                />
                <CodeBlock lang="java">{`
Panel.builder("Network Stats")
    .collapsible(true)
    .add(new KeyValueImpl("Bytes In", "12.4 MB"))
    .add(new KeyValueImpl("Bytes Out", "3.1 MB"))
    .build()
                `}</CodeBlock>
              </div>
            </section>

            <section id="v2-display" className="scroll-mt-20">
              <SectionH2>V2 — Display components</SectionH2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-5">
                Display components are leaf nodes — they render a single piece
                of data without children.
              </p>

              {/* BADGE */}
              <div className="mb-8 space-y-3">
                <V2Badge label="BADGE" Icon={Badge} />
                <p className="text-zinc-400 text-sm leading-relaxed">
                  A small pill label with semantic colour. Ideal for status indicators. SUCCESS and ERROR badges pulse.
                </p>
                <DocTable
                  headers={["Field", "Type", "Values"]}
                  rows={[
                    [ic("`text`"), "String", "Label text"],
                    [ic("`severity`"), "Severity", ic("`DEFAULT` `INFO` `SUCCESS` `WARNING` `ERROR`")],
                  ]}
                />
                <CodeBlock lang="java">{`
Badge.of("ONLINE", Severity.SUCCESS)
Badge.of("DEGRADED", Severity.WARNING)
Badge.of("OFFLINE", Severity.ERROR)
Badge.of("Paper 1.21.4", Severity.INFO)
                `}</CodeBlock>
              </div>

              {/* STAT */}
              <div className="mb-8 space-y-3">
                <V2Badge label="STAT" Icon={BarChart3} />
                <p className="text-zinc-400 text-sm leading-relaxed">
                  A big-number metric with optional unit and trend indicator.
                </p>
                <DocTable
                  headers={["Field", "Type", "Description"]}
                  rows={[
                    [ic("`label`"), "String", "Metric name"],
                    [ic("`value`"), "String", "Formatted value string"],
                    [ic("`unit`"), "String (optional)", "Unit suffix (ms, MB, %, …)"],
                    [ic("`trend`"), "double (optional)", "Positive = up (green), negative = down (red), null = hidden"],
                    [ic("`description`"), "String (optional)", "Subtitle / context line below the value"],
                  ]}
                />
                <CodeBlock lang="java">{`
Stat.builder("Active Players", "142").trend(+3.0).build()
Stat.builder("Avg MSPT", "2.4").unit("ms").description("last 5 min avg").build()
                `}</CodeBlock>
              </div>

              {/* ALERT */}
              <div className="mb-8 space-y-3">
                <V2Badge label="ALERT" Icon={Bell} />
                <p className="text-zinc-400 text-sm leading-relaxed">
                  An alert callout with severity level, optional title, and message.
                </p>
                <DocTable
                  headers={["Field", "Type", "Values / Description"]}
                  rows={[
                    [ic("`severity`"), "Severity", ic("`DEFAULT` | `INFO` | `SUCCESS` | `WARNING` | `ERROR`")],
                    [ic("`title`"), "String (optional)", "Bold header line"],
                    [ic("`message`"), "String", "Body text"],
                  ]}
                />
                <CodeBlock lang="java">{`
Alert.of(Severity.WARNING, "High Memory", "Heap usage exceeds 85%.")
Alert.of(Severity.SUCCESS, "All systems nominal.")
                `}</CodeBlock>
              </div>

              {/* CODE_BLOCK */}
              <div className="mb-8 space-y-3">
                <V2Badge label="CODE_BLOCK" Icon={Code2} />
                <p className="text-zinc-400 text-sm leading-relaxed">
                  A copyable code block with a language label. The frontend does
                  not apply syntax highlighting to code blocks received from the
                  server (highlighting is reserved for the docs page).
                </p>
                <DocTable
                  headers={["Field", "Type", "Description"]}
                  rows={[
                    [ic("`content`"), "String", "Raw source code string"],
                    [ic("`language`"), "String", "Language hint shown in the header (e.g. java, yaml)"],
                  ]}
                />
                <CodeBlock lang="java">{`
CodeBlock.of("max-players: 100\\nonline-mode: true", "yaml")
                `}</CodeBlock>
              </div>

              {/* LOG_VIEW */}
              <div className="mb-8 space-y-3">
                <V2Badge label="LOG_VIEW" Icon={ScrollText} />
                <p className="text-zinc-400 text-sm leading-relaxed">
                  A scrollable log panel. Lines containing{" "}
                  <code className="font-mono text-violet-300 bg-violet-500/8 px-1 py-0.5 rounded text-[11px]">ERROR</code>/
                  <code className="font-mono text-violet-300 bg-violet-500/8 px-1 py-0.5 rounded text-[11px]">WARN</code>/
                  <code className="font-mono text-violet-300 bg-violet-500/8 px-1 py-0.5 rounded text-[11px]">INFO</code> are coloured automatically.
                </p>
                <DocTable
                  headers={["Field", "Type", "Description"]}
                  rows={[
                    [ic("`entries`"), "LogEntry[]", "Ordered log entries"],
                    [ic("`entries[].timestamp`"), "long", "Epoch milliseconds"],
                    [ic("`entries[].severity`"), "Severity", ic("`DEFAULT` | `INFO` | `SUCCESS` | `WARNING` | `ERROR`")],
                    [ic("`entries[].message`"), "String", "Log message text"],
                  ]}
                />
                <CodeBlock lang="java">{`
LogView.builder()
    .add(System.currentTimeMillis(), Severity.INFO, "Server started")
    .add(System.currentTimeMillis(), Severity.WARNING, "High GC pressure")
    .add(System.currentTimeMillis(), Severity.ERROR, "Plugin failed to load")
    .build()
                `}</CodeBlock>
              </div>

              {/* TIMELINE */}
              <div className="mb-8 space-y-3">
                <V2Badge label="TIMELINE" Icon={GitCommitVertical} />
                <p className="text-zinc-400 text-sm leading-relaxed">
                  An ordered list of timestamped events connected by a vertical rail.
                </p>
                <DocTable
                  headers={["Field", "Type", "Description"]}
                  rows={[
                    [ic("`events`"), "TimelineEvent[]", "Ordered list of events (oldest first)"],
                    [ic("`events[].label`"), "String", "Event title"],
                    [ic("`events[].description`"), "String", "Detail / context text"],
                    [ic("`events[].timestamp`"), "long", "Epoch milliseconds — formatted as local time in the UI"],
                  ]}
                />
                <CodeBlock lang="java">{`
Timeline.builder()
    .add("Server started", "PaperMC 1.21.4", startMs)
    .add("Plugins loaded", "42 plugins enabled", startMs + 3000)
    .add("World loaded", "overworld / 8192 chunks", startMs + 5000)
    .build()
                `}</CodeBlock>
              </div>

              {/* SPARKLINE */}
              <div className="mb-8 space-y-3">
                <V2Badge label="SPARKLINE" Icon={TrendingUp} />
                <p className="text-zinc-400 text-sm leading-relaxed">
                  A mini inline line chart with the latest value prominently
                  displayed. Trend colour (green/red) is derived from first vs.
                  last value.
                </p>
                <DocTable
                  headers={["Field", "Type", "Description"]}
                  rows={[
                    [ic("`label`"), "String", "Metric name"],
                    [ic("`values`"), "double[]", "Ordered data points (oldest → newest)"],
                    [ic("`unit`"), "String (optional)", "Unit suffix"],
                  ]}
                />
                <CodeBlock lang="java">{`
new SparklineImpl("TPS (1 min buckets)", tpsHistory, null)
                `}</CodeBlock>
              </div>

              {/* GAUGE */}
              <div className="mb-8 space-y-3">
                <V2Badge label="GAUGE" Icon={Gauge} />
                <p className="text-zinc-400 text-sm leading-relaxed">
                  A labelled progress track that transitions from violet → amber →
                  red as the value approaches max.
                </p>
                <DocTable
                  headers={["Field", "Type", "Description"]}
                  rows={[
                    [ic("`label`"), "String", "Gauge label"],
                    [ic("`current`"), "double", "Current value"],
                    [ic("`max`"), "double", "Maximum value (min is always 0)"],
                    [ic("`unit`"), "String (optional)", "Unit suffix"],
                  ]}
                />
                <CodeBlock lang="java">{`
Gauge.of("Heap", usedMb, maxMb)
Gauge.builder("Heap", usedMb, maxMb).unit("MB").build()
                `}</CodeBlock>
              </div>

              {/* LINK */}
              <div className="mb-8 space-y-3">
                <V2Badge label="LINK" Icon={ExternalLink} />
                <p className="text-zinc-400 text-sm leading-relaxed">
                  A clickable hyperlink. Set{" "}
                  <code className="font-mono text-violet-300 bg-violet-500/8 px-1 py-0.5 rounded text-[11px]">external: true</code>{" "}
                  to open in a new tab with{" "}
                  <code className="font-mono text-zinc-400 text-[11px]">rel="noopener noreferrer"</code>.
                </p>
                <DocTable
                  headers={["Field", "Type", "Description"]}
                  rows={[
                    [ic("`label`"), "String", "Link display text"],
                    [ic("`url`"), "String", "Destination URL (http/https URLs open in a new tab automatically)"],
                  ]}
                />
                <CodeBlock lang="java">{`
Link.of("View on GitHub", "https://github.com/...")
                `}</CodeBlock>
              </div>

              {/* IFRAME */}
              <div className="mb-8 space-y-3">
                <V2Badge label="IFRAME" Icon={AppWindow} />
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Embeds an external web page inside the snapshot. The frame is sandboxed
                  ({ic("`allow-scripts allow-same-origin allow-forms allow-popups`")}) and lazy-loaded.
                  Use this to embed dashboards, status pages, or any URL-accessible resource directly
                  into a category.
                </p>
                <DocTable
                  headers={["Field", "Type", "Description"]}
                  rows={[
                    [ic("`url`"), "String", "URL of the page to embed"],
                    [ic("`title`"), "String?", "Optional label shown above the frame"],
                    [ic("`height`"), "int?", "Frame height in pixels (default: 400)"],
                  ]}
                />
                <CodeBlock lang="java">{`
// Minimal — embed a URL at the default 400 px height
Iframe.of("https://status.example.com")

// With label and custom height
Iframe.of("https://grafana.example.com/d/xyz", "Grafana Dashboard", 600)

// Via Components factory
Components.iframe("https://status.example.com", "Service Status", 300)
                `}</CodeBlock>
              </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/*  SNAPSHOTS                                                    */}
            {/* ══════════════════════════════════════════════════════════════ */}

            <section id="snap-take" className="scroll-mt-20">
              <SectionH2>Taking a snapshot</SectionH2>
              <CodeBlock lang="java">{`
// Quick — includes all registered categories and providers:
Snapshot snap = raisu.snapshot();

// Manual — build exactly what you want:
Snapshot snap = raisu.snapshotBuilder()
        .serverVersion("MyApp 2.0")
        .javaVersion(System.getProperty("java.version"))
        .addCategory(myCategory)
        .build();
              `}</CodeBlock>
            </section>

            <section id="snap-encode" className="scroll-mt-20">
              <SectionH2>Encoding & sharing</SectionH2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                The{" "}
                <code className="font-mono text-violet-300 bg-violet-500/8 px-1.5 py-0.5 rounded">
                  encode
                </code>{" "}
                call serialises the snapshot to MessagePack, encrypts it with
                AES-128-CBC, uploads the ciphertext to the chosen paste provider,
                and returns a compact base64url shortcode.
              </p>
              <CodeBlock lang="java">{`
EncodeConfig config = EncodeConfig.builder()
        .provider(PasteProvider.PASTES_DEV)   // or HASTEBIN
        .build();

String shortcode = raisu.encode(snap, config);
// Share as: https://yoursite.com/view#<shortcode>
              `}</CodeBlock>
            </section>

            <section id="snap-unregister" className="scroll-mt-20">
              <SectionH2>Unregistering</SectionH2>
              <CodeBlock lang="java">{`
raisu.unregister("my:info");           // remove static category
raisu.unregisterProvider("my:stats");  // remove dynamic provider
              `}</CodeBlock>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/*  REFERENCE                                                    */}
            {/* ══════════════════════════════════════════════════════════════ */}

            <section id="ref-builtins" className="scroll-mt-20">
              <SectionH2>Built-in categories</SectionH2>

              <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-3">
                raisu-spigot defaults
              </p>
              <DocTable
                headers={["Category ID", "Icon", "Priority", "Description"]}
                rows={[
                  [ic("`raisu:system`"), "🖥️", "1", "OS name/version/arch, Java version/vendor/VM, server software, player count"],
                  [ic("`raisu:memory`"), "💾", "2", "Heap usage progress bar, heap used/total/free/max (MB), CPU count"],
                  [ic("`raisu:threads`"), "🧵", "3", "Active thread count, thread name/state/type/priority table"],
                  [ic("`raisu:plugins`"), "🔌", "4", "Plugin count, name/version/enabled-status table"],
                ]}
              />

              <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-3 mt-7">
                raisu-paper additions
              </p>
              <DocTable
                headers={["Category ID", "Icon", "Priority", "Description"]}
                rows={[
                  [ic("`raisu:performance`"), "📊", "5", "TPS progress bar (1m), TPS 1m/5m/15m, average MSPT"],
                ]}
              />
            </section>

            <section id="ref-platform" className="scroll-mt-20">
              <SectionH2>RaisuPlatform contract</SectionH2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                {ic(
                  "Implementing `RaisuPlatform` is all that's needed for any non-Bukkit environment. All defaults are sensible — only `serverVersion()` is required."
                )}
              </p>
              <CodeBlock lang="java">{`
public interface RaisuPlatform {
    String serverVersion();                        // required
    default String javaVersion()  { ... }          // optional override
    default String platformName() { ... }          // optional override
    default Logger logger()       { ... }          // optional override
    default void logInfo(String msg)    { ... }    // derived from logger()
    default void logWarning(String msg) { ... }    // derived from logger()
}
              `}</CodeBlock>
            </section>

            <section id="ref-versioning" className="scroll-mt-20">
              <SectionH2>Snapshot versioning</SectionH2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                The MessagePack payload includes a{" "}
                <code className="font-mono text-violet-300 bg-violet-500/8 px-1.5 py-0.5 rounded">
                  version
                </code>{" "}
                integer. Payloads produced by older backends have no{" "}
                <code className="font-mono text-zinc-400">version</code> key and
                are treated as version{" "}
                <code className="font-mono text-zinc-400">0</code>.
              </p>
              <DocTable
                headers={["Version", "Status", "Notes"]}
                rows={[
                  [ic("`0` (absent)"), "✓ Supported", "Legacy payloads — no version field in the map"],
                  [ic("`1`"), "✓ Supported", ic("V1 components only — explicit `version: 1`")],
                  [ic("`2`"), "✓ Supported", "V2 layout (COLUMN/ROW/GRID/PANEL) + display (BADGE/STAT/ALERT/…) components"],
                  ["3+", "⚠ Best-effort", "Unknown versions render with a warning banner in the UI"],
                ]}
              />
              <Callout>
                Library consumers do not need to interact with version numbers
                directly. The frontend handles all parsing and version detection
                automatically.
              </Callout>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/*  AI RESOURCES                                                 */}
            {/* ══════════════════════════════════════════════════════════════ */}

            <section id="ai-overview" className="scroll-mt-20">
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-violet-400 uppercase tracking-widest">
                <Bot className="w-3.5 h-3.5" />
                AI Resources
              </div>
              <SectionH2>Library summary for LLMs</SectionH2>
              <div className="flex gap-3 mb-5 px-4 py-3.5 rounded-xl border border-violet-500/20 bg-violet-500/6">
                <Bot className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                <p className="text-violet-200/70 text-sm leading-relaxed">
                  This section provides machine-readable context about the Raisu
                  library for use by language models, code assistants, and
                  automated tooling. The information below is structured for
                  easy parsing.
                </p>
              </div>

              <CodeBlock lang="kotlin">{`
// RAISU — MACHINE-READABLE LIBRARY SUMMARY
// =========================================
// Library: Raisu
// Type: Java/Kotlin library for Minecraft server debug snapshots
// Language: Java 17+ (primary API), Kotlin-friendly
// Repository: JVM — Gradle/Maven

// PURPOSE:
// Raisu lets you capture structured server state as a "snapshot" —
// a collection of named categories, each containing typed data
// components. The snapshot is serialized (MessagePack), encrypted
// (AES-128-CBC), uploaded to a paste service, and shared as a
// compact base64url shortcode. The companion web frontend decrypts
// and renders it entirely in the browser (no server-side rendering).

// INTEGRATION POINTS:
// - PaperRaisu.create(plugin)   → Paper/Spigot plugin entry point
// - SpigotRaisu.create(plugin)  → Spigot/Bukkit entry point
// - Raisu.create(platform)      → Standalone / custom platform
// - raisu.snapshot()            → Collect all registered categories
// - raisu.encode(snap, config)  → Serialize, encrypt, upload → shortcode
// - raisu.register(category)    → Register a static Category
// - raisu.registerProvider(id, () -> category) → Register a dynamic provider

// GRADLE DEPENDENCY (Paper):
// implementation("com.redactado:raisu-paper:1.0.0-SNAPSHOT")

// PASTE PROVIDERS:
// PasteProvider.PASTES_DEV  → https://api.pastes.dev
// PasteProvider.HASTEBIN    → https://hastebin.com

// SHORTCODE FORMAT (base64url):
// byte[0]          = provider ID (0=pastes.dev, 1=hastebin)
// byte[1]          = paste key length
// byte[2..2+kLen]  = paste key (ASCII)
// byte[2+kLen..]   = raw AES-128 key (16 bytes)
              `}</CodeBlock>
            </section>

            <section id="ai-wire" className="scroll-mt-20">
              <SectionH2>Wire format specification</SectionH2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-5">
                The decrypted payload is a MessagePack map. The following
                pseudo-schema describes all known fields.
              </p>

              <CodeBlock lang="kotlin">{`
// PAYLOAD SCHEMA (MessagePack map, pseudo-TypeScript notation)
// ============================================================

interface Payload {
  version: int            // 0 (absent=legacy), 1, 2
  timestamp: long         // Unix epoch ms
  serverVersion: string   // e.g. "Paper 1.21.4"
  javaVersion: string     // e.g. "21.0.3"
  categories: Category[]  // ordered by priority asc
}

interface Category {
  id: string              // e.g. "raisu:system", "my:custom"
  name: string            // Adventure Component JSON or plain string
  icon: string            // emoji character
  priority: int           // lower = appears first
  components: Component[] // ordered array of component objects
}

interface Component {
  type: string            // wire type constant (see below)
  data: object            // type-specific payload (see Component Reference)
}

// CATEGORY NAME FORMATS (Adventure Component JSON):
// Plain string:  "My Category"
// JSON string:   "\"My Category\""
// Object:        {"text": "My Category"}
// Array:         [{"text": "My Category"}]
              `}</CodeBlock>

              <p className="text-zinc-400 text-sm leading-relaxed mt-5 mb-3">
                Shortcode decoding (client-side):
              </p>
              <CodeBlock lang="kotlin">{`
// SHORTCODE DECODE (TypeScript/browser)
function decodeShortcode(shortcode: string): { providerId, pasteKey, aesKey } {
  // 1. base64url → bytes (replace - with +, _ with /)
  // 2. bytes[0]  = provider ID
  // 3. bytes[1]  = paste key byte length (kLen)
  // 4. bytes[2..2+kLen] = UTF-8 paste key
  // 5. bytes[2+kLen..]  = raw 16-byte AES-128 key
}

// DECRYPTION (WebCrypto)
// algorithm: AES-CBC
// key length: 128 bits (16 bytes)
// IV: first 16 bytes of the encrypted blob
// ciphertext: remaining bytes after IV
              `}</CodeBlock>
            </section>

            <section id="ai-components" className="scroll-mt-20">
              <SectionH2>Component type reference</SectionH2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                Complete list of all component wire types and their data shapes.
                Use this as ground truth when generating or parsing Raisu
                snapshot data.
              </p>

              <CodeBlock lang="kotlin">{`
// ── V1 COMPONENT TYPES ───────────────────────────────────────────────────────

KEY_VALUE    { key: string, value: string }
TEXT         { content: string }
TABLE        { headers: string[], rows: string[][] }
LIST         { items: string[] }
PROGRESS_BAR { label: string, current: double, max: double }
GRAPH        { title: string, dataPoints: Map<string, double> }  // ordered map
TREE         { root: TreeNode }
// TreeNode: { label: string, children: TreeNode[] }

// ── V2 SHARED ENUMS ──────────────────────────────────────────────────────────
// All serialized as their .name() string (uppercase).

// Severity: DEFAULT | INFO | SUCCESS | WARNING | ERROR
// Gap:      NONE | SMALL | MEDIUM | LARGE
// Alignment: START | CENTER | END | STRETCH

// ── V2 LAYOUT TYPES ──────────────────────────────────────────────────────────
// Layout containers hold children: Component[]. Nesting is fully supported.
// "children" is the wire field name (NOT "components").

COLUMN { alignment: Alignment, gap: Gap, children: Component[] }
ROW    { alignment: Alignment, gap: Gap, wrap: boolean, children: Component[] }
GRID   { columns: int, gap: Gap, children: Component[] }       // columns: 1..4
PANEL  { title: string, collapsible: boolean, collapsed: boolean, children: Component[] }

// ── V2 DISPLAY TYPES ─────────────────────────────────────────────────────────
// "?" = nullable — packed as msgpack nil when absent.
// Map header size is always fixed (same number of keys regardless of nulls).

BADGE      { text: string, severity: Severity }
STAT       { label: string, value: string, unit: string|nil, trend: double|nil, description: string|nil }
           // trend: positive = up (green), negative = down (red), null = hidden
ALERT      { severity: Severity, title: string|nil, message: string }
CODE_BLOCK { content: string, language: string }
LOG_VIEW   { entries: LogEntry[] }
           // LogEntry: { timestamp: int64 (epoch ms), severity: Severity, message: string }
TIMELINE   { events: TimelineEvent[] }
           // TimelineEvent: { label: string, description: string, timestamp: int64 (epoch ms) }
SPARKLINE  { label: string, values: double[], unit: string|nil }  // oldest → newest
GAUGE      { label: string, current: double, max: double, unit: string|nil }
           // min is always 0; pct = current / max
LINK       { label: string, url: string }
           // http/https URLs are opened in a new tab automatically
IFRAME     { url: string, title: string|nil, height: int|nil }
           // height defaults to 400 px; frame is sandboxed

// ── GAUGE COLOUR THRESHOLDS ───────────────────────────────────────────────────
// pct = current / max
// pct > 0.80 → red   (critical)
// pct > 0.60 → amber (warning)
// else       → violet (normal)

// ── LOG_VIEW SEVERITY COLOURS ─────────────────────────────────────────────────
// ERROR   → red-400
// WARNING → amber-400
// SUCCESS → emerald-400
// INFO    → blue-400
// DEFAULT → zinc-400
              `}</CodeBlock>

              <Callout>
                When generating Raisu category data programmatically (e.g. from
                an LLM), ensure {ic("`type`")} exactly matches one of the
                constants above (uppercase, underscores). Unknown types are
                silently skipped by the frontend renderer.
              </Callout>

              <p className="text-zinc-400 text-sm leading-relaxed mt-5 mb-3">
                Example minimal snapshot (JSON representation of the msgpack):
              </p>
              <CodeBlock lang="kotlin">{`
{
  "version": 2,
  "timestamp": 1700000000000,
  "serverVersion": "Paper 1.21.4",
  "javaVersion": "21.0.3",
  "categories": [
    {
      "id": "my:status",
      "name": "Server Status",
      "icon": "🖥️",
      "priority": 1,
      "components": [
        { "type": "BADGE",  "data": { "text": "Online", "severity": "SUCCESS" } },
        { "type": "STAT",   "data": { "label": "Players", "value": "42", "unit": null, "trend": 3.0, "description": null } },
        { "type": "GAUGE",  "data": { "label": "Heap", "current": 512, "max": 2048, "unit": "MB" } },
        { "type": "ALERT",  "data": { "severity": "WARNING", "title": null, "message": "High GC pressure detected." } }
      ]
    }
  ]
}
              `}</CodeBlock>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                DESIGN GUIDE
            ══════════════════════════════════════════════════════════════════ */}

            <section id="dg-showcase" className="mb-12 scroll-mt-20">
              <SectionH2 id="dg-showcase">Live showcase</SectionH2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-5">
                Open the interactive component showcase to see every V2 component
                rendered with real data. Use it to debug layouts, verify wire format
                correctness, and spot visual regressions.
              </p>
              <a
                href="/debug-example-code"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-violet-500/30 bg-violet-500/8 text-violet-300 text-sm font-medium hover:bg-violet-500/15 hover:border-violet-500/50 transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Open component showcase → /debug-example-code
              </a>
              <p className="text-zinc-600 text-xs mt-3 leading-relaxed">
                The showcase is a static mock snapshot — no shortcode needed. It
                covers all 9 display types, all 4 layout containers, all 5
                severities, and both collapsed and open Panel states.
              </p>
            </section>

            <section id="dg-severity" className="mb-12 scroll-mt-20">
              <SectionH2 id="dg-severity">Severity system</SectionH2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                Five components use the shared {ic("`Severity`")} enum:{" "}
                {ic("`BADGE`")}, {ic("`ALERT`")}, and all log/timeline entries.
                Choose severity based on meaning, not aesthetics.
              </p>
              <DocTable
                headers={["Severity", "Color", "When to use"]}
                rows={[
                  [ic("`DEFAULT`"), "zinc (gray)",    "Neutral info, no urgency"],
                  [ic("`INFO`"),    "blue",            "Informational — something happened"],
                  [ic("`SUCCESS`"), "emerald (green)", "Positive outcome, goal reached"],
                  [ic("`WARNING`"), "amber",           "Potential problem, needs attention"],
                  [ic("`ERROR`"),   "red",             "Something failed, action required"],
                ]}
              />
              <Callout>
                {ic("`SUCCESS`")} and {ic("`ERROR`")} badges render a pulsing
                status dot to draw the eye to live operational state. Use them
                sparingly — if everything is SUCCESS, the signal is lost.
              </Callout>
              <p className="text-zinc-400 text-sm leading-relaxed mt-5 mb-3">
                Severity in code (Java / Kotlin):
              </p>
              <CodeBlock lang="java">{`
// All five severity values
Badge.of("Online",       Severity.SUCCESS)
Badge.of("Degraded",     Severity.WARNING)
Badge.of("Offline",      Severity.ERROR)
Badge.of("Maintenance",  Severity.INFO)
Badge.of("Unknown",      Severity.DEFAULT)

// Alerts also use severity
Alert.of(Severity.ERROR, "OOM Imminent",
    "Heap above 90%. Investigate memory leaks.")

Alert.of(Severity.WARNING,
    "TPS dropped below 18.0 during world save at 14:32.")
              `}</CodeBlock>
            </section>

            <section id="dg-layout" className="mb-12 scroll-mt-20">
              <SectionH2 id="dg-layout">Layout patterns</SectionH2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                Layout components ({ic("`COLUMN`")}, {ic("`ROW`")},{" "}
                {ic("`GRID`")}, {ic("`PANEL`")}) are containers — they hold
                other components recursively. Display components are the leaf
                nodes that show actual data.
              </p>

              <h3 className="text-sm font-semibold text-zinc-200 mt-6 mb-2">
                GRID — side-by-side metrics
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-3">
                Use {ic("`GRID`")} when you have 2–4 comparable stats. Pair
                with {ic("`columns: 2`")} for most dashboards.
              </p>
              <CodeBlock lang="java">{`
Grid.builder(2).gap(Gap.MEDIUM)
    .add(Stat.builder("Players",       String.valueOf(online)).build())
    .add(Stat.builder("TPS",           String.format("%.2f", tps)).build())
    .add(Stat.builder("Loaded chunks", String.valueOf(chunks)).build())
    .add(Stat.builder("Entity count",  String.valueOf(entities)).build())
    .build()
              `}</CodeBlock>

              <h3 className="text-sm font-semibold text-zinc-200 mt-6 mb-2">
                ROW — badge strips
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-3">
                Use {ic("`ROW`")} with {ic("`wrap: true`")} for a horizontal
                strip of badges — server tags, feature flags, active modules.
              </p>
              <CodeBlock lang="java">{`
Row.builder().alignment(Alignment.CENTER).gap(Gap.SMALL).wrap(true)
    .add(Badge.of("Paper 1.21.4", Severity.DEFAULT))
    .add(Badge.of("Java 21",      Severity.INFO))
    .add(Badge.of("Docker",       Severity.INFO))
    .build()
              `}</CodeBlock>

              <h3 className="text-sm font-semibold text-zinc-200 mt-6 mb-2">
                PANEL — grouped sub-sections
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-3">
                Use {ic("`PANEL`")} to group related components under a heading.
                Set {ic("`collapsible: true, collapsed: true`")} for
                secondary details that would clutter the default view.
              </p>
              <CodeBlock lang="java">{`
// Always visible
Panel.builder("Active Worlds")
    .add(Stat.builder("overworld", worldStats("overworld")).build())
    .add(Stat.builder("nether",    worldStats("nether")).build())
    .build()

// Collapsed by default — advanced details
Panel.builder("Advanced GC Stats").collapsible(true).collapsed(true)
    .add(Gauge.builder("Eden",    eden, edenMax).unit("MB").build())
    .add(Gauge.builder("Old gen", old,  oldMax).unit("MB").build())
    .build()
              `}</CodeBlock>

              <Callout type="warn">
                Layout components render their children directly — they inherit
                the category card&apos;s {ic("`divide-y`")} separator between
                siblings. Avoid deeply nesting COLUMN inside COLUMN; prefer a
                flat structure with GRID or ROW.
              </Callout>

              <h3 className="text-sm font-semibold text-zinc-200 mt-6 mb-2">
                Gap &amp; Alignment enums
              </h3>
              <DocTable
                headers={["Enum", "Values"]}
                rows={[
                  [ic("`Gap`"),       ic("`NONE  SMALL  MEDIUM  LARGE`")],
                  [ic("`Alignment`"), ic("`START  CENTER  END  STRETCH`")],
                ]}
              />
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}
