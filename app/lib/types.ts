export interface Snapshot {
  timestamp: number;
  serverVersion: string;
  javaVersion: string;
  categories: Category[];
}

export interface Category {
  id: string;
  name: string; // Adventure Component JSON
  icon: string;
  priority: number;
  components: RaisuComponent[];
}

export interface RaisuComponent {
  type: string;
  data: ComponentData;
}

export type ComponentData =
  | KeyValueData
  | TextData
  | TableData
  | ListData
  | ProgressBarData
  | GraphData
  | TreeData;

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
