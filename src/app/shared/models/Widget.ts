export interface Widget {
    id: string;
    type: string; // e.g., "weather", "calendar"
    cols: number;
    rows: number;
    x: number;
    y: number;
    config?: any; // user-specific config
}

export interface WidgetUserTask {
    id: number;
    title: string;
    status: 'To Do' | 'In Progress' | 'Completed';
}
