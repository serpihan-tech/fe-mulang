"use client";
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import Dropdown from "@/app/component/Dropdown";
import { useTheme } from "@/provider/ThemeProvider";
import { data_grafik_kehadiran } from "@/app/api/admin/ApiDashboard";
import { toast } from "react-toastify";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function ChartAttendance() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const timeOptions = [
    { label: "Mingguan", value: "minggu" },
    { label: "Bulanan", value: "bulan" },
    { label: "Semester", value: "semester" },

  ];

  const categoryOptions = [
    { label: "Siswa", value: "siswa" },
    { label: "Guru", value: "guru" },
  ];

  const [selectedTime, setSelectedTime] = useState(timeOptions[0]);
  const [selectedCategory, setSelectedCategory] = useState(categoryOptions[0]);
  const [chartData, setChartData] = useState({
    siswa: { hadir: [], tidakHadir: [] },
    guru: { hadir: [], tidakHadir: [] }
  });

  const categories = selectedTime.value === 'minggu' 
    ? ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'] 
    : ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4', 'Minggu 5'];

  const chartSeries = [
    {
      name: "Hadir",
      data: chartData[selectedCategory.value]?.hadir.map(item => item.value) || []
    },
    {
      name: "Tidak Hadir",
      data: chartData[selectedCategory.value]?.tidakHadir.map(item => item.value) || []
    }
  ];

  // Calculate max value for dynamic y-axis
  const getMaxValue = () => {
    const hadirValues = chartData[selectedCategory.value]?.hadir.map(item => item.value) || [];
    const tidakHadirValues = chartData[selectedCategory.value]?.tidakHadir.map(item => item.value) || [];
    const maxValue = Math.max(...hadirValues, ...tidakHadirValues);
    // Round up to nearest 10 and add some padding
    return Math.ceil(maxValue ) ;
  };

  const chartOptions = {
    chart: {
      id: "basic-bar",
      toolbar: {
        show: false
      }
    },
    xaxis: {
      categories: categories
    },
    yaxis: {
      min: 0,
      max: getMaxValue(),
      
    },
    colors: ['#0E9035', '#DC1010'],
    stroke: {
      width: 3
    },
    legend: {
      show: false
    }
  };

  const fetchData = async (periode = selectedTime.value) => {
    try {
      const response = await data_grafik_kehadiran(periode)
      if(response){
        const dataArray = response.data;
        setChartData(dataArray);
      }
    } catch (err) {
      toast.error(err.message)
    }
  };

  useEffect(() => {
    fetchData();
  },[selectedTime])

  return (
    <div className={`mt-5 px-5 py-4 rounded-md  ${isDark ? "bg-dark_net-ter " : "bg-white"}`}>
            <div className="flex justify-between items-center mb-4">
                <p className={`text-lg font-bold ${isDark ? "text-slate-100" : "text-black"}`}>Kehadiran</p>
                <div className="flex gap-2">
                    <Dropdown
                        options={timeOptions}
                        value={selectedTime}
                        onChange={setSelectedTime}
                        className={`h-10 p-2 rounded-md border ${isDark ? "bg-[#222222] border-[#ADC0F5] text-[#E0E0E0]" : "bg-white border-gray-200 text-black"}`}
                        dropdownStyle={isDark ? "dark:bg-[#222222] dark:text-[#E0E0E0]" : ""}
                    />
                    <Dropdown
                        options={categoryOptions}
                        value={selectedCategory}
                        onChange={setSelectedCategory}
                        className={`h-10 p-2 rounded-md border ${isDark ? "bg-[#222222] border-[#ADC0F5] text-[#E0E0E0]" : "bg-white border-gray-200 text-black"}`}
                        dropdownStyle={isDark ? "dark:bg-[#222222] dark:text-[#E0E0E0]" : ""}
                    />
                </div>
            </div>

            <div className="flex gap-4 mb-4">
                <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 bg-[#0e9035] rounded-full" />
                    <p className={`text-xs font-medium ${isDark ? "text-[#E0E0E0]" : "text-black"}`}>Hadir</p>
                </div>
                <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 bg-[#DC1010] rounded-full" />
                    <p className={`text-xs font-medium ${isDark ? "text-[#E0E0E0]" : "text-black"}`}>Tidak Hadir</p>
                </div>
            </div>

            <div className="mixed-chart -ms-4">
                <Chart
                    className="w-full"
                    options={{
                        ...chartOptions,
                        theme: { mode: isDark ? "dark" : "light" },
                        grid: { borderColor: isDark ? "#3D3D3D" : "#f1f1f1" },
                        xaxis: {
                            ...chartOptions.xaxis,
                            labels: {
                                style: { colors: isDark ? "#B0B0B0" : "#666" }
                            }
                        },
                        yaxis: {
                            ...chartOptions.yaxis,
                            labels: {
                                style: { colors: isDark ? "#B0B0B0" : "#666" }
                            }
                        }
                    }}
                    series={chartSeries}
                    type="line"
                    height={350}
                />
            </div>
        </div>
  );
}