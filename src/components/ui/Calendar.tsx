"use client";

import { DayPicker } from "react-day-picker";

interface CalendarProps {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}

export default function Calendar({ selected, onSelect }: CalendarProps) {
  return (
    <div className="flex justify-center mt-4">
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={onSelect}
        showOutsideDays
        disabled={{ before: new Date() }}
        classNames={{
          root: "w-full",
          months: "w-full",
          month: "w-full",
          month_caption: "flex items-center justify-between px-1 mb-3",
          caption_label: "text-sm font-medium text-gray-800",
          nav: "flex items-center gap-1",
          button_previous:
            "p-1.5 rounded-md border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors",
          button_next:
            "p-1.5 rounded-md border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors",
          month_grid: "w-full border-collapse",
          weekdays: "grid grid-cols-7 mb-1",
          weekday: "text-xs text-gray-400 text-center py-1 font-normal",
          weeks: "w-full",
          week: "grid grid-cols-7",
          day: "aspect-square flex items-center justify-center",
          day_button:
            "w-9 h-9 text-sm rounded-lg transition-all hover:bg-blue-50 hover:text-blue-600 border border-transparent focus:outline-none",
          selected:
            "[&>button]:bg-blue-600 [&>button]:text-white [&>button]:border-blue-600 [&>button]:font-medium [&>button]:hover:bg-blue-600 [&>button]:hover:text-white",
          today:
            "[&>button]:border-blue-500 [&>button]:text-blue-600 [&>button]:font-medium",
          outside: "[&>button]:text-gray-300",
          disabled:
            "[&>button]:text-gray-300 [&>button]:cursor-not-allowed [&>button]:hover:bg-transparent [&>button]:hover:text-gray-300",
        }}
      />
    </div>
  );
}
