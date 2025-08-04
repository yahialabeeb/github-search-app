export interface Page<T> {
  items: T[];
  incomplete_results: boolean;
  total_count: number;
}
