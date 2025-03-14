import { Book, Profile2User } from "iconsax-react";
import Card2 from "../home/Card2";
import Presensi from "../home/Presensi";
import Periode from "../home/Periode";
import HomeCalendar from "../home/HomeCalendar";
import JadwalMengajar from "../home/JadwalMengajar";
import Informasi from "../home/Informasi";
import Card2 from "../home/Card2";
import { Book, People } from "iconsax-react";

export default function TeacherDashboard() {
  return (
    <>
      
      <div className="z-0 transition">
      
        <div className="bg-[#FAFAFA]  dark:bg-black flex pt-8 px-6 gap-5 ">
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
  