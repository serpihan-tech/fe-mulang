"use client";
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import { People, Teacher, Book, Award, Calendar, Calendar1 } from "iconsax-react";
import SumCard from "../SumCard";
import { Calendar as ReactCalendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../style/calendarStyle.css";
import { useTheme } from "@/provider/ThemeProvider";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function AdminDashboard() {
  const [timePeriod, setTimePeriod] = useState('mingguan');
  const [category, setCategory] = useState('siswa');
  const { theme } = useTheme();

  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const periodOptions = [
    { label: "Genap 2024-2025", value: "genap_2024_2025" },
    { label: "Ganjil 2024-2025", value: "ganjil_2024_2025" },
    { label: "Genap 2023-2024", value: "genap_2023_2024" },
    { label: "Ganjil 2023-2024", value: "ganjil_2023_2024" },
  ];

  const [selectedPeriod, setSelectedPeriod] = useState(periodOptions[0]);

  // Close dropdown when clicking outside
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

  const [chartOptions, setChartOptions] = useState({});

  const [chartSeries, setChartSeries] = useState([]);

  const data = {
    mingguan: {
      siswa: {
        hadir: [140, 130, 140, 130, 130],
        tidakHadir: [20, 25, 15, 22, 18]
      },
      guru: {
        hadir: [50, 45, 55, 50, 48],
        tidakHadir: [5, 8, 6, 7, 5]
      }
    },
    bulan: {
      siswa: {
        hadir: [600, 620, 610, 630, 640],
        tidakHadir: [80, 85, 75, 90, 95]
      },
      guru: {
        hadir: [200, 210, 205, 215, 220],
        tidakHadir: [20, 18, 22, 19, 21]
      }
    }
  };

  const categories = timePeriod === 'mingguan' ? ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'] : ['mingguan 1', 'mingguan 2', 'mingguan 3', 'mingguan 4', 'mingguan 5'];

  useEffect(() => {
    setChartOptions({
      chart: {
        id: "basic-bar",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: categories,
        labels: {
          style: {
            colors: theme === "dark" ? "#ffffff" : "#000000", // Warna teks X-axis
          },
        },
      },
      yaxis: {
        min: 0,
        max: 160,
        tickAmount: 8,
        labels: {
          style: {
            colors: theme === "dark" ? "#ffffff" : "#000000", // Warna teks Y-axis
          },
        },
      },
      colors: ["#0E9035", "#DC1010"],
      stroke: {
        width: 3,
      },
      legend: {
        show: false,
      },
    });
  }, [theme, timePeriod, category]); // Update jika tema atau data berubah

  // Update chart series saat timePeriod atau category berubah
  useEffect(() => {
    setChartSeries([
      {
        name: "Hadir",
        data: data[timePeriod][category].hadir,
      },
      {
        name: "Tidak Hadir",
        data: data[timePeriod][category].tidakHadir,
      },
    ]);
  }, [timePeriod, category]);

  const handlePeriodClick = () => {
    setShowPeriodDropdown(!showPeriodDropdown);
  };

  const handlePeriodSelect = (period) => {
    setSelectedPeriod(period);
    setShowPeriodDropdown(false);
  };


  return (
    <>
      <div className="z-0 transition">
        <div className="bg-[#FAFAFA] dark:bg-black flex pt-8 px-6 gap-5">
          <div>
            <div className="flex gap-5">
              <SumCard icon={People} value="100" label="Total Siswa"/>
              <SumCard icon={Teacher} value="100" label="Total Guru"/>
              <SumCard icon={Book} value="100" label="Total Mapel"/>
              <SumCard icon={Award} value="100" label="Total Kelulusan"/>
            </div>

            <div className="mt-5 bg-white dark:bg-netral-0/10 dark:backdrop-blur-md dark:border-2 dark:border-pri-border px-5 py-4 rounded-md">
              <div className="flex justify-between items-center mb-4">
                <p className="text-lg text-black dark:text-white font-bold">Kehadiran</p>
                <div className="flex gap-2">
                  <select className="bg-white dark:bg-netral-0/0 text-black dark:text-white dark:border-2 border border-netral-10 dark:border-pri-border rounded-md p-1" onChange={(e) => setTimePeriod(e.target.value)} value={timePeriod}>
                    <option value="mingguan">Mingguan</option>
                    <option value="bulan">Bulanan</option>
                  </select>
                  <select className="bg-white dark:bg-netral-0/0 text-black dark:text-white dark:border-2 border border-netral-10 dark:border-pri-border rounded-md p-1" onChange={(e) => setCategory(e.target.value)} value={category}>
                    <option value="siswa">Siswa</option>
                    <option value="guru">Guru</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4 mb-4">
                <div className="h-[15px] justify-start items-center gap-2.5 inline-flex">
                  <div className="w-2.5 h-2.5 bg-[#0e9035] rounded-full" />
                  <p className="text-black dark:text-white text-xs font-medium">Hadir</p>
                </div>
                <div className="h-[15px] justify-start items-center gap-2.5 inline-flex">
                  <div className="w-2.5 h-2.5 bg-[#DC1010] rounded-full" />
                  <p className="text-black dark:text-white text-xs font-medium">Tidak Hadir</p>
                </div>
              </div>
              <div className="mixed-chart ">
                <Chart
                  options={chartOptions}
                  series={chartSeries}
                  type="line"
                  width="700"
                />
              </div>
            </div>

            <div className="my-5 bg-white dark:bg-netral-0/10 dark:backdrop-blur-md dark:border-2 dark:border-pri-border px-5 py-4 rounded-md">
              <p className="text-lg text-black dark:text-white font-bold">Pusat Informasi</p>
              
            </div>
          </div>
          
          <div className="flex flex-col gap-5 flex-grow">
            <div 
            ref={dropdownRef}
            className="w-full flex items-center justify-start p-3.5 text-black dark:text-white rounded-md bg-white dark:bg-netral-0/10 dark:backdrop-blur-md dark:border-2 dark:border-pri-border gap-5"
            onClick={handlePeriodClick}>
              <Calendar variant="Bold" size={30} color="currentColor"/>
              <div>
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
            <div className="w-full p-3.5 rounded-md bg-white dark:bg-netral-0/10 dark:backdrop-blur-md dark:border-2 dark:border-pri-border gap-5">
              <div>
                <p className="text-black dark:text-white text-lg font-bold">Kalender</p>
                <ReactCalendar 
                  className="react-calendar mb-3"
                  formatShortWeekday={(locale, date) => 
                    ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]
                  }
                  formatDay={(locale, date) => {
                    return date.getDate().toString().padStart(2, '0');
                  }}
                  nextLabel="›"
                  prevLabel="‹"
                  view="month"
                />
              </div>
              <div>
                <p className="text-base font-medium text-[#333333] dark:text-netral-10">Upcoming Event</p>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </>
  );
}