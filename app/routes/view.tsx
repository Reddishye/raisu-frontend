import { useEffect, useState } from "react";
import type { Route } from "./+types/view";
import type { Snapshot } from "../lib/types";
import { loadSnapshot } from "../lib/raisu";
import { CategoryCard } from "../components/CategoryCard";

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
    timeStyle: "medium",
  });
}

export default function ViewPage() {
  const [state, setState] = useState<LoadState>({ status: "idle" });

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) {
      setState({ status: "idle" });
      return;
    }

    setState({ status: "loading" });

    loadSnapshot(hash)
      .then((snapshot) => setState({ status: "success", snapshot }))
      .catch((err) =>
        setState({
          status: "error",
          message: err instanceof Error ? err.message : String(err),
        })
      );
  }, []);

  if (state.status === "idle") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-zinc-500 text-sm">No shortcode provided in URL fragment.</p>
      </div>
    );
  }

  if (state.status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center gap-3">
        <div className="w-4 h-4 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
        <p className="text-zinc-400 text-sm">Loading snapshot…</p>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full rounded-xl border border-red-900 bg-red-950/30 p-6 space-y-2">
          <p className="text-red-400 font-semibold">Failed to load snapshot</p>
          <p className="text-red-300/70 text-sm font-mono break-all">{state.message}</p>
        </div>
      </div>
    );
  }

  const { snapshot } = state;
  const sorted = [...snapshot.categories].sort((a, b) => a.priority - b.priority);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-lg tracking-tight text-white">Raisu</span>
            <span className="hidden sm:block text-zinc-600">|</span>
            <span className="hidden sm:block text-zinc-400 text-sm">{snapshot.serverVersion}</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-zinc-500">
            <span>Java {snapshot.javaVersion}</span>
            <span>{formatDate(snapshot.timestamp)}</span>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Meta strip */}
        <div className="flex flex-wrap gap-3 text-sm">
          <Chip label="Server" value={snapshot.serverVersion} />
          <Chip label="Java" value={snapshot.javaVersion} />
          <Chip label="Captured" value={formatDate(snapshot.timestamp)} />
          <Chip label="Categories" value={String(sorted.length)} />
        </div>

        {/* Categories */}
        <div className="grid gap-5">
          {sorted.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </main>
    </div>
  );
}

function Chip({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1.5">
      <span className="text-zinc-500 text-xs">{label}</span>
      <span className="text-zinc-200 font-mono text-xs">{value}</span>
    </div>
  );
}
