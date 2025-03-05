import { Book, Profile2User } from "iconsax-react";
import Card2 from "../home/Card2";
import Presensi from "../home/Presensi";
import Periode from "../home/Periode";
import HomeCalendar from "../home/HomeCalendar";
import JadwalMengajar from "../home/JadwalMengajar";
import Informasi from "../home/Informasi";

export default function TeacherDashboard() {
  return (
    <>
      
      <div className="z-0 transition">
      
        <div className="bg-[#FAFAFA]  dark:bg-black flex pt-8 px-6 gap-5 ">
          
          <div className="px-8 space-y-5">
            <div className="flex gap-5">
              <Card2 
                icon={Book} 
                value={6} 
                label="Kelas"
                bgColor={"bg-[#ced9f9]"}
                colorBehind={"bg-pri-main"}
              />
              <Card2 
                icon={Profile2User} 
                value={160} 
                label="Siswa"
                bgColor={"bg-[#fff5d9]"}
                colorBehind={"bg-[#FFCF43]"}
              />
            </div>

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
  