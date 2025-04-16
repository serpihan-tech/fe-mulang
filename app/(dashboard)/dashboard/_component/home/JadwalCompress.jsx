import { Location } from "iconsax-react";
import Image from "next/image";

export default function JadwalCompress({
  startTime,
  endTime,
  bgColor,
  title,
  status,
  statusColor,
  statusTextColor = "text-white",
  place,
  teacherName
}) {
  return (
    <div className="flex w-full space-x-4">
      {/* Waktu */}
      <div className="flex flex-col items-center justify-center space-y-1">
        <span className="text-center text-[#7f7f7f] text-xs md:text-sm font-semibold">{startTime}</span>
        <div className="h-full border-dashed border-gray-400 border-[1.5px]" />
        <span className="text-center text-[#7f7f7f] text-xs md:text-sm font-semibold">{endTime}</span>
      </div>

      {/* Card Jadwal */}
      <div className={`w-full px-4 py-2 space-y-2 md:space-y-3 rounded-md ${bgColor}`}>
        <div className="w-full flex justify-between items-center">
          <p className="text-[#0841e2] text-xs md:text-sm font-semibold">
            {title} ({startTime} - {endTime})
          </p>

          {/* Hanya tampilkan status jika ada */}
          {status && (
            <div className={`px-2 py-1 rounded-md ${statusColor}`}>
              <p className={`${statusTextColor} text-[8px] font-semibold`}>{status}</p>
            </div>
          )}
        </div>

        {/* Lokasi */}
        <div className="flex space-x-2 items-center">
          <Location color="#0841E2" variant="Bold" size="24" className="w-4 h-4 md:w-6 md:h-6" />
          <p className="text-black text-xs md:text-sm font-normal">{place}</p>
        </div>

        {/* Guru */}
        <div className="flex space-x-2 items-center">
          <Image src="/svg/teacher.svg" alt="teacher" width={24} height={24} className="w-4 h-4 md:w-6 md:h-6"/>
          <p className="text-black text-xs md:text-sm font-normal">{teacherName}</p>
        </div>
      </div>
    </div>
  );
}
