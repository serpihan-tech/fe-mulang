"use client";
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import Dropdown from "@/app/component/Dropdown";
import { useTheme } from "@/provider/ThemeProvider";
import { data_grafik_kehadiran } from "@/app/api/admin/ApiDashboard";
import { toast } from "react-toastify";
import { useSemester } from "@/provider/SemesterProvider";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function ChartAttendance() {
  const { theme } = useTheme();
  const { semesterId } = useSemester();
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
  const [isZoomed, setIsZoomed] = useState(false);

  // Reset zoom state when changing time period
  useEffect(() => {
    setIsZoomed(false);
  }, [selectedTime.value]);

  // Calculate max value for dynamic y-axis
  const getMaxValue = () => {
    const processedData = getChartData();
    const hadirValues = processedData.hadir.map(item => item.value) || [];
    const tidakHadirValues = processedData.tidakHadir.map(item => item.value) || [];
    const maxValue = Math.max(...hadirValues, ...tidakHadirValues);
    return Math.ceil(maxValue * 1.2 / 10) * 10;
  };

  // Aggregate data by week for monthly view
  const aggregateWeeklyData = (data) => {
    const weeklyData = {};
    data.forEach(item => {
      const date = new Date(item.date);
      const weekNumber = Math.ceil(date.getDate() / 7);
      if (!weeklyData[weekNumber]) {
        weeklyData[weekNumber] = 0;
      }
      weeklyData[weekNumber] += item.value;
    });
    return Object.entries(weeklyData).map(([week, value]) => ({
      date: `Minggu ${week}`,
      value: value
    }));
  };

  // Group data by month for semester view
  const groupByMonth = (data) => {
    const monthlyData = {};
    data.forEach(item => {
      const date = new Date(item.date);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          date: `${date.getMonth() + 1}/${date.getFullYear()}`,
          value: 0,
          details: []
        };
      }
      monthlyData[monthKey].value += item.value;
      monthlyData[monthKey].details.push(item);
    });
    return Object.values(monthlyData);
  };

  // Format date based on selected time period
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (selectedTime.value === 'minggu') {
      const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      return days[date.getDay()];
    } else if (selectedTime.value === 'bulan') {
      return dateString; // Already formatted as "Minggu X" from aggregateWeeklyData
    } else {
      return dateString; // Already formatted as "MM/YYYY" from groupByMonth
    }
  };

  // Get categories and data based on selected time period
  const getChartData = () => {
    const data = chartData[selectedCategory.value] || { hadir: [], tidakHadir: [] };
    
    if (selectedTime.value === 'bulan') {
      return {
        hadir: aggregateWeeklyData(data.hadir),
        tidakHadir: aggregateWeeklyData(data.tidakHadir)
      };
    } else if (selectedTime.value === 'semester') {
      // Always group by month for semester view unless zoomed in
      return {
        hadir: groupByMonth(data.hadir),
        tidakHadir: groupByMonth(data.tidakHadir)
      };
    }
    return data;
  };

  const processedData = getChartData();

  const chartOptions = {
    chart: {
      id: "basic-bar",
      events: {
        zoomed: (chartContext, { xaxis }) => {
          if (selectedTime.value === 'semester') {
            setIsZoomed(true);
          }
        },
        scrolled: (chartContext, { xaxis }) => {
          if (selectedTime.value === 'semester') {
            setIsZoomed(true);
          }
        },
        resetZoom: () => {
          if (selectedTime.value === 'semester') {
            setIsZoomed(false);
          }
        }
      }
    },
    xaxis: {
      categories: processedData.hadir.map(item => formatDate(item.date)),
      labels: {
        style: { colors: isDark ? "#B0B0B0" : "#666" }
      }
    },
    yaxis: {
      min: 0,
      max: getMaxValue(),
      labels: {
        formatter: (value) => Math.round(value),
        style: { colors: isDark ? "#B0B0B0" : "#666" }
      }
    },
    colors: ['#0E9035', '#DC1010'],
    stroke: {
      width: 3
    },
    legend: {
      show: false
    }
  };

  const chartSeries = [
    {
      name: "Hadir",
      data: processedData.hadir.map(item => item.value)
    },
    {
      name: "Tidak Hadir",
      data: processedData.tidakHadir.map(item => item.value)
    }
  ];

  const fetchData = async (periode = selectedTime.value, tahunAjar = semesterId) => {
    try {
      const response = await data_grafik_kehadiran(periode, tahunAjar)
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
  },[selectedTime, semesterId])

  return (
    <div className={`mt-5 px-5 py-4 rounded-md  ${isDark ? "bg-dark_net-ter " : "bg-white"}`}>
            <div className="flex justify-between items-center mb-4">
                <p className={`text-lg font-bold ${isDark ? "text-slate-100" : "text-black"}`}>Kehadiran</p>
                <div className="flex gap-2">
                    <Dropdown
                        options={timeOptions}
                        value={selectedTime}
                        onChange={setSelectedTime}
                        wideDropdown="w-32"
                        className={`z-30 h-10 p-2 rounded-md border ${isDark ? "bg-[#222222] border-[#ADC0F5] text-[#E0E0E0]" : "bg-white border-gray-200 text-black"}`}
                        dropdownStyle={isDark ? "dark:bg-[#222222] dark:text-[#E0E0E0]" : ""}
                    />
                    <Dropdown
                        options={categoryOptions}
                        value={selectedCategory}
                        onChange={setSelectedCategory}
                        className={`z-30 h-10 p-2 rounded-md border ${isDark ? "bg-[#222222] border-[#ADC0F5] text-[#E0E0E0]" : "bg-white border-gray-200 text-black"}`}
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