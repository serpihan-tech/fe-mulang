import Presensi from "../home/Presensi";
import Periode from "../home/Periode";
import JadwalMengajar from "../home/JadwalMengajar";
import Informasi from "../home/Informasi";
import Card2 from "../home/Card2";
import { ArrowRight2, Book, People } from "iconsax-react";
import CalendarComponent from "../home/CalendarComponent";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from 'react';


export default function TeacherDashboard() {
  const message = sessionStorage.getItem("come_first");
  useEffect(() => {
    if (message) {
      toast.success(message);
      sessionStorage.removeItem("come_first");
    }
  }, []);
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

            <div className="w-full flex items-center justify-between mt-5">
              <h1 className="text-black text-lg font-semibold">Jadwal Mengajar</h1>
            </div>
            <JadwalMengajar/>
          </div>
          
          <div>
            <Periode/>
            <Informasi/>
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
  