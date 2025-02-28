"use client";
import dynamic from 'next/dynamic';
import { People, Teacher, Book, Award } from "iconsax-react";
import SumCard from "../home/SumCard";
import ChartAttendance from "../home/ChartAttendance";
import Periode from "../home/Periode";
import Pusatinformasi from '../home/PusatInformasi';
import HomeCalendar from '../home/HomeCalendar';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

export default function AdminDashboard() {
  
  const message = sessionStorage.getItem("come_first");
  if(message){
    useEffect(() => {
      toast.success(message);
      sessionStorage.removeItem("come_first")
    }, []);
  }
  
  return (
    <>
      
      <div className="z-0 transition">
      
        <div className="bg-[#FAFAFA]  dark:bg-black flex pt-8 px-6 gap-5">
          
          <div>
            <div className="flex gap-5">
              <SumCard icon={People} value="100" label="Total Siswa"/>
              <SumCard icon={Teacher} value="100" label="Total Guru"/>
              <SumCard icon={Book} value="100" label="Total Mapel"/>
              <SumCard icon={Award} value="100" label="Total Kelulusan"/>
            </div>

            <ChartAttendance/>
            <Pusatinformasi/>
          </div>
          
          <div>
            <Periode/>
            <HomeCalendar/>
          </div>
        </div>
      </div>  
    </>
  );
}