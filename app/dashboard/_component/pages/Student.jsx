import Periode from "../home/Periode";
import HomeCalendar from "../home/HomeCalendar";
import JadwalMengajar from "../home/JadwalMengajar";
import Informasi from "../home/Informasi";
import Kehadiran from "../home/Kehadiran";
import JadwalHariIni from "../home/JadwalHariIni";

export default function StudentDashboard() {
  return (
    <>
      
      <div className="z-0 transition">
      
        <div className="bg-[#FAFAFA]  dark:bg-black flex pt-8 px-5 space-x-6 ">
          
          <div className="w-2/3 px-4">
            <Kehadiran/>

            <JadwalHariIni/>
          </div>
          
          <div className="w-1/3 pe-8">
            <Periode/>
            <Informasi/>
            <HomeCalendar/>
          </div>
        </div>
      </div>  
    </>
  );
}
  