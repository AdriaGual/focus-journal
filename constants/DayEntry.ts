import { DayEntry } from "@/interfaces/DayEntry";

export const defaultDayEntry: DayEntry = {
    productivity: 0,
    mood: 0,
    day: 0,
    agenda: {},
    grateful: ["", ""],
    learned: "",
    not_good: "",
    quote: { text: "", author: "" },
  }