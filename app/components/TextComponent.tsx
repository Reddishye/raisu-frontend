import { memo } from "react";
import type { TextData } from "../lib/types";

export const TextComponent = memo(function TextComponent({
  data,
}: {
  data: TextData;
}) {
  return (
    <p className="text-zinc-400 text-sm leading-relaxed px-5 py-2.5">
      {data.content}
    </p>
  );
});
