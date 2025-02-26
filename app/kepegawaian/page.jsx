"use client";
import { People, Teacher, Book, Award } from "iconsax-react";
import SumCard from "../dashboard/_component/home/SumCard";
import ChartAttendance from "../dashboard/_component/home/ChartAttendance";
import Pusatinformasi from "../dashboard/_component/home/PusatInformasi";
import Periode from "../dashboard/_component/home/Periode";
import HomeCalendar from "../dashboard/_component/home/HomeCalendar";

export default function AdminDashboard() {
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