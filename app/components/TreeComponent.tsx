import type { TreeNode } from "../lib/types";

function Node({ node, depth }: { node: TreeNode; depth: number }) {
  const isLeaf = node.children.length === 0;
  return (
    <div>
      <div
        className="flex items-center gap-1.5 py-0.5 hover:bg-white/5 rounded transition-colors"
        style={{ paddingLeft: `${depth * 16 + 12}px` }}
      >
        <span className="text-zinc-600 text-xs select-none">
          {isLeaf ? "─" : "▾"}
        </span>
        <span className="text-zinc-200 text-sm font-mono">{node.label}</span>
      </div>
      {node.children.map((child, i) => (
        <Node key={i} node={child} depth={depth + 1} />
      ))}
    </div>
  );
}

import type { TreeData } from "../lib/types";

export function TreeComponent({ data }: { data: TreeData }) {
  return (
    <div className="py-1">
      <Node node={data.root} depth={0} />
    </div>
  );
}
