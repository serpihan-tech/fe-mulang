import { useEffect, useState } from "react";
import JadwalSiswa from "./JadwalSiswa";
import moment from "moment";
import Lottie from "lottie-react";
import animationData from "../../../../../public/animation/Loading.json";

export default function JadwalHariIni({ scheduleData }) {
  const [loading, setLoading] = useState(true);
  const today = new Intl.DateTimeFormat("id-ID", { weekday: "long" }).format(new Date());

  const bgColors = ["bg-[#e1edff]", "bg-[#f8ffe1]", "bg-[#ffe8e8]", "bg-[#e8ffec]"];
  const statusColors = {
    done: "bg-[#0e9035]",
    ongoing: "bg-[#0841e2]",
    soon: "bg-[#ffcf43] text-black",
  };

  useEffect(() => {
    setLoading(false);
  }, [scheduleData]);

  const getStatus = (startTime, endTime) => {
    const now = moment();
    const start = moment(startTime, "HH:mm:ss");
    const end = moment(endTime, "HH:mm:ss");

    if (now.isBetween(start, end)) return "ongoing";
    if (now.isAfter(end)) return "done";
    return "soon";
  };

  return (
    <div className="w-full space-y-7 my-6">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-black text-lg font-semibold">Jadwal Hari ini</h1>
      </div>
      <div className="w-full space-y-8">
        {loading ? (
          <Lottie
            animationData={animationData}
            className="flex justify-center items-center"
            loop={true}
          />
        ) : scheduleData && scheduleData.length > 0 ? (
          scheduleData
            .sort((a, b) => moment(a.startTime, "HH:mm:ss") - moment(b.startTime, "HH:mm:ss")) // Sorting berdasarkan start_time
            .map((item, index) => {
              const status = getStatus(item.startTime, item.endTime);
              return (
                <JadwalSiswa
                  key={item.id}
                  startTime={moment(item.startTime, "HH:mm:ss").format("HH:mm")}
                  endTime={moment(item.endTime, "HH:mm:ss").format("HH:mm")}
                  bgColor={bgColors[index % bgColors.length]}
                  title={item.module.name}
                  statusColor={statusColors[status]}
                  status={status.charAt(0).toUpperCase() + status.slice(1)}
                  place={item.room.name}
                  teacherName={item.module.teacher.name}
                />
              );
            })
        ) : (
          <p>Tidak ada jadwal untuk hari ini</p>
        )}
      </div>
    </div>
  );
}
