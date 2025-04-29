import { Location, People } from "iconsax-react";

export default function Jadwal({
  startTime,
  endTime,
  bgColor,
  title,
  statusColor,
  status,
  statusTextColor = "text-white",
  place,
  class_name
}) {
  return (
    <div className="flex w-full space-x-3">
      {/* Waktu */}
      <div className="flex flex-col items-center justify-center space-y-1">
        <span className="text-center text-[#7f7f7f] text-[11px] font-semibold">{startTime}</span>
        <div className="h-full border-dashed border-gray-400 border-[1.2px]" />
        <span className="text-center text-[#7f7f7f] text-[11px] font-semibold">{endTime}</span>
      </div>

      {/* Card */}
      <div className={`w-full px-4 py-2.5 space-y-3 rounded-lg ${bgColor}`}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="text-[#0841e2] text-sm font-semibold">
            {title} ({startTime} - {endTime})
          </p>
          <div className={`px-2.5 py-1 rounded-md ${statusColor}`}>
            <p className={`${statusTextColor} text-[11px] font-semibold`}>{status}</p>
          </div>
        </div>

        {/* Lokasi */}
        <div className="flex items-center space-x-2">
          <Location color="#0841E2" variant="Bold" className="w-[18px] h-[18px]" />
          <p className="text-black text-sm font-normal">{place}</p>
        </div>

        {/* Kelas */}
        <div className="flex items-center space-x-2">
          <People color="#0841E2" variant="Bold" className="w-[18px] h-[18px]" />
          <p className="text-black text-sm font-normal">{class_name}</p>
        </div>

        {/* Tombol Aksi */}
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-[#0841e2] rounded-md text-white text-xs font-semibold">
            Mulai Absensi
          </button>
          <button className="px-4 py-2 bg-[#ffcf43] rounded-md text-black text-xs font-semibold">
            Buat Pengumuman
          </button>
        </div>
      </div>
    </div>
  );
}
