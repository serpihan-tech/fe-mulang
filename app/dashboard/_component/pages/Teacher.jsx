import { Book, Profile2User } from "iconsax-react";
import SumCard from "../home/SumCard";
import Presensi from "../home/Presensi";
import Periode from "../home/Periode";
import HomeCalendar from "../home/HomeCalendar";

export default function TeacherDashboard() {
  return (
    <>
      
      <div className="z-0 transition">
      
        <div className="bg-[#FAFAFA]  dark:bg-black flex pt-8 px-6 gap-5">
          
          <div>
            <div className="flex gap-5">
              <SumCard icon={Book} value={2} label="Total Siswa"/>
              <SumCard icon={Profile2User} value={2} label="Total Guru"/>
            </div>

            <Presensi/>
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
  