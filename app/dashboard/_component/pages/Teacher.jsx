import { Book, Profile2User } from "iconsax-react";
import Card2 from "../home/Card2";
import Presensi from "../home/Presensi";
import Periode from "../home/Periode";
import HomeCalendar from "../home/HomeCalendar";
import JadwalMengajar from "../home/JadwalMengajar";
import Informasi from "../home/Informasi";
<<<<<<< Updated upstream
=======
import Card2 from "../home/Card2";
import { Book, People } from "iconsax-react";
>>>>>>> Stashed changes

export default function TeacherDashboard() {
  return (
    <>
      
      <div className="z-0 transition">
      
        <div className="bg-[#FAFAFA]  dark:bg-black flex pt-8 px-6 gap-5 ">
          
<<<<<<< Updated upstream
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
=======
          <div className="px-4">
            <div className="w-full flex gap-6">
              <Card2
                bgColor={"bg-indigo-200"}
                colorBehind={"bg-[#0841e2]"}
                icon={Book}
                value={"6"}
                label={"Kelas"}
                className="w-1/2"
              />
              <Card2
                bgColor={"bg-orange-100"}
                colorBehind={"bg-amber-300"}
                icon={People}
                value={"160"}
                label={"Siswa"}
                className="w-1/2"
>>>>>>> Stashed changes
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
  