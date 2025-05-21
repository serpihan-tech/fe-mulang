"use client";

import { useTheme } from "../../provider/ThemeProvider";
import { useEffect, useState } from "react";

export default function ThemeSwitcher({ open = true }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const [shouldRenderText, setShouldRenderText] = useState(open);

  useEffect(() => {
    if (open) {
      setTimeout(() => setShouldRenderText(true), 300);
    } else {
      setShouldRenderText(false);
    }
  }, [open]);

  // Jika sidebar tertutup
  if (!open) {
    return (
      <button
        onClick={toggleTheme}
        className="w-full flex justify-center items-center p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
        aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        <span
          className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-300
            ${isDark 
              ? "bg-indigo-500 text-white" 
              : "bg-yellow-100 text-yellow-500"
            }`}
        >
          {isDark ? "🌙" : "☀️"}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-3 px-3 py-2 rounded-full focus:outline-none hover:scale-105 transition-transform duration-300 w-full"
      aria-label="Toggle theme"
    >
      {/* Label */}
      <span className={`transition-colors duration-500 font-semibold text-sm ${
        isDark ? "text-indigo-200" : "text-yellow-600"
      }`}>
        {isDark ? "Dark Mode" : "Light Mode"}
      </span>

      {/* Switch */}
      <span className={`ml-auto relative flex items-center w-12 h-6 transition-colors duration-500 rounded-full 
          ${isDark 
            ? "bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-700 shadow-lg shadow-indigo-500/20" 
            : "bg-gradient-to-r from-yellow-300 via-orange-200 to-yellow-100 shadow-lg shadow-yellow-300/20"
          }`}
      >
        <span
          className={`absolute top-0 left-0 w-6 h-6 rounded-full flex items-center justify-center text-lg 
            shadow-md transition-transform duration-500 transform hover:rotate-12
            ${isDark 
              ? "translate-x-6 bg-indigo-500 text-white shadow-indigo-400/30" 
              : "translate-x-0 bg-white text-yellow-400 shadow-yellow-300/40"
            }`}
        >
          {isDark ? "🌙" : "☀️"}
        </span>
      </span>
    </button>
  );
}