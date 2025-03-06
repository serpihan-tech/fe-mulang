import { Book, Profile2User } from "iconsax-react";
import Presensi from "../home/Presensi";
import Periode from "../home/Periode";
import HomeCalendar from "../home/HomeCalendar";
import JadwalMengajar from "../home/JadwalMengajar";
import Informasi from "../home/Informasi";
import Kehadiran from "../home/Kehadiran";

export default function TeacherDashboard() {
  return (
    <>
      
      <div className="z-0 transition">
      
        <div className="bg-[#FAFAFA]  dark:bg-black flex pt-8 px-6 gap-5 ">
          
          <div >
            <Kehadiran/>

            <Presensi/>

            <JadwalMengajar/>
          </div>
          
          <div>
            <Periode/>
            <Informasi/>
            <HomeCalendar/>
          </div>
        </div>
      </div>  
    </>
  );
}
  