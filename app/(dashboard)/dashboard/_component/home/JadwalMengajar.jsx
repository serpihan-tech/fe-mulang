'use client'
import { useEffect, useState } from "react";
import Jadwal from "./Jadwal";
import moment from "moment";


export default function JadwalMengajar({day, schedule=[]}) {
  const today = new Intl.DateTimeFormat("id-ID", { weekday: "long" }).format(
    new Date()
  );

  const [absenceAllowed, setAbsenceAllowed] = useState(false)

  const now = moment();

  const bgColors = [
    "bg-[#e1edff]",
    "bg-[#f8ffe1]",
    "bg-[#ffe8e8]",
    "bg-[#e8ffec]",
  ]
  useEffect(() => {
    if (day === today) {
      setAbsenceAllowed(true);
    } else {
      setAbsenceAllowed(false);
    }
  }, [day]);



  return (
    <div className="flex flex-col items-center py-2 md:py-4 rounded-lg min-w-[320px] mx-4">
      <h2 className="text-sm md:text-base lg:text-lg text-pri-main font-semibold mb-2">{day}</h2>
      <div className="w-full space-y-5">
        {schedule.length > 0 ? (
          schedule
            .sort(
              (a, b) =>
                moment(a.start_time, "HH:mm:ss").valueOf() -
                moment(b.start_time, "HH:mm:ss").valueOf()
            )
            .map((item, index) => {
              let status = "";
              let statusColor = "";
              let statusTextColor = "text-white";

              // Jika hari ini, tambahkan status
              if (day === today) {
                const startTime = moment(item.startTime, "HH:mm:ss");
                const endTime = moment(item.endTime, "HH:mm:ss");
                

                if (now.isAfter(endTime)) {
                  status = "Done";
                  statusColor = "bg-green-500";
                } else if (now.isBetween(startTime, endTime)) {
                  status = "Ongoing";
                  statusColor = "bg-yellow-500";
                } else {
                  status = "Soon";
                  statusColor = "bg-blue-500";
                }
              }

              return (
                <Jadwal
                  key={item.id}
                  startTime={moment(item.startTime, "HH:mm:ss").format("HH:mm")}
                  endTime={moment(item.endTime, "HH:mm:ss").format("HH:mm")}
                  bgColor={bgColors[index % bgColors.length]}
                  title={item.module?.name}
                  place={item.room?.name}
                  status={status} // Status hanya untuk hari ini
                  statusColor={statusColor} // Warna status
                  statusTextColor={statusTextColor}
                  class_name={item.class.name}
                  absenceAllowed={absenceAllowed}
                  module_id={item.moduleId}
                  class_id={item.classId}
                  schedule_id={item.id}
                />
              );
            })
        ) : (
          <p className="text-black dark:text-slate-100 dark:bg-dark_net-ter py-2 px-3 -ms-5 -mt-9 -me-3 rounded-lg">Tidak ada jadwal</p>
        )}
      </div>
    </div>
  )
}