import { memo } from "react";
import type { Category } from "../lib/types";
import { parseCategoryName } from "../lib/raisu";
import { ComponentRenderer } from "./ComponentRenderer";
import { CategoryIcon } from "./CategoryIcon";

export const CategoryCard = memo(function CategoryCard({
  category,
}: {
  category: Category;
}) {
  const name = parseCategoryName(category.name);

  return (
    <section className="rounded-2xl border border-zinc-800/60 bg-zinc-900/30 overflow-hidden">
      {/* Card header */}
      <header className="flex items-center gap-3 px-5 py-4 border-b border-zinc-800/50 bg-zinc-900/50">
        <span className="w-7 h-7 rounded-lg bg-violet-500/10 border border-violet-500/15 flex items-center justify-center text-violet-400 shrink-0">
          <CategoryIcon icon={category.icon} className="w-3.5 h-3.5" />
        </span>
        <h2 className="text-zinc-100 font-semibold text-sm tracking-tight">
          {name}
        </h2>
        <span className="ml-auto text-[10px] font-mono text-zinc-700">
          {category.components.length}{" "}
          {category.components.length === 1 ? "item" : "items"}
        </span>
      </header>

      {/* Components */}
      <div className="divide-y divide-zinc-800/30">
        {category.components.map((c, i) => (
          <ComponentRenderer key={i} component={c} />
        ))}
      </div>
    </section>
  );
});
