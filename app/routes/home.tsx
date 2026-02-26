import { useNavigate } from "react-router";
import { useState } from "react";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Raisu — Snapshot Viewer" },
    { name: "description", content: "View encrypted Minecraft server debug snapshots." },
  ];
}

export default function Home() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const code = input.trim();
    if (!code) return;
    navigate(`/view#${code}`);
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      {/* Nav */}
      <header className="border-b border-zinc-800/60 px-6 py-4 flex items-center gap-3">
        <span className="font-bold text-lg tracking-tight">Raisu</span>
        <span className="text-zinc-600 text-xs border border-zinc-800 rounded px-1.5 py-0.5">
          Snapshot Viewer
        </span>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center space-y-10">
        <div className="space-y-4 max-w-lg">
          <h1 className="text-4xl font-bold tracking-tight">
            Server debug,{" "}
            <span className="text-indigo-400">instantly decoded.</span>
          </h1>
          <p className="text-zinc-400 text-base leading-relaxed">
            Paste a Raisu shortcode below to decrypt, deserialize, and render
            your Minecraft server snapshot — entirely in the browser.
          </p>
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste shortcode…"
              spellCheck={false}
              className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm font-mono text-zinc-100 placeholder-zinc-600 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-sm font-medium rounded-lg px-5 py-2.5 transition-colors"
            >
              View
            </button>
          </div>
          <p className="text-zinc-600 text-xs">
            Or navigate directly to{" "}
            <code className="text-zinc-500">/view#&lt;shortcode&gt;</code>
          </p>
        </form>

        {/* How it works */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full text-left">
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 space-y-1.5"
            >
              <div className="text-indigo-400 text-xs font-mono">0{step.n}</div>
              <div className="text-zinc-100 text-sm font-semibold">{step.title}</div>
              <div className="text-zinc-500 text-xs leading-relaxed">{step.desc}</div>
            </div>
          ))}
        </div>
      </main>

      <footer className="text-center py-6 text-zinc-700 text-xs">
        All decryption happens locally in your browser. Nothing is sent anywhere.
      </footer>
    </div>
  );
}

const STEPS = [
  {
    n: 1,
    title: "Decode shortcode",
    desc: "Extracts the provider, paste key, and 128-bit AES key from the compact base64url string.",
  },
  {
    n: 2,
    title: "Fetch & decrypt",
    desc: "Retrieves the encrypted payload from Pastes.dev or Hastebin and decrypts it with AES-128-CBC.",
  },
  {
    n: 3,
    title: "Render snapshot",
    desc: "Deserializes the MessagePack binary and renders every category and component.",
  },
];
