import { useNavigate, Link } from "react-router";
import { useState, useEffect, useRef } from "react";
import type { Route } from "./+types/home";
import { ArrowRight, Shield, Zap, Layers, Lock, BookOpen } from "lucide-react";
import { RaisuLogo } from "../components/RaisuLogo";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Raisu — Snapshot Viewer" },
    {
      name: "description",
      content:
        "View encrypted Minecraft server debug snapshots instantly in your browser.",
    },
  ];
}

export default function Home() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  const navRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLBlockquoteElement>(null);

  useEffect(() => {
    let ctx: { revert?: () => void } = {};
    import("gsap").then(({ gsap }) => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(
          navRef.current,
          { opacity: 0, y: -16 },
          { opacity: 1, y: 0, duration: 0.5 }
        )
          .fromTo(
            badgeRef.current,
            { opacity: 0, scale: 0.9, y: 12 },
            { opacity: 1, scale: 1, y: 0, duration: 0.5 },
            "-=0.15"
          )
          .fromTo(
            headlineRef.current,
            { opacity: 0, y: 32 },
            { opacity: 1, y: 0, duration: 0.7 },
            "-=0.3"
          )
          .fromTo(
            subRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6 },
            "-=0.4"
          )
          .fromTo(
            formRef.current,
            { opacity: 0, y: 16, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: 0.55 },
            "-=0.35"
          );

        if (cardsRef.current) {
          tl.fromTo(
            Array.from(cardsRef.current.children),
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
            "-=0.2"
          );
        }

        if (quoteRef.current) {
          tl.fromTo(
            quoteRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6 },
            "-=0.1"
          );
        }
      });
    });

    return () => ctx.revert?.();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const code = input.trim();
    if (!code) return;
    navigate(`/view#${code}`);
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col relative overflow-hidden">
      {/* Ambient background blobs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute -top-64 left-1/2 -translate-x-1/2 w-225 h-175 rounded-full opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-150 h-125 rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(99,102,241,0.1) 0%, transparent 70%)",
          }}
        />
        {/* Grid */}
        <div className="absolute inset-0 bg-grid opacity-100" />
      </div>

      {/* Nav */}
      <header
        ref={navRef}
        className="relative z-10 border-b border-zinc-800/50 px-6 py-4 flex items-center justify-between"
        style={{ backdropFilter: "blur(12px)", background: "rgba(9,9,11,0.7)" }}
      >
        <div className="flex items-center gap-3">
          <RaisuLogo iconSize={26} wordmark />
          <span className="text-[10px] font-mono text-zinc-600 border border-zinc-800 rounded px-1.5 py-0.5 hidden sm:block">
            snapshot viewer
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/docs"
            className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 transition-colors text-xs"
          >
            <BookOpen className="w-3 h-3" />
            Docs
          </Link>
          <div className="flex items-center gap-1.5 text-zinc-700 text-xs">
            <Lock className="w-3 h-3" />
            <span>client-side only</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pt-8 pb-16 text-center">
        <div className="max-w-3xl w-full space-y-8">
          {/* Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 text-xs text-violet-300 border border-violet-500/25 bg-violet-500/8 rounded-full px-3.5 py-1.5 font-medium"
          >
            <Zap className="w-3 h-3" />
            Instant · Encrypted · In-browser
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="text-5xl sm:text-[4.5rem] font-black tracking-tighter leading-[0.92] text-white"
          >
            Server debug,{" "}
            <span className="text-gradient">decoded instantly.</span>
          </h1>

          {/* Sub */}
          <p
            ref={subRef}
            className="text-zinc-400 text-lg sm:text-xl leading-relaxed max-w-lg mx-auto"
          >
            Paste a Raisu shortcode and get a fully rendered, decrypted snapshot
            of your Minecraft server — right in the browser.
          </p>

          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto w-full"
          >
            <div className="flex gap-0 p-1.5 rounded-2xl border border-zinc-800/80 bg-zinc-900/60 focus-within:border-violet-500/40 focus-within:bg-zinc-900/80 transition-all duration-300">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste shortcode…"
                spellCheck={false}
                autoComplete="off"
                className="flex-1 bg-transparent px-4 py-2.5 text-sm font-mono text-zinc-100 placeholder-zinc-600 outline-none"
              />
              <button
                type="submit"
                className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 active:scale-95 text-white text-sm font-semibold rounded-xl px-5 py-2.5 transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/25 shrink-0"
              >
                View
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <p className="text-zinc-700 text-xs mt-2.5 text-left pl-1">
              Or navigate directly to{" "}
              <code className="text-zinc-600 font-mono">/view#&lt;shortcode&gt;</code>
            </p>
          </form>
        </div>

        {/* Steps */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl w-full mt-20"
        >
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="group rounded-2xl border border-zinc-800/60 bg-zinc-900/30 p-5 space-y-3.5 text-left hover:border-zinc-700/80 hover:bg-zinc-900/50 transition-all duration-300 cursor-default"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:bg-violet-500/15 group-hover:border-violet-500/30 transition-all">
                  <step.Icon className="w-4 h-4" />
                </div>
                <span className="text-zinc-700 text-xs font-mono">
                  0{step.n}
                </span>
              </div>
              <div>
                <div className="text-zinc-100 text-sm font-semibold mb-1">
                  {step.title}
                </div>
                <div className="text-zinc-500 text-xs leading-relaxed">
                  {step.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Citation */}
        <blockquote
          ref={quoteRef}
          className="mt-20 max-w-xl mx-auto w-full text-left border-l-2 border-violet-500/40 pl-5 space-y-3"
        >
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-medium italic">
            "plz use my lib tysm. this frontend was vibecoded in the best way possible fyk. contributions are welcome and appreciated"
          </p>
          <footer className="flex items-center gap-3">
            <span className="w-5 h-px bg-zinc-700" />
            <cite className="not-italic text-xs text-zinc-500 font-medium">
              reddishye <span className="text-zinc-700 mx-1">·</span> the stupid developer of Raisu
            </cite>
          </footer>
        </blockquote>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-zinc-900 py-5 text-center">
        <span className="inline-flex items-center gap-1.5 text-zinc-700 text-xs">
          <Shield className="w-3 h-3" />
          All decryption happens locally. Nothing is sent anywhere.
        </span>
      </footer>
    </div>
  );
}

const STEPS = [
  {
    n: 1,
    title: "Decode shortcode",
    Icon: Layers,
    desc: "Extracts the provider, paste key, and 128-bit AES key from the compact base64url string.",
  },
  {
    n: 2,
    title: "Fetch & decrypt",
    Icon: Shield,
    desc: "Retrieves the encrypted payload from Pastes.dev or Hastebin and decrypts it with AES-128-CBC.",
  },
  {
    n: 3,
    title: "Render snapshot",
    Icon: Zap,
    desc: "Deserializes the MessagePack binary and renders every category and component.",
  },
];
