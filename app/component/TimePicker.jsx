import { Clock } from "iconsax-react";
import { useState } from "react";

export default function CustomTimePicker({ value, onChange, disabled = false, placeholder = "Pilih waktu" }) {
  const [showPicker, setShowPicker] = useState(false);

  const togglePicker = () => {
    if (!disabled) setShowPicker((prev) => !prev);
  };

  return (
    <div className="relative">
      <div
        onClick={togglePicker}
        className={`flex justify-between items-center px-3 py-2 border rounded-md text-sm w-full ${
          disabled ? "bg-gray-200 text-black" : "bg-white border-gray-300"
        }`}
      >
        <span>{value || placeholder}</span>
        <Clock size="20" variant="Bold" color="currentColor" />
      </div>

      {showPicker && !disabled && (
        <input
          type="time"
          className="absolute top-full left-0 mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm z-30"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setShowPicker(false);
          }}
        />
      )}
    </div>
  );
}
