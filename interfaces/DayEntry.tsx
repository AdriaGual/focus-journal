export interface DayEntry {
  productivity: number;
  mood: number;
  day: number;
  agenda: Record<string, { text: string; checked: boolean }>;
  grateful: string[];
  learned: string;
  not_good: string;
  quote: { text: string; author: string };
}

export type DayItem = {
  date: string;
  dayInfo: DayEntry;
};
