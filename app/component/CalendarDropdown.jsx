import { useState } from "react";
import { format } from "date-fns";

export default function CalendarDropdown({ selectedDate, onSelect }) {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(
    selectedDate ? new Date(selectedDate) : today
  );
  const [mode, setMode] = useState("date"); // 'date' | 'month' | 'year'

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const startDay = startOfMonth.getDay(); // 0 (Sunday) - 6 (Saturday)

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const handlePrev = () => {
    if (mode === "date") {
      const newDate = new Date(currentDate);
      newDate.setMonth(currentDate.getMonth() - 1);
      setCurrentDate(newDate);
    } else if (mode === "month") {
      setCurrentDate(new Date(currentDate.getFullYear() - 1, 0, 1));
    } else {
      setCurrentDate(new Date(currentDate.getFullYear() - 10, 0, 1));
    }
  };

  const handleNext = () => {
    if (mode === "date") {
      const newDate = new Date(currentDate);
      newDate.setMonth(currentDate.getMonth() + 1);
      setCurrentDate(newDate);
    } else if (mode === "month") {
      setCurrentDate(new Date(currentDate.getFullYear() + 1, 0, 1));
    } else {
      setCurrentDate(new Date(currentDate.getFullYear() + 10, 0, 1));
    }
  };

  const selectDate = (day) => {
    const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    onSelect(selected);
  };

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="text-gray-300 text-center">-</div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const isSelected = selectedDate &&
        selectedDate.getDate() === i &&
        selectedDate.getMonth() === currentDate.getMonth() &&
        selectedDate.getFullYear() === currentDate.getFullYear();
      days.push(
        <div
          key={i}
          onClick={() => selectDate(i)}
          className={`text-center rounded-md cursor-pointer py-1 ${
            isSelected ? "bg-blue-600 text-white" : "hover:bg-blue-100"
          }`}
        >
          {i}
        </div>
      );
    }
    return days;
  };

  const renderMonths = () => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthNames.map((month, index) => {
      const isSelected = currentDate.getMonth() === index;
      return (
        <div
          key={month}
          onClick={() => {
            const newDate = new Date(currentDate);
            newDate.setMonth(index);
            setCurrentDate(newDate);
            setMode("date");
          }}
          className={`text-center rounded-md cursor-pointer px-2 py-1 ${
            isSelected ? "bg-blue-600 text-white" : "hover:bg-blue-100"
          }`}
        >
          {month}
        </div>
      );
    });
  };

  const renderYears = () => {
    const startYear = Math.floor(currentDate.getFullYear() / 10) * 10;
    return Array.from({ length: 10 }, (_, i) => startYear + i).map((year) => {
      const isSelected = currentDate.getFullYear() === year;
      return (
        <div
          key={year}
          onClick={() => {
            const newDate = new Date(currentDate);
            newDate.setFullYear(year);
            setCurrentDate(newDate);
            setMode("month");
          }}
          className={`text-center rounded-md cursor-pointer px-2 py-1 ${
            isSelected ? "bg-blue-600 text-white" : "hover:bg-blue-100"
          }`}
        >
          {year}
        </div>
      );
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4 min-w-[250px]">
      {/* Header */}
      <div className="flex justify-between items-center">
        <button onClick={handlePrev}>‹</button>
        <button onClick={() => setMode(mode === "year" ? "date" : mode === "month" ? "year" : "month")} className="font-medium">
          {mode === "date" && format(currentDate, "MMMM yyyy")}
          {mode === "month" && currentDate.getFullYear()}
          {mode === "year" &&
            `${Math.floor(currentDate.getFullYear() / 10) * 10} - ${
              Math.floor(currentDate.getFullYear() / 10) * 10 + 9
            }`}
        </button>
        <button onClick={handleNext}>›</button>
      </div>

      {/* Body */}
      {mode === "date" && (
        <div className="grid grid-cols-7 gap-2 text-sm">
          {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((d,i) => (
            <div key={`day-${i}`} className="text-center font-semibold">
              {d}
            </div>
          ))}
          {renderDays()}
        </div>
      )}

      {mode === "month" && (
        <div className="grid grid-cols-3 gap-2 text-sm">
          {renderMonths()}
        </div>
      )}

      {mode === "year" && (
        <div className="grid grid-cols-3 gap-2 text-sm">
          {renderYears()}
        </div>
      )}
    </div>
  );
}
