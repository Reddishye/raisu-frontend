import type { Category } from "../lib/types";
import { parseCategoryName } from "../lib/raisu";
import { ComponentRenderer } from "./ComponentRenderer";

export function CategoryCard({ category }: { category: Category }) {
  const name = parseCategoryName(category.name);

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
      <header className="flex items-center gap-2.5 px-4 py-3 border-b border-zinc-800 bg-zinc-900">
        <span className="text-xl leading-none" aria-hidden>
          {category.icon}
        </span>
        <h2 className="text-zinc-100 font-semibold text-base">{name}</h2>
      </header>
      <div className="py-2 divide-y divide-zinc-800/40">
        {category.components.map((c, i) => (
          <div key={i} className="py-1">
            <ComponentRenderer component={c} />
          </div>
        ))}
      </div>
    </section>
  );
}
