"use client";
import React, { useState, useEffect, useRef } from "react";
import { ArrowDown2 } from "iconsax-react";

export default function Dropdown({ 
  options, 
  value, 
  onChange, 
  icon: Icon,
  title,
  subtitle,
  className,
  dropdownStyle,
  containerStyle, 
  iconSize = "w-5",
  placeholder,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div 
      ref={dropdownRef}
      className={`relative cursor-pointer ${className} dark:text-white`}
      onClick={handleClick}
    >
      <div className={`flex items-center w-full ${containerStyle}`}>
        {Icon && (
          <Icon 
            className={`${iconSize} flex items-center justify-center`} 
            color="currentColor"
            variant="Bold"
          />
        )}
        <div className="flex-grow me-1">
          <p className="text-black text-base font-bold">{title}</p>
          <p className="text-black text-sm font-normal">
            {value ? value.label : placeholder ||"" }
          </p>
        </div>
        <ArrowDown2 
          className={`w-4 h-4 transition-transform duration-300 justify-end ${value ? 'text-black' : 'text-black' } ${isOpen ? 'rotate-180' : ''}`}
          color='currentColor'
        />
      </div>
      
      {isOpen && (
        <div className={`absolute top-full left-0 w-full mt-1 bg-white dark:bg-black rounded-md shadow-lg z-10 border border-gray-200 dark:border-pri-border ${dropdownStyle} max-h-40 overflow-y-auto`}>
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark_net-sec cursor-pointer ${
                value && value.value === option.value ? 'bg-gray-50 dark:bg-dark_net-pri' : ''
              }`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}