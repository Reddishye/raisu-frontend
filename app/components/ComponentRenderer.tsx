import type { RaisuComponent } from "../lib/types";
// V1 components
import { KeyValue } from "./KeyValue";
import { TextComponent } from "./TextComponent";
import { TableComponent } from "./TableComponent";
import { ListComponent } from "./ListComponent";
import { ProgressBar } from "./ProgressBar";
import { GraphComponent } from "./GraphComponent";
import { TreeComponent } from "./TreeComponent";
// V2 layout components
import { ColumnComponent } from "./ColumnComponent";
import { RowComponent } from "./RowComponent";
import { GridComponent } from "./GridComponent";
import { PanelComponent } from "./PanelComponent";
// V2 display components
import { BadgeComponent } from "./BadgeComponent";
import { StatComponent } from "./StatComponent";
import { AlertComponent } from "./AlertComponent";
import { CodeBlockComponent } from "./CodeBlockComponent";
import { LogViewComponent } from "./LogViewComponent";
import { TimelineComponent } from "./TimelineComponent";
import { SparklineComponent } from "./SparklineComponent";
import { GaugeComponent } from "./GaugeComponent";
import { LinkComponent } from "./LinkComponent";
import { IframeComponent } from "./IframeComponent";

export function ComponentRenderer({ component }: { component: RaisuComponent }) {
  const { type, data } = component;

  switch (type) {
    // ── V1 ────────────────────────────────────────────────────────────────────
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
    // ── V2 Layout ─────────────────────────────────────────────────────────────
    case "COLUMN":
      return <ColumnComponent data={data as any} />;
    case "ROW":
      return <RowComponent data={data as any} />;
    case "GRID":
      return <GridComponent data={data as any} />;
    case "PANEL":
      return <PanelComponent data={data as any} />;
    // ── V2 Display ────────────────────────────────────────────────────────────
    case "BADGE":
      return <BadgeComponent data={data as any} />;
    case "STAT":
      return <StatComponent data={data as any} />;
    case "ALERT":
      return <AlertComponent data={data as any} />;
    case "CODE_BLOCK":
      return <CodeBlockComponent data={data as any} />;
    case "LOG_VIEW":
      return <LogViewComponent data={data as any} />;
    case "TIMELINE":
      return <TimelineComponent data={data as any} />;
    case "SPARKLINE":
      return <SparklineComponent data={data as any} />;
    case "GAUGE":
      return <GaugeComponent data={data as any} />;
    case "LINK":
      return <LinkComponent data={data as any} />;
    case "IFRAME":
      return <IframeComponent data={data as any} />;
    default:
      return null; // skip unknown types gracefully
  }
}
