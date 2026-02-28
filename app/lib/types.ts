export interface Snapshot {
  /** 0 = legacy, 1 = V1, 2 = V2. Higher = unknown, render best-effort. */
  version: number;
  timestamp: number;
  serverVersion: string;
  javaVersion: string;
  categories: Category[];
}

export interface Category {
  id: string;
  name: string; // Adventure Component JSON
  icon: string; // emoji or ":lucide:iconName"
  priority: number;
  components: RaisuComponent[];
}

export interface RaisuComponent {
  type: string;
  data: ComponentData;
}

// ── V1 Component Data Types ──────────────────────────────────────────────────

export interface KeyValueData {
  key: string;
  value: string;
}

export interface TextData {
  content: string;
}

export interface TableData {
  headers: string[];
  rows: string[][];
}

export interface ListData {
  items: string[];
}

export interface ProgressBarData {
  label: string;
  current: number;
  max: number;
}

export interface GraphData {
  title: string;
  dataPoints: Record<string, number>;
}

export interface TreeNode {
  label: string;
  children: TreeNode[];
}

export interface TreeData {
  root: TreeNode;
}

// ── V2 Shared Enum Strings ───────────────────────────────────────────────────
// Serialized as their .name() string in the wire format.

/** "DEFAULT" | "INFO" | "SUCCESS" | "WARNING" | "ERROR" */
export type Severity = string;

/** "NONE" | "SMALL" | "MEDIUM" | "LARGE" */
export type Gap = string;

/** "START" | "CENTER" | "END" | "STRETCH" */
export type Alignment = string;

// ── V2 Layout Component Data Types ───────────────────────────────────────────

export interface ColumnData {
  alignment: Alignment;
  gap: Gap;
  children: RaisuComponent[];
}

export interface RowData {
  alignment: Alignment;
  gap: Gap;
  wrap: boolean;
  children: RaisuComponent[];
}

export interface GridData {
  columns: number;
  gap: Gap;
  children: RaisuComponent[];
}

export interface PanelData {
  title: string;
  collapsible: boolean;
  collapsed: boolean;
  children: RaisuComponent[];
}

// ── V2 Display Component Data Types ──────────────────────────────────────────

export interface BadgeData {
  text: string;
  severity: Severity;
}

export interface StatData {
  label: string;
  value: string;
  unit?: string;
  /** Numeric trend: positive = up (good), negative = down (bad), null = neutral */
  trend?: number;
  description?: string;
}

export interface AlertData {
  severity: Severity;
  title?: string;
  message: string;
}

export interface CodeBlockData {
  content: string;
  language: string;
}

export interface LogEntry {
  timestamp: number; // epoch ms
  severity: Severity;
  message: string;
}

export interface LogViewData {
  entries: LogEntry[];
}

export interface TimelineEvent {
  label: string;
  description: string;
  timestamp: number; // epoch ms
}

export interface TimelineData {
  events: TimelineEvent[];
}

export interface SparklineData {
  label: string;
  values: number[];
  unit?: string;
}

export interface GaugeData {
  label: string;
  current: number;
  max: number;
  unit?: string;
}

export interface LinkData {
  label: string;
  url: string;
}

// ── Union type ────────────────────────────────────────────────────────────────

export type ComponentData =
  // V1
  | KeyValueData
  | TextData
  | TableData
  | ListData
  | ProgressBarData
  | GraphData
  | TreeData
  // V2 layout
  | ColumnData
  | RowData
  | GridData
  | PanelData
  // V2 display
  | BadgeData
  | StatData
  | AlertData
  | CodeBlockData
  | LogViewData
  | TimelineData
  | SparklineData
  | GaugeData
  | LinkData;
