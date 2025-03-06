"use client";
import { useState } from "react";
import { ArrowUp2, ArrowDown2, Edit2, Trash } from "iconsax-react";

const TableComponent = ({ columns, data }) => {
  const [sortConfig, setSortConfig] = useState({ key: columns[0], direction: "asc" });

  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    const valA = a[sortConfig.key];
    const valB = b[sortConfig.key];

    if (typeof valA === "string") {
      return sortConfig.direction === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
    } else {
      return sortConfig.direction === "asc" ? valA - valB : valB - valA;
    }
  });

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

  

  return (
    <div className="w-full overflow-hidden mx-auto">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <table className="w-auto min-w-full table-fixed border-collapse text-xs">
          <thead>
            <tr className="bg-[#ADC0F5]/10 dark:bg-blue-700 text-black dark:text-gray-200 font-semibold">
              {columns.map((key) => (
                <th
                  key={key}
                  className="px-6 py-1 text-left cursor-pointer select-none"
                  onClick={() => sortData(key)}
                >
                  <div className="flex items-center gap-2">
                    <span>{key.replace(/_/g, " ").toUpperCase()}</span>
                    {renderSortIcons(key)}
                  </div>
                </th>
              ))}
              {/* Tambahan kolom Aksi */}
              <th className="px-6 py-1 text-left">AKSI</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.length > 0 ? (
              sortedData.map((item, index) => (
                <tr key={index} className="border-2 border-[#ADC0F5]/10">
                  {columns.map((key) => (
                    <td
                      key={key}
                      className="py-3 px-6 text-gray-900 dark:text-gray-100 max-w-[150px] truncate whitespace-nowrap"
                      title={item[key]}
                    >
                      {item[key]}
                    </td>
                  ))}
                  {/* Kolom Aksi */}
                  <td className="py-3 px-6 flex gap-2">
                    <button>
                      <Edit2 size="20" color="#FFCF43" variant="Bold" />
                    </button>
                    <button>
                      <Trash size="20" color="#DC1010" variant="Bold" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="text-center py-4 text-gray-500 dark:text-gray-300">
                  Data tidak ditemukan
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
