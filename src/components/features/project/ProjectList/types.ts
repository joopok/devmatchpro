export interface ProjectListProps {
  onProjectSelect?: (projectId: string) => void;
}

export interface Column<T> {
  id: string;
  header: string;
  cell: (item: T) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
} 