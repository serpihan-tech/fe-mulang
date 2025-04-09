import Periode from "../home/Periode";
import Informasi from "../home/Informasi";
import Kehadiran from "../home/Kehadiran";
import JadwalHariIni from "../home/JadwalHariIni";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { getStudentPresence, getStudentSchedule } from "@/app/api/siswa/ApiSiswa";
import CalendarComponent from "../home/CalendarComponent";
import { useSemester } from "@/provider/SemesterProvider";
import { ArrowRight2 } from "iconsax-react";
import { useLoading } from "@/context/LoadingContext";
import DataNotFound from "@/app/component/DataNotFound";


export default function StudentDashboard() {
  const message = sessionStorage.getItem("come_first");
  const datasiswa = sessionStorage.getItem("profile_data");
  const [scheduleData, setScheduleData] = useState(null);
  const [presenceData, setPresenceData] = useState(null);
  const { setIsLoading } = useLoading();
  const today = new Intl.DateTimeFormat('id-ID', { weekday: 'long' }).format(new Date());

  useEffect(() => {
    if (message) {
      toast.success(message);
      sessionStorage.removeItem("come_first");
    }

    if (datasiswa) {
      const datasiswas = JSON.parse(datasiswa);
      const studentId = datasiswas.data.profile.details.studentId;
      const userId = datasiswas.data.profile.details.id;

      

      if (!studentId) {
        console.error("Student ID tidak ditemukan di sessionStorage");
        setIsLoading(false);
        return;
      } else {
        sessionStorage.setItem("student_id",studentId);
        sessionStorage.setItem("user_id",userId);

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
          setIsLoading(false);
        }
      };

      fetchPresence();
      fetchSchedule();
    }
  }, []);
  console.log("data jadwal:",scheduleData)
  const studentId= sessionStorage.getItem('student_id')
  console.log(studentId)
  const { semesterId } = useSemester()
  console.log("semester:",semesterId)

  if (!presenceData) return <DataNotFound />;

  return (
    <>
      <div className="z-0 transition">
        <div className="bg-[#FAFAFA] dark:bg-black flex space-x-6">
          <div className="w-2/3 pl-8 pr-4">
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
