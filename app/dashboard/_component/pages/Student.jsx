import Periode from "../home/Periode";
import HomeCalendar from "../home/HomeCalendar";
import JadwalMengajar from "../home/JadwalMengajar";
import Informasi from "../home/Informasi";
import Kehadiran from "../home/Kehadiran";
import JadwalHariIni from "../home/JadwalHariIni";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { getStudentPresence, getStudentSchedule } from "@/app/api/siswa/ApiSiswa";

export default function StudentDashboard() {
  const message = sessionStorage.getItem("come_first");
  const datasiswa = sessionStorage.getItem("profile_data");
  const [scheduleData, setScheduleData] = useState(null);
  const [presenceData, setPresenceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const today = new Intl.DateTimeFormat('id-ID', { weekday: 'long' }).format(new Date());

  useEffect(() => {
    if (message) {
      toast.success(message);
      sessionStorage.removeItem("come_first");
    }

    if (datasiswa) {
      const datasiswas = JSON.parse(datasiswa);
      const studentId = datasiswas.data.profile.details.studentId;

      if (!studentId) {
        console.error("Student ID tidak ditemukan di sessionStorage");
        setLoading(false);
        return;
      }

      const fetchPresence = async () => {
        try {
          const data = await getStudentPresence(studentId);
          setPresenceData(data.presenceData);
        } catch (error) {
          console.error("Error fetching presence data:", error);
          toast.error("Error fetching presence data");
        }
      };

      const fetchSchedule = async () => {
        try {
          const data = await getStudentSchedule(studentId);
          if (Array.isArray(data.schedule)) {
            const filteredData = data.schedule.filter(
              (item) => item.days.toLowerCase() === today.toLowerCase()
            );
            setScheduleData(filteredData);
          } else {
            console.error("Data schedule bukan array atau kosong:", data.schedule);
            setScheduleData([]);
          }
        } catch (error) {
          console.error("Error fetching schedule data:", error);
          toast.error("Error fetching schedule data");
        } finally {
          setLoading(false);
        }
      };

      fetchPresence();
      fetchSchedule();
    }
  }, []);
  console.log("data jadwal:",scheduleData)

  if (loading) return <p>Loading...</p>;
  if (!presenceData) return <p>Data tidak ditemukan</p>;

  return (
    <>
      <div className="z-0 transition">
        <div className="bg-[#FAFAFA] dark:bg-black flex pt-8 px-5 space-x-6">
          <div className="w-2/3 px-4">
            <Kehadiran
              total_presence={presenceData.total}
              presence={presenceData.hadir}
              non_presence={presenceData.tidak_hadir}
            />

{scheduleData && scheduleData.length > 0 && (
  <JadwalHariIni scheduleData={scheduleData} />
)}

          </div>

          <div className="w-1/3 pe-8">
            <Periode />
            <Informasi />
            <HomeCalendar />
          </div>
        </div>
      </div>
    </>
  );
}
