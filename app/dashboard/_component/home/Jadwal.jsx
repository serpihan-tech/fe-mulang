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
    <div className="flex w-full space-x-6">
      <div className="flex flex-col items-center justify-center space-y-1">
        <span className="text-center text-[#7f7f7f] text-lg font-bold">{startTime}</span>
        <div className="h-full border-dashed border-gray-400 border-[1.5px]" />
        <span className="text-center text-[#7f7f7f] text-lg font-bold">{endTime}</span>
      </div>
      <div className={`w-full px-[21.4px] py-3 space-y-[18px] rounded-[15.05px] ${bgColor}`}>
        <div className="w-full flex justify-between">
          <p className="text-[#0841e2] text-xl font-bold">{title} ({startTime} - {endTime})</p>
          <div className={`px-3 py-1.5 rounded-[15.05px] ${statusColor}`}>
            <p className={`${statusTextColor} text-[10px] font-bold`}>{status}</p>
          </div>
        </div>
        <div className="flex space-x-[6px]">
          <Location color="#0841E2" variant="Bold" size="37" />
          <p className="text-black text-lg font-normal">{place}</p>
        </div>
        <div className="flex space-x-[22px]">
          <button className="px-8 py-3 bg-[#0841e2] rounded-[10px] justify-center items-center gap-3 inline-flex text-white text-sm font-semibold">
            Mulai Absensi
          </button>
          <button className="px-8 py-3 bg-[#ffcf43] rounded-[10px] justify-center items-center gap-3 inline-flex text-sm font-semibold">
            Buat Pengumuman
          </button>
        </div>
      </div>
    </div>
  )
} 