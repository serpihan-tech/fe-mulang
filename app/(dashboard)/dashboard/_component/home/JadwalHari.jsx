import JadwalCompress from "./JadwalCompress";
import moment from "moment";

export default function JadwalHari({ day, schedule }) {
  const today = new Intl.DateTimeFormat("id-ID", { weekday: "long" }).format(
    new Date()
  );
  const now = moment();

  const bgColors = [
    "bg-[#e1edff]",
    "bg-[#f8ffe1]",
    "bg-[#ffe8e8]",
    "bg-[#e8ffec]",
  ];

  return (
    <div className="flex flex-col items-center p-2 md:p-4 rounded-lg min-w-[320px] mx-4">
      <h2 className="text-sm md:text-base lg:text-lg text-pri-main dark:text-[#5D8BF8] font-semibold mb-2">{day}</h2>
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
                <JadwalCompress
                  key={item.id}
                  startTime={moment(item.startTime, "HH:mm:ss").format("HH:mm")}
                  endTime={moment(item.endTime, "HH:mm:ss").format("HH:mm")}
                  bgColor={bgColors[index % bgColors.length]}
                  title={item.module.name}
                  place={item.room.name}
                  teacherName={item.module.teacher.name}
                  status={status} // Status hanya untuk hari ini
                  statusColor={statusColor} // Warna status
                  statusTextColor={statusTextColor}
                />
              );
            })
        ) : (
          <p className="text-gray-500">Tidak ada jadwal</p>
        )}
      </div>
    </div>
  );
}
