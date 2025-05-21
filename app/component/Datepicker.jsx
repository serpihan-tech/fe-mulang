import { useState } from "react";
import { Calendar } from "iconsax-react";
import CalendarDropdown from "./CalendarDropdown";

// Fungsi format manual ke dd-mm-yyyy
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export default function CustomDatePicker({ value, onChange, customFilterdateStyle, placeholder="Pilih tanggal", disabled = false}) {
  const [showCalendar, setShowCalendar] = useState(false);

  const toggleCalendar = () => {
    if (!disabled) {
      setShowCalendar((prev) => !prev);
    }
  };

  return (
    <div className="relative">
      <div
        className={`${customFilterdateStyle} ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
        onClick={toggleCalendar}
      >
        <span className="text-sm ">
          {value ? formatDate(new Date(value)) : placeholder}
        </span>
        <Calendar size="20" variant="Bold" color="currentColor" />
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
