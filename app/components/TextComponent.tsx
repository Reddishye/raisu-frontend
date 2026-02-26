import type { TextData } from "../lib/types";

export function TextComponent({ data }: { data: TextData }) {
  return (
    <p className="text-zinc-300 text-sm leading-relaxed px-3 py-1">
      {data.content}
    </p>
  );
}
