"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface CalendarProps {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}

export default function Calendar({ selected, onSelect }: CalendarProps) {
  return (
    <div className="card">
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={onSelect}
        showOutsideDays
        className="mx-auto"
      />
    </div>
  );
}
