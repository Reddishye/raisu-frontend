import { useEffect, useRef, useState, useMemo, memo } from "react";
import type { Route } from "./+types/view";
import type { Snapshot, Category } from "../lib/types";
import { loadSnapshot, parseCategoryName } from "../lib/raisu";
import { CategoryCard } from "../components/CategoryCard";
import { CategoryIcon } from "../components/CategoryIcon";
import {
  ArrowLeft,
  Calendar,
  Coffee,
  ServerCrash,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Raisu — Snapshot Viewer" },
    { name: "description", content: "View a Raisu server debug snapshot." },
  ];
}

type LoadState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; snapshot: Snapshot }
  | { status: "error"; message: string };

function formatDate(ms: number) {
  return new Date(ms).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

// ── Idle / Loading / Error screens ──────────────────────────────────────────

function IdleScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
      <ServerCrash className="w-10 h-10 text-zinc-700" />
      <div>
        <p className="text-zinc-300 font-medium">No shortcode provided</p>
        <p className="text-zinc-600 text-sm mt-1">
          Add a shortcode to the URL fragment:{" "}
          <code className="font-mono text-zinc-500">/view#&lt;shortcode&gt;</code>
        </p>
      </div>
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors mt-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to home
      </Link>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3">
      <Loader2 className="w-6 h-6 text-violet-400 animate-spin" />
      <p className="text-zinc-400 text-sm">Decrypting snapshot…</p>
    </div>
  );
}

function ErrorScreen({ message }: { message: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 gap-4">
      <div className="max-w-md w-full rounded-2xl border border-red-900/60 bg-red-950/20 p-6 space-y-3">
        <div className="flex items-center gap-2 text-red-400 font-semibold">
          <ServerCrash className="w-5 h-5" />
          Failed to load snapshot
        </div>
        <p className="text-red-300/60 text-sm font-mono break-all leading-relaxed">
          {message}
        </p>
      </div>
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to home
      </Link>
    </div>
  );
}

// ── Sidebar ──────────────────────────────────────────────────────────────────

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
        Categories
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

// ── Main view ────────────────────────────────────────────────────────────────

export default function ViewPage() {
  const [state, setState] = useState<LoadState>({ status: "idle" });
  const [activeId, setActiveId] = useState<string>("");
  const mainRef = useRef<HTMLDivElement>(null);

  // Load snapshot from URL hash
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) { setState({ status: "idle" }); return; }
    setState({ status: "loading" });
    loadSnapshot(hash)
      .then((snapshot) => setState({ status: "success", snapshot }))
      .catch((err) => setState({ status: "error", message: err instanceof Error ? err.message : String(err) }));
  }, []);

  const sorted = useMemo(() => {
    if (state.status !== "success") return [];
    return [...state.snapshot.categories].sort((a, b) => a.priority - b.priority);
  }, [state]);

  // Set initial active category
  useEffect(() => {
    if (state.status === "success" && !activeId) {
      setActiveId(sorted[0]?.id ?? "");
    }
  }, [state.status]);

  // IntersectionObserver — track which category is in view
  useEffect(() => {
    if (state.status !== "success" || !mainRef.current) return;
    const root = mainRef.current;
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
  }, [state.status, sorted]);

  // Scroll to a category section
  function scrollTo(id: string) {
    const el = mainRef.current?.querySelector(`[data-cat-id="${id}"]`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (state.status === "idle") return <IdleScreen />;
  if (state.status === "loading") return <LoadingScreen />;
  if (state.status === "error") return <ErrorScreen message={state.message} />;

  const { snapshot } = state;

  return (
    <div className="h-screen flex flex-col bg-zinc-950 text-zinc-100 overflow-hidden">
      {/* ── Header ── */}
      <header className="shrink-0 border-b border-zinc-800/60 bg-zinc-950/90 backdrop-blur-sm z-20">
        <div className="flex items-center gap-3 px-4 h-13 min-w-0">
          <Link to="/" className="text-zinc-600 hover:text-zinc-300 transition-colors shrink-0" aria-label="Back">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <span className="font-bold text-sm tracking-tight text-white shrink-0">Raisu</span>
          <span className="text-zinc-800 hidden sm:block shrink-0">|</span>
          <span className="hidden sm:block text-zinc-400 text-sm font-mono truncate min-w-0">
            {snapshot.serverVersion}
          </span>

          <div className="flex-1" />

          <div className="flex items-center gap-2 text-xs text-zinc-500 shrink-0">
            <div className="hidden sm:flex items-center gap-1.5">
              <Coffee className="w-3 h-3" />
              <span className="font-mono">Java {snapshot.javaVersion}</span>
            </div>
            <div className="hidden sm:block w-px h-3.5 bg-zinc-800" />
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3" />
              <span className="font-mono hidden xs:block">{formatDate(snapshot.timestamp)}</span>
            </div>
            <div className="hidden sm:block w-px h-3.5 bg-zinc-800" />
            <span className="font-mono text-zinc-600 hidden sm:block">
              {sorted.length} categories
            </span>
          </div>
        </div>
      </header>

      {/* ── Unknown version warning ── */}
      {snapshot.version > 2 && (
        <div className="shrink-0 flex items-center gap-2.5 px-4 py-2 bg-amber-500/8 border-b border-amber-500/20 text-amber-300 text-xs">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
          This snapshot was produced by a newer version of Raisu (v{snapshot.version}).
          Some data may not display correctly.
        </div>
      )}

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* ── Sidebar (md+) ── */}
        <aside className="sidebar-w shrink-0 border-r border-zinc-800/50 overflow-y-auto bg-zinc-950 hidden md:block">
          <Sidebar categories={sorted} activeId={activeId} onSelect={scrollTo} />
        </aside>

        {/* ── Main scroll area ── */}
        <main
          ref={mainRef}
          className="flex-1 overflow-y-auto scroll-smooth"
        >
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

      {/* ── Mobile bottom tab bar ── */}
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
