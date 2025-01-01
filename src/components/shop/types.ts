export interface FilterState {
  search: string;
  category: string;
  minPrice: string;
  maxPrice: string;
}

export interface FilterChangeHandler {
  (filters: Partial<FilterState>): void;
}