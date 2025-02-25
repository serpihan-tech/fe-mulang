"use client";
import React, { useState } from "react";
import dynamic from 'next/dynamic';
import { People, Teacher, Book, Award, Calendar } from "iconsax-react";
import SumCard from "../SumCard";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function AdminDashboard() {
  const [timePeriod, setTimePeriod] = useState('mingguan');
  const [category, setCategory] = useState('siswa');

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
      data: data[timePeriod][category].hadir
    },
    {
      name: "Tidak Hadir",
      data: data[timePeriod][category].tidakHadir
    }
  ];

  return (
    <>
      <div className="z-0">
        <div className="bg-[#FAFAFA] dark:bg-black flex pt-8 px-6 gap-5">
          <div>
            <div className="flex gap-5">
              <SumCard icon={People} value="100" label="Total Siswa"/>
              <SumCard icon={Teacher} value="100" label="Total Guru"/>
              <SumCard icon={Book} value="100" label="Total Mapel"/>
              <SumCard icon={Award} value="100" label="Total Kelulusan"/>
            </div>

            <div className="mt-5 bg-white px-5 py-4 rounded-md">
              <div className="flex justify-between items-center mb-4">
                <p className="text-lg font-bold">Kehadiran</p>
                <div className="flex gap-2">
                  <select className="border rounded p-1" onChange={(e) => setTimePeriod(e.target.value)} value={timePeriod}>
                    <option value="mingguan">Mingguan</option>
                    <option value="bulan">Bulanan</option>
                  </select>
                  <select className="border rounded p-1" onChange={(e) => setCategory(e.target.value)} value={category}>
                    <option value="siswa">Siswa</option>
                    <option value="guru">Guru</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4 mb-4">
                <div className="h-[15px] justify-start items-center gap-2.5 inline-flex">
                  <div className="w-2.5 h-2.5 bg-[#0e9035] rounded-full" />
                  <p className="text-black text-xs font-medium">Hadir</p>
                </div>
                <div className="h-[15px] justify-start items-center gap-2.5 inline-flex">
                  <div className="w-2.5 h-2.5 bg-[#DC1010] rounded-full" />
                  <p className="text-black text-xs font-medium">Tidak Hadir</p>
                </div>
              </div>
              <div className="mixed-chart">
                <Chart
                  options={chartOptions}
                  series={chartSeries}
                  type="line"
                  width="700"
                />
              </div>
            </div>
            <div className="mt-5 bg-white px-5 py-4 rounded-md">
              <p className="text-lg font-bold">Pusat Informasi</p>
              
            </div>
          </div>
          
          <div>
            <div className="w-[332px] h-16 flex p-3.5 rounded-md bg-white gap-5">
              <Calendar className="w-7.5 flex items-center justify-center" color="black"/>
              <div>
                <p className="text-base font-bold">Periode</p>
                <p className="text-[10px] font-medium">Genap 2024-2025</p>
              </div>
            </div>
            <div className="w-[332px] h-16 p-3.5 mt-[27px] rounded-md bg-white gap-5">
              <div>
                <p className="text-lg font-bold">Kalender</p>
              </div>
              <div>
                <p className="text-base font-medium text-[#333333]">Upcoming Event</p>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </>
  );
}