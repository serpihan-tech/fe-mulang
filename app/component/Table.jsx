"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Dropdown from "./Dropdown";
import DataNotFound from "./DataNotFound";
import { Calendar,ArrowUp2, ArrowDown2, Edit2, Trash, Diagram, SearchNormal } from "iconsax-react";
import { useTheme } from "@/provider/ThemeProvider";
import 'react-datepicker/dist/react-datepicker.css';
import '../globals.css'; 
import CustomDatePicker from "./Datepicker";

const TableComponent = ({ columns, data, title,filters=[], onDelete, onEdit, dataKey, Aksi, filterDate,selectedDate,handleDateChange,selectedSearch, handleSearchChange,onSortChange }) => {
  const inputRef = useRef(null);
  const router = useRouter();
  const [sortConfig, setSortConfig] = useState({ key: columns[0], direction: "asc" });
  const [filterValues, setFilterValues] = useState({});
  const [isFilterOpen, setFilterOpen] = useState(false);
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const isDark = theme === "dark";


  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
  
    setSortConfig({ key, direction });
    onSortChange(key, direction);
  };

  const renderSortIcons = (key) => {
    const isActive = sortConfig.key === key;
    const upColor = isActive && sortConfig.direction === "asc" ? "text-netral-40" : "text-netral-10";
    const downColor = isActive && sortConfig.direction === "desc" ? "text-netral-40" : "text-netral-10";
    
    
    return (
      <div className="flex flex-col items-center">
        <ArrowUp2 size="16" className={`${upColor} -mb-2`} color="currentColor" variant="Bold" />
        <ArrowDown2 size="16" className={`${downColor}`} color="currentColor" variant="Bold" />
      </div>
    );
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setFilterOpen(false);
      }
    }

    if (isFilterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFilterOpen]);

  const renderAksi = (item) => {
    if (Aksi === "EditDelete") {
      return (
        <>
        <button onClick={() => onEdit(item[dataKey])}>
          <Edit2 size="20" color="#FFCF43" variant="Bold" />
        </button>
        <button onClick={() => onDelete(item[dataKey])}>
          <Trash size="20" color="#DC1010" variant="Bold" />
        </button>
      </>
      );
    } else if (Aksi === "LihatNilai") {
      return (
        <button 
          className="px-2 py-1.5 bg-white rounded-[5px] outline outline-1 outline-offset-[-1px] outline-[#0841e2]"
          onClick={() => router.push("/penilaian/rekap-nilai/lihat-nilai")}
        >
          <div className="justify-start text-[#0841e2] text-sm font-medium">Lihat Nilai</div>
        </button>
      );
    }
  };

  return (
    <div className="w-full overflow-hidden mx-auto">
    <div className="mb-5 flex justify-between items-center text-black dark:text-white">
      <div className="flex items-center space-x-5">
        <h1 className="text-lg font-semibold">{title}</h1>
        <div className={` ${!filterDate ? "hidden" : ""}`}>
          <CustomDatePicker
            value={selectedDate}
            onChange={handleDateChange}
            customFilterdateStyle="flex items-center justify-between border border-blue-500 rounded-lg px-4 py-2 cursor-pointer min-w-[180px]"
          />
        </div>
        <div className="flex space-x-5">
          {/* {filters.map((filter) => (
            <Dropdown
              key={filter.key}
              options={filter.options.map((opt) => ({ value: opt, label: opt }))}
              value={filterValues[filter.key]}
              onChange={(selectedOption) => handleFilterChange(filter.key, selectedOption)}
              title={filter.label}
              className={`w-auto h-10 p-2 rounded-md border ${isDark ? "bg-[#222222] border-[#ADC0F5] text-[#E0E0E0]" : "bg-white border-gray-200 text-black"}`}
                          dropdownStyle={isDark ? "dark:bg-[#222222] dark:text-[#E0E0E0]" : ""}
            />
          ))} */}
        </div>
      </div>
      <div ref={inputRef} className="relative w-64">
        {isFilterOpen ? (
          <div className="relative">
            <input
              type="text"
              placeholder="Cari data..."
              value={selectedSearch}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full h-10 p-2 pl-4d pr-10 border border-blue-500 rounded-full outline-none transition-all duration-300"
              autoFocus
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <SearchNormal color="#0841E2" variant="Outline" size={20} />
            </div>
          </div>
        ) : (
          <div
            className=" ml-52 w-10 h-10 p-2 rounded-full bg-gray-200 cursor-pointer transition-all duration-300"
            onClick={() => setFilterOpen(true)}
          >
            <SearchNormal color="#0841E2" variant="Outline" size={24} />
          </div>
        )}
      </div>
    </div>
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <table className="w-auto min-w-full table-fixed border-collapse text-xs">
          <thead>
            <tr className="bg-[#ADC0F5]/10 dark:bg-blue-700 text-black dark:text-gray-200 font-semibold">
              <th className="px-6 py-1 text-left">NO</th>
              {columns.map((col) => (
                <th
                  key={col.label}
                  className="px-6 py-1 text-left cursor-pointer select-none"
                  onClick={() => sortData(col.sortKey)}
                >
                  <div className="flex items-center gap-2">
                    <span>{col.label.replace(/_/g, " ").toUpperCase()}</span>
                    {renderSortIcons(col.sortKey)}
                  </div>
                </th>
              ))}
              {/* Tambahan kolom Aksi */}
              <th className="px-6 py-1 text-center">AKSI</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="border-2 border-[#ADC0F5]/10">
                  <td className="py-3 px-6 text-gray-900 dark:text-gray-100 text-left">{index + 1}</td>
                  {columns.map((key) => (
                    <td
                      key={key.label}
                      className="py-3 px-6 text-gray-900 dark:text-gray-100 max-w-[160px] truncate whitespace-nowrap"
                      title={item[key.label]}
                    >
                      {item[key.label]}
                    </td>
                  ))}
                  {/* Kolom Aksi */}
                  <td className="py-3 px-6 flex gap-2 justify-center">
                    {renderAksi(item)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="text-center py-4 text-gray-500 dark:text-gray-300">
                <DataNotFound />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
