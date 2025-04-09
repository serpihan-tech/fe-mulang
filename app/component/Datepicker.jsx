import { useState } from "react";
import { Calendar } from "iconsax-react";
import CalendarDropdown from "./CalendarDropdown";

export default function CustomDatePicker({ value, onChange }) {
  const [showCalendar, setShowCalendar] = useState(false);

  const toggleCalendar = () => setShowCalendar((prev) => !prev);

  return (
    <div className="relative">
      <div
        className="flex items-center justify-between border border-blue-500 rounded-lg px-4 py-2 cursor-pointer min-w-[180px]"
        onClick={toggleCalendar}
      >
        <span className="text-sm text-black">
          {value ? value.toLocaleDateString("id-ID") : "Pilih tanggal"}
        </span>
        <Calendar size="20" variant="Outline" />
      </div>

      {showCalendar && (
        <div className="absolute z-10 mt-2 bg-white rounded-xl shadow-lg">
          <CalendarDropdown
            selectedDate={value}
            onSelect={(date) => {
              onChange(date);
              setShowCalendar(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
