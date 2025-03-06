import { Location} from "iconsax-react";
import Image from "next/image";

export default function JadwalSiswa({
  startTime,
  endTime,
  bgColor,
  title,
  statusColor,
  status,
  statusTextColor="text-white",
  place,
  teacherName
}) {
  return (
    <div className="flex w-full space-x-6">
      <div className="flex flex-col items-center justify-center space-y-1">
        <span className="text-center text-[#7f7f7f] text-lg font-bold">{startTime}</span>
        <div className="h-full border-dashed border-gray-400 border-[1.5px]" />
        <span className="text-center text-[#7f7f7f] text-lg font-bold">{endTime}</span>
      </div>
      <div className={`w-full px-[21.4px] py-3 space-y-[18px] rounded-[15.05px] ${bgColor}`}>
        <div className="w-full flex justify-between">
          <p className="text-[#0841e2] text-lg font-bold">{title} ({startTime} - {endTime})</p>
          <div className={`px-3 py-1.5 rounded-[15.05px] ${statusColor}`}>
            <p className={`${statusTextColor} text-[10px] font-bold`}>{status}</p>
          </div>
        </div>
        <div className="flex space-x-[6px] items-center">
          <Location color="#0841E2" variant="Bold" size="37" />
          <p className="text-black text-md font-normal">{place}</p>
        </div>
        <div className="flex space-x-[6px] items-center">
          <Image
            src="/svg/teacher.svg"
            alt="teacher"
            width={37}
            height={37}
          />
          <p className="text-black text-md font-normal">{teacherName}</p>
        </div>
      </div>
    </div>
  )
} 