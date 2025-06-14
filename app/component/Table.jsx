"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Dropdown from "./Dropdown";
import DataNotFound from "./DataNotFound";
import { Calendar,ArrowUp2, ArrowDown2, Edit2, Trash, Diagram, SearchNormal, FilterSearch, FilterSquare } from "iconsax-react";
import { useTheme } from "@/provider/ThemeProvider";
import 'react-datepicker/dist/react-datepicker.css';
import '../globals.css'; 
import CustomDatePicker from "./Datepicker";
import MultiSelectDropdown from "./MultiSelectDropdown";
import ModalFilterPengumuman from "./ModalFilterPengumuman";
import SmallButton from "./SmallButton";

const TableComponent = ({ 
  columns, data, title, filters=[], 
  onDelete, onEdit, onDetailEdit=false, onDetailDelete=false,
  dataKey, Aksi, 
  multiFilter=false,
  enableSort=true, enableSearch=true,
  enableSelect, selectedRows = [], onSelectRow, onSelectAll,
  filterDate, selectedDate, dFPlaceholder , deleteSelectedDate=false, handleDeleteDateFilter,
  onSortChange, handleDateChange, handleSearchChange, onFilterChange,
  meta = { currentPage: 1, perPage: 10 },
  currentPage,
  perPage}) => {
  //console.log(data);
  const inputRef = useRef(null);
  const router = useRouter();
  const [sortConfig, setSortConfig] = useState({ 
    key: columns[0], 
    direction: "asc" 
  });
  const [filterValues, setFilterValues] = useState({});
  const [isFilterOpen, setFilterOpen] = useState(false);
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const isDark = theme === "dark";
  const [isModalFilterOpen, setIsModalFilterOpen] = useState(false);
  const [modalFilterValue, setModalFilterValue] = useState({});


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

  const handleEditClick = (item) => {
    if (onDetailEdit) {
      onEdit(item); // kirim semua data
    } else {
      onEdit(item[dataKey]); // kirim hanya ID
    }
  };

  const handleDeleteClick = (item) => {
    if (onDetailDelete) {
      onDelete(item); // kirim semua data
    } else {
      onDelete(item[dataKey]); // kirim hanya ID
    }
  };

  const renderAksi = (item) => {
    if (Aksi === "EditDelete") {
      return (
        <>
        <button onClick={() => handleEditClick(item)}>
          <Edit2 size="20" color="#FFCF43" variant="Bold" className="transition-shadow ease-in-out duration-300 hover:shadow-md hover:scale-125"/>
        </button>
        <button onClick={() => handleDeleteClick(item)}>
          <Trash size="20" color="#DC1010" variant="Bold" className="transition-shadow ease-in-out duration-300 hover:shadow-md hover:scale-125"/>
        </button>
      </>
      );
    } else if (Aksi === "LihatNilai") {
      return (
        <button 
          className="px-2 py-1.5 bg-white dark:bg-dark_net-ter rounded-[5px] outline outline-1 outline-offset-[-1px] outline-[#0841e2] dark:outline-[#5D8BF8] dark:hover:bg-blue-600 hover:bg-blue-600 hover:scale-105 transition ease-in-out duration-300 justify-start text-[#0841e2] dark:text-[#5D8BF8] text-sm font-medium dark:hover:text-slate-100 hover:text-white"
          onClick={() => router.push(`/penilaian/rekap-nilai/lihat-nilai?id=${item.id}`)}
        >
          Lihat Nilai
        </button>
      );
    }
  };

  const handleFilterChange = (key, selected) => {
    const updated = { ...filterValues, [key]: selected };
    setFilterValues(updated);
    if (typeof onFilterChange === "function") {
      onFilterChange(updated);
    }
  };

  return (
    <div className="w-full overflow-y-visible mx-auto">
    <div className="w-full mb-5 flex space-x-2 justify-between items-center text-black dark:text-white">
      <div className="flex items-center space-x-1 md:space-x-5">
        <h1 className="text-lg font-semibold lg:whitespace-nowrap">{title}</h1>
        <div className={` flex space-x-2 ${!filterDate ? "hidden" : ""}`}>
          <CustomDatePicker
            value={selectedDate}
            onChange={handleDateChange}
            placeholder={dFPlaceholder}
            customFilterdateStyle="flex items-center justify-between border border-pri-main dark:border-pri-border rounded-lg px-2 md:px-4 py-2 cursor-pointer whitespace-nowrap space-x-1.5"
          />
          {deleteSelectedDate &&
            <div className={`${!selectedDate ? "hidden" : ""}`}>
              <SmallButton 
                //onClick 
                icon = {Trash}
                onClick = {handleDeleteDateFilter}
                bgColor = {"bg-err-main"}
                colorIcon = {"currentColor"}
                hover = {"hover:bg-err-hover"}
                noTitle = {true}
              />
            </div>
          }
        </div>
        <div className="flex space-x-5 items-center">
          {filters.map((filter) => {
            if (filter.type === "multiselect") {
              return (
                <MultiSelectDropdown
                  key={filter.key}
                  fetchOptions={filter.fetchOptions}
                  options={filter.options}
                  placeholder={filter.label}
                  wideInput={filter.wideInput}
                  textInputSize={filter.textSize}
                  textDropDownSize={filter.textDropDownSize}
                  wideDropdown={filter.wideDropdown}
                  onSelect={(val) => handleFilterChange(filter.key, val)}
                />
              );
            } 
            {/* else if (filter.type === "singleselect") {
              return (
                <Dropdown
                  key={filter.key}
                  options={filter.options}
                  value={filter.options.find(opt => opt.value === filter.selectedOptions.value) || null}
                  onChange={(val) => {
                    handleFilterChange(filter.key, val.value);
                    //filter.handleOptionChange(val)
                  }}
                  className="w-auto p-2 rounded-md items-center bg-white border  min-w-40 "
                  placeholder={filter.placeholder}
                />
              );
            } */}
            return null;
          })}
        </div>
      </div>
      <div ref={inputRef} className="relative lg:w-64 ">

      <div className="flex space-x-5 items-center">
        {enableSearch && (
          isFilterOpen ? (
            <div className="relative">
              <input
                type="text"
                placeholder="Cari data..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearchChange(searchQuery);
                    setFilterOpen(false);
                  }
                }}
                className="w-full h-10 p-2 pl-4 pr-10 border border-blue-500 dark:border-[#5D8BF8] dark:text-slate-100 dark:bg-dark_net-ter rounded-full outline-none transition-all duration-300"
                autoFocus
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <SearchNormal color="#0841E2" variant="Outline" size={20} />
              </div>
            </div>
          ) : (
            <div
              className={`w-10 h-10 p-2 rounded-full bg-gray-200 cursor-pointer transition-all duration-300 ${
                          multiFilter ? 'lg:ml-36' : 'lg:ml-52'
                        }`}
              onClick={() => setFilterOpen(true)}
            >
              <SearchNormal color="#0841E2" variant="Outline" size={24} />
            </div>
          )
        )}  

        {multiFilter && (
          <div className="relative min-w-10 h-10">
            <div
              className="h-10 w-10 bg-gray-200 text-pri-main flex items-center justify-center rounded-full cursor-pointer transition-all duration-300"
              onClick={() => setIsModalFilterOpen((prev) => !prev)}
            >
              <FilterSearch variant="Bold" color="currentColor" size={20} />
            </div>
            <ModalFilterPengumuman
              isOpen={isModalFilterOpen}
              onClose={() => setIsModalFilterOpen(false)}
              onApply={(val) => {
                setModalFilterValue(val);
                if (typeof onFilterChange === "function") onFilterChange(val);
              }}
              initialValue={modalFilterValue}
            />
          </div>
        )} 
       </div> 
      </div>
    </div>
      <div className="bg-white dark:bg-dark_net-pri shadow-lg rounded-lg overflow-x-auto">
        <table className="w-auto min-w-full table-fixed border-collapse text-xs">
          <thead>
            <tr className="bg-[#ADC0F5]/10 dark:bg-blue-700 text-black dark:text-gray-200 font-semibold">
              {enableSelect ? (
                <th className=" pl-6 text-left">
                  <label className="inline-flex items-center gap-2 cursor-pointer justify-start w-full">
                    <input
                      type="checkbox"
                      className="accent-pri-main rounded-sm cursor-pointer"
                      checked={data.length > 0 && selectedRows.length === data.length}
                      onChange={(e) => onSelectAll?.(e.target.checked)}
                    />
                    <span className="text-xs font-bold">PILIH SEMUA</span>
                  </label>
                </th>
              ) : (
                <th className="px-2 md:px-4 lg:px-6 py-1 text-left">NO</th>
              )}
              {columns.map((col) => (
                <th
                  key={col.label}
                  className={`px-2 md:px-4 lg:px-6 py-1 text-left dark:text-slate-100 ${enableSort ? 'cursor-pointer' : ''} select-none`}
                  onClick={enableSort ? () => sortData(col.sortKey) : undefined}
                >
                  <div className="flex items-center gap-2">
                    <span>{col.label.replace(/_/g, " ").toUpperCase()}</span>
                    {enableSort && renderSortIcons(col.sortKey)}
                  </div>
                </th>
              ))}
              {/* Tambahan kolom Aksi */}
              {Aksi && (<th className="px-2 md:px-4 lg:px-6 py-1 text-center">AKSI</th>)}
              
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="border-2 border-[#ADC0F5]/10 ">
                  {enableSelect ? (
                    <td className="pl-6 text-left">
                      <input
                        type="checkbox"
                        className="accent-pri-main rounded-sm cursor-pointer"
                        checked={selectedRows.includes(item[dataKey])}
                        onChange={(e) => onSelectRow?.(e.target.checked, item)}
                      />
                    </td>
                  ) : (
                    <td className="px-2 md:px-4 lg:px-6 py-2 text-gray-900 dark:text-slate-100">
                      {((currentPage || meta?.currentPage || 1) - 1) * (perPage || meta?.perPage || 10) + index + 1}
                    </td>
                  )}
                  {columns.map((key) => (
                    <td
                      key={key.label}
                      className="py-3 px-2 md:px-4 lg:px-5 text-gray-900 dark:text-gray-100 max-w-[10px] truncate whitespace-nowrap"
                      title={item[key.label]}
                    >
                      {item[key.label]}
                    </td>
                  ))}
                  {/* Kolom Aksi */}
                  {Aksi && (
                    <td className="py-3 px-2 md:px-4 lg:px-6 flex gap-2 justify-center">
                      {renderAksi(item)}
                    </td>
                  )}
                  
                </tr>
              ))
            ) : (
              <tr >
                <td colSpan={columns.length + 1} className="text-center items-center py-4 text-gray-500 dark:bg-dark_net-pri dark:text-gray-300">
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
