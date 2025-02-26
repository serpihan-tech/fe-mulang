"use client";
import React, { useState } from "react";
import dynamic from 'next/dynamic';
import Dropdown from "@/app/component/Dropdown";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function ChartAttendance() {
  const timeOptions = [
    { label: "Mingguan", value: "mingguan" },
    { label: "Bulanan", value: "bulan" },
  ];

  const categoryOptions = [
    { label: "Siswa", value: "siswa" },
    { label: "Guru", value: "guru" },
  ];

  const [selectedTime, setSelectedTime] = useState(timeOptions[0]);
  const [selectedCategory, setSelectedCategory] = useState(categoryOptions[0]);

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

  const categories = selectedTime.value === 'mingguan' 
    ? ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'] 
    : ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4', 'Minggu 5'];

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
      max: 160,
      tickAmount: 8
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
      data: data[selectedTime.value][selectedCategory.value].hadir
    },
    {
      name: "Tidak Hadir",
      data: data[selectedTime.value][selectedCategory.value].tidakHadir
    }
  ];

  return (
    <div className="mt-5 bg-white dark:bg-black px-5 py-4 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-bold dark:text-white">Kehadiran</p>
        <div className="flex gap-2">
          <Dropdown
            options={timeOptions}
            value={selectedTime}
            onChange={setSelectedTime}
            className="w-32 h-10 p-2 rounded-md bg-white dark:bg-black border border-gray-200"
            dropdownStyle="dark:bg-black dark:text-white"
          />
          <Dropdown
            options={categoryOptions}
            value={selectedCategory}
            onChange={setSelectedCategory}
            className="w-32 h-10 p-2 rounded-md bg-white dark:bg-black border border-gray-200"
            dropdownStyle="dark:bg-black dark:text-white"
          />
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

      <div className="mixed-chart -ms-4">
        <Chart
          className="w-full"
          options={{
            ...chartOptions,
            theme: {
              mode: 'light'
            },
            grid: {
              borderColor: '#f1f1f1',
            },
            xaxis: {
              ...chartOptions.xaxis,
              labels: {
                style: {
                  colors: '#666'
                }
              }
            },
            yaxis: {
              ...chartOptions.yaxis,
              labels: {
                style: {
                  colors: '#666'
                }
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