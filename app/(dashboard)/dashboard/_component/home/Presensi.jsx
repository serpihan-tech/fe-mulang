import { format } from "date-fns"
import { useEffect, useState } from "react"
import { id } from 'date-fns/locale';
import SmallButton from "@/app/component/SmallButton";
import { CalendarTick } from "iconsax-react";
import { AbsenHariIniGuru } from "@/app/api/guru/ApiGuru";
import { toast } from "react-toastify";
import { useLoading } from "@/context/LoadingContext";
import { edit_absen_guru, tambah_absen_guru } from "@/app/api/ApiKepegawaian";
import SuccessUpdatePopUp from "@/app/component/SuccessUpdatePopUp";


export default function Presensi () {
  const [isAttendance, setAttendance] = useState(false)
  const [isDoneAttendance, setDoneAttendance] = useState(false)
  const [checkIn, setCheckIn] = useState(null)
  const [oldCheckIn,setOldCheckIn] = useState(null)
  const [scheduleId, setSceduleId] =useState(null)
  const [checkOut, setCheckOut] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { setIsLoading } = useLoading()
  const data = typeof window !== "undefined" ? JSON.parse(sessionStorage.getItem("profile_data")) : null;
  const teacherId = data?.data?.profile?.id

  const day = (new Intl.DateTimeFormat("id-ID", { weekday: "long" }).format(
    new Date())+", "+(format(new Date(), 'dd MMMM yyyy', { locale: id }))
  );

  const today = format(new Date(), 'yyyy-MM-dd')
  const currentTime = format(new Date(), 'HH:mm:ss')

  const fetchDataAbsen = async () => {
    try {
      const data = await AbsenHariIniGuru();
      const dataAbsence = data?.teacherAbsence
      console.log("Data absen: ",data)
      if(dataAbsence?.checkInTime){
        setOldCheckIn(dataAbsence.checkInTime)
        setSceduleId(dataAbsence.id)
        setAttendance(true)
        const [hour, minute] = dataAbsence.checkInTime.split(":");
        const formattedTime = `${hour}:${minute}`;
        setCheckIn(formattedTime)
      } else (
        setCheckIn("-")
      )

      if(dataAbsence?.checkOutTime){
        setDoneAttendance(true)
        const [hour, minute] = dataAbsence.checkOutTime.split(":");
        const formattedTime = `${hour}:${minute}`;
        setCheckOut(formattedTime)
      } else (
        setCheckOut("-")
      )

    } catch (error) {
      toast.error(error.message)
    }
  };

  const confirmCheckIn = async () => {
    if (!teacherId) {
      toast.error("Data kosong!");
      return;
    }

    const payload = {
      teacher_id: teacherId,
      date: today,
      status: "Hadir",
      check_in_time: currentTime,
      check_out_time: null,
    };

    try {
      setIsLoading(true);
      const response = await tambah_absen_guru(payload);
      if (response) {
        console.log("response: ",response)
        setSceduleId(response.teacherAbsence.id)
        setIsSuccess(true)
        fetchDataAbsen();
        setTimeout(() => setIsSuccess(false), 1200);
      }
      
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  } 

  const confirmCheckOut = async () => {
    if (!teacherId) {
      toast.error("Data kosong!");
      return;
    }

    const payload = {
      date: today,
      status: "Hadir",
      check_in_time: oldCheckIn,
      check_out_time: currentTime,
    };

    try {
      setIsLoading(true);
      const response = await edit_absen_guru(scheduleId,payload);
      if (response) {
        setIsSuccess(true)
        fetchDataAbsen();
        setTimeout(() => setIsSuccess(false), 1200);
      }
      
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchDataAbsen()
    console.log("Data: ", teacherId)
    console.log(today, currentTime)
  }, [])

  
  return (
    <div className="w-full px-3 py-3 md:px-4 md:py-5 space-y-4 lg:space-y-5 rounded-[15px] border-[0.5px] border-[#aaaaaa] dark:bg-dark_net-ter dark:border-none">
      
      {/* Pop-up Sukses */}
      {isSuccess && (
          <div className="z-30 fixed inset-0 bg-black/50 flex justify-center items-center">
            <SuccessUpdatePopUp />
          </div>
        )}
      
      <div className="w-full flex items-center justify-between">
        <div className="space-y-1 lg:space-y-2">
          <h1 className="text-black dark:text-slate-100 text-sm md:text-base lg:text-lg font-semibold">Presensi Harian</h1>
          <p className="text-[#7f7f7f] dark:text-slate-300 text-[10px] md:text-xs lg:text-base font-normal ">{day}</p>
        </div>
        {isAttendance ? 
          <SmallButton 
            onClick={confirmCheckOut}
            icon={CalendarTick}
            iconSize = {24}
            bgColor = "bg-pri-main"
            colorIcon = {isDoneAttendance? "black" : "currentColor" }
            title = "Presensi keluar"
            bgColorDisabled= "bg-gray-400"
            textColor = "text-white"
            disabled = {isDoneAttendance}
            hover = "hover:bg-pri-hover"
            minBtnSize = "min-w-fit "
          /> :
          <SmallButton 
            onClick={confirmCheckIn}
            icon={CalendarTick}
            iconSize = {24}
            bgColor = "bg-pri-main"
            colorIcon = "currentColor"
            title = "Presensi Masuk"
            hover = "hover:bg-pri-hover"
            textColor = "text-white"
            //disabled = false
            minBtnSize = "min-w-fit"
          />
        }
        
      </div>
      <div className="w-full flex space-x-3 md:space-x-5">
        <div className="w-1/2 py-2 px-4 space-y-1 lg:space-y-2 bg-[#cee8d6] rounded-[10px] flex-col justify-start items-start inline-flex">
          <p className="text-black text-xs md:text-sm lg:text-base font-semibold mb-">Jam Masuk</p>
          <p className="text-black text-base md:text-lg lg:text-xl font-semibold">{checkIn}</p>
        </div>
        <div className="w-1/2 py-2 px-4 space-y-1 lg:space-y-2 bg-[#fff5d9] rounded-[10px] flex-col justify-start items-start inline-flex">
          <p className="text-black text-xs md:text-sm lg:text-base font-semibold">Jam Keluar</p>
          <p className="text-black text-base md:text-lg lg:text-xl font-semibold">{checkOut}</p>
        </div>
      </div>
      
    </div>
  )
}