"use client";
import dynamic from 'next/dynamic';
import { People, Teacher, Book, Award, ArrowRight2 } from "iconsax-react";
import SumCard from "../home/SumCard";
import ChartAttendance from "../home/ChartAttendance";
import Periode from "../home/Periode";
import Pusatinformasi from '../home/PusatInformasi';
import { useEffect, useState, useCallback } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { AdminDashboardApi } from '@/app/api/admin/ApiDashboard';
import CalendarComponent from '../home/CalendarComponent';
import { useLoading } from '@/context/LoadingContext';

export default function AdminDashboard() {
  
  const message = sessionStorage.getItem("come_first");
  
  
  const [dashboardData, setDashboardData] = useState(null);
  const { setIsLoading } = useLoading();

  const fetchDashboard = async () => {
    try {
      const data = await AdminDashboardApi();
      if (data) {
        setDashboardData(data);
        
      }
    } catch (error) {
      toast.error("Gagal memuat data dashboard.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {

    if(message){
      toast.success(message);
      sessionStorage.removeItem("come_first")
    }
    fetchDashboard();
  }, []);
  console.log("dashboardata: ",dashboardData)

  
  
  return (
    <>
      
      <div className="z-0 transition">
      
        <div className="bg-[#FAFAFA] dark:bg-dark_net-quar lg:flex gap-5">
          
          <div className="w-full lg:w-2/3 lg:px-4 space-y-5 lg:space-y-9">
            <div className="w-full grid grid-cols-2 gap-2 lg:gap-0 md:grid-cols-4 space-x-2 lg:space-x-5">
              <SumCard icon={People} value={dashboardData?.data.total_students} label="Total Siswa"/>
              <SumCard icon={Teacher} value={dashboardData?.data.total_teachers} label="Total Guru"/>
              <SumCard icon={Book} value={dashboardData?.data.total_modules} label="Total Mapel"/>
              <SumCard icon={Award} value={dashboardData?.data.total_alumni} label="Total Kelulusan"/>
            </div>

            <ChartAttendance/>
            <Pusatinformasi/>
          </div>
          
          <div className="w-full lg:w-1/3 mt-4 md:mt-7 lg:mt-0">
            <Periode
              className="w-full"
            />
            <div className="w-full max-h-max p-3.5 mt-4 rounded-md bg-white gap-5">
              <div>
                <p className="text-lg font-bold">Kalender</p>
                <CalendarComponent icon={ArrowRight2} buttonBorder={"border-[0.5px] border-[#CCC]"}/>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </>
  );
}