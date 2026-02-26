import type { RaisuComponent } from "../lib/types";
import { KeyValue } from "./KeyValue";
import { TextComponent } from "./TextComponent";
import { TableComponent } from "./TableComponent";
import { ListComponent } from "./ListComponent";
import { ProgressBar } from "./ProgressBar";
import { GraphComponent } from "./GraphComponent";
import { TreeComponent } from "./TreeComponent";

export function ComponentRenderer({ component }: { component: RaisuComponent }) {
  const { type, data } = component;

  switch (type) {
    case "KEY_VALUE":
      return <KeyValue data={data as any} />;
    case "TEXT":
      return <TextComponent data={data as any} />;
    case "TABLE":
      return <TableComponent data={data as any} />;
    case "LIST":
      return <ListComponent data={data as any} />;
    case "PROGRESS_BAR":
      return <ProgressBar data={data as any} />;
    case "GRAPH":
      return <GraphComponent data={data as any} />;
    case "TREE":
      return <TreeComponent data={data as any} />;
    default:
      return null; // skip unknown types gracefully
  }
}
