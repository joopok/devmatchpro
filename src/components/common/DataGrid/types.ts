export interface Column<T> {
  key: keyof T;
  title: string;
  header?: string;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
} 