export interface Widget {
  id: string;
  type: string; // e.g., "weather", "calendar"
  cols: number;
  rows: number;
  x: number;
  y: number;
  config?: any; // user-specific config
}
