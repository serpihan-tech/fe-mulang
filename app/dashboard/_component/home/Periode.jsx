"use client";
import React, { useState, useEffect, useRef } from "react";
import { Calendar, ArrowDown2 } from "iconsax-react";

export default function Periode() {
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const periodOptions = [
    { label: "Genap 2024-2025", value: "genap_2024_2025" },
    { label: "Ganjil 2024-2025", value: "ganjil_2024_2025" },
    { label: "Genap 2023-2024", value: "genap_2023_2024" },
    { label: "Ganjil 2023-2024", value: "ganjil_2023_2024" },
  ];

  const [selectedPeriod, setSelectedPeriod] = useState(periodOptions[0]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowPeriodDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const handlePeriodClick = () => {
    setShowPeriodDropdown(!showPeriodDropdown);
  };

  const handlePeriodSelect = (period) => {
    setSelectedPeriod(period);
    setShowPeriodDropdown(false);
  };

  return (
    <>
      <div 
        ref={dropdownRef}
        className="w-[332px] h-16 flex p-3.5 rounded-md bg-white gap-5 cursor-pointer relative"
        onClick={handlePeriodClick}
      >
        <Calendar className="w-7.5 flex items-center justify-center" color="black"/>
        <div className="flex-grow">
          <p className="text-base font-bold">Periode</p>
          <p className="text-[10px] font-medium">{selectedPeriod.label}</p>
        </div>
        <ArrowDown2 
          className={`w-5 h-5 transition-transform duration-300 ${showPeriodDropdown ? 'rotate-180' : ''}`}
          color="black"
        />
        
        {showPeriodDropdown && (
          <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-md shadow-lg z-10 border border-gray-200">
            {periodOptions.map((period, index) => (
              <div
                key={period.value}
                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
      selectedPeriod.value === period.value ? 'bg-gray-50' : ''
                }`}
                onClick={() => handlePeriodSelect(period)}
              >
                {period.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}