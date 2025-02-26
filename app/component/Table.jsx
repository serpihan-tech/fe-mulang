"use client";
import { useState } from "react";
import { ArrowUp2, ArrowDown2 } from "iconsax-react";

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
    <div className="max-w-4xl mx-auto">
      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <table className="w-full border-collapse p-2">
          <thead>
            <tr className="bg-[#ADC0F5]/10 dark:bg-blue-700 text-black dark:text-gray-200 font-semibold">
              {columns.map((key) => (
                <th
                  key={key}
                  className="px-6 py-1 text-left cursor-pointer select-none"
                  onClick={() => sortData(key)}
                >
                  <div className="flex items-center gap-2">
                    <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                    {renderSortIcons(key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr key={index} className="border-2 border-[#ADC0F5]/10">
                {columns.map((key) => (
                  <td
                    key={key}
                    className="py-3 px-6 text-gray-900 dark:text-gray-100 max-w-[200px] truncate whitespace-nowrap"
                    title={item[key]}
                  >
                    {item[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
