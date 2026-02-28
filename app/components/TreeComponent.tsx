import { memo } from "react";
import { ChevronRight, Minus } from "lucide-react";
import type { TreeNode, TreeData } from "../lib/types";

const Node = memo(function Node({
  node,
  depth,
}: {
  node: TreeNode;
  depth: number;
}) {
  const isLeaf = node.children.length === 0;
  return (
    <div>
      <div
        className="flex items-center gap-1.5 py-0.75 hover:bg-white/3 rounded transition-colors group"
        style={{ paddingLeft: `${depth * 14 + 20}px`, paddingRight: "20px" }}
      >
        <span className="text-zinc-700 group-hover:text-zinc-600 transition-colors shrink-0">
          {isLeaf ? (
            <Minus className="w-2.5 h-2.5" />
          ) : (
            <ChevronRight className="w-2.5 h-2.5 text-violet-600" />
          )}
        </span>
        <span className="text-zinc-300 text-xs font-mono group-hover:text-zinc-200 transition-colors">
          {node.label}
        </span>
      </div>
      {node.children.map((child, i) => (
        <Node key={i} node={child} depth={depth + 1} />
      ))}
    </div>
  );
});

export const TreeComponent = memo(function TreeComponent({
  data,
}: {
  data: TreeData;
}) {
  return (
    <div className="py-2">
      <Node node={data.root} depth={0} />
    </div>
  );
});
