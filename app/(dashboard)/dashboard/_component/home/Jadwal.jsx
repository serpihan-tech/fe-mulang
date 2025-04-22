import { Location } from "iconsax-react";

export default function Jadwal({
  startTime,
  endTime,
  bgColor,
  title,
  statusColor,
  status,
  statusTextColor="text-white",
  place
}) {
  return (
    <div className="flex w-full space-x-3 md:space-x-4 lg:space-x-6">
      <div className="flex flex-col items-center justify-center space-y-1">
        <span className="text-center text-[#7f7f7f] text-xs md:text-base lg:text-lg font-bold">{startTime}</span>
        <div className="h-full border-dashed border-gray-400 border-[1.5px]" />
        <span className="text-center text-[#7f7f7f] text-xs md:text-base lg:text-lg font-bold">{endTime}</span>
      </div>
      <div className={`w-full px-4 md:px-[21.4px] py-2 md:py-3 space-y-3 lg:space-y-[18px] rounded-[15.05px] ${bgColor}`}>
        <div className=" flex items-center justify-between lg:mb-0">
          <p className="text-[#0841e2] text-sm md:text-base lg:text-lg font-bold">{title} ({startTime} - {endTime})</p>
          <div className={`px-2 md:px-3 py-1.5 rounded-[15.05px] ${statusColor}`}>
            <p className={`${statusTextColor} text-[10px] font-bold`}>{status}</p>
          </div>
        </div>
        <div className="flex space-x-[6px] items-center">
          <Location color="#0841E2" variant="Bold" className="w-6 h-6 md:w-8 md:h-8 lg:w-[37px] lg:h-[37px]" />
          <p className="text-black text-xs md:text-sm lg:text-base font-normal">{place}</p>
        </div>
        <div className="flex space-x-2 md:space-x-3 lg:space-x-[22px]">
          <button className="px-2 md:px-4 py-2 lg:px-8 lg:py-3 bg-[#0841e2] rounded-md lg:rounded-[10px] justify-center items-center inline-flex text-white text-xs lg:text-sm font-semibold">
            Mulai Absensi
          </button>
          <button className="px-2 md:px-4 py-2 lg:px-8 lg:py-3 bg-[#ffcf43] rounded-md lg:rounded-[10px] justify-center items-center inline-flex text-xs lg:text-sm font-semibold">
            Buat Pengumuman
          </button>
        </div>
      </div>
    </div>
  )
} 