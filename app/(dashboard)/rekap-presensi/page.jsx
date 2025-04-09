'use client'
import { useEffect, useState } from "react";
import CalendarPresensi from "./_component/CalendarPresensi";
import { getStudentHistoryPresence } from "@/app/api/siswa/ApiSiswa";
import { toast, ToastContainer } from "react-toastify";

export default function RekapPresensi() {
  const [data, setData] = useState(null)

  const fetchPresenceData = async () => {
    try {
      const data = await getStudentHistoryPresence()
      const dataArray = data.studentsPresence.absences
      setData(dataArray)
    } catch (error) {
      toast.error("Gagal memuat data nilai.")
    }
  };

  useEffect(() => {
    fetchPresenceData();
  }, []);

  
  return (
    <div className="bg-white dark:bg-dark_net-pri p-5 text-black transition lg:flex space-x-[36px]">
      <ToastContainer/>
      <CalendarPresensi dataPresences={data}/>
    </div>
  );
}
