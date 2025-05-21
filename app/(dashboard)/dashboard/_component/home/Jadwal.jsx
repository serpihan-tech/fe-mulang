import { Location, People } from "iconsax-react";
import { useRouter } from "next/navigation";

export default function Jadwal({
  startTime,
  endTime,
  bgColor,
  title,
  statusColor,
  status,
  statusTextColor = "text-white",
  place,
  class_name,
  absenceAllowed=false,
  module_id,
  class_id,
  schedule_id
}) {

  const router = useRouter()

  const handleAbsensi = () => {
    if (!absenceAllowed) return
    sessionStorage.setItem("module_id", JSON.stringify({label:title, value:module_id}));
    sessionStorage.setItem("class_id", JSON.stringify({label:class_name, value:class_id}));
    sessionStorage.setItem("schedule_id", schedule_id);
    router.push("/kesiswaan/absensi-siswa");
  };

  const handlePengumuman = () => {
    router.push("/pengumuman/tambah");
  };

  return (
    <div className="flex w-full space-x-3">
      {/* Waktu */}
      <div className="flex flex-col items-center justify-center space-y-1">
        <span className="text-center text-[#7f7f7f] text-[11px] font-semibold">{startTime}</span>
        <div className="h-full border-dashed border-gray-400 border-[1.2px]" />
        <span className="text-center text-[#7f7f7f] text-[11px] font-semibold">{endTime}</span>
      </div>

      {/* Card */}
      <div className={`w-full md:w-[320px] lg:w-[500px] px-6 py-4 space-y-3 rounded-lg ${bgColor}`}>
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
        <button
          onClick={handleAbsensi}
          className={`px-4 py-2 rounded-md text-white text-xs font-semibold transition whitespace-nowrap
            ${absenceAllowed ? "bg-[#0841e2] hover:bg-[#0637c2] cursor-pointer " : "bg-[#0841e2]/50 cursor-not-allowed"}`}
          disabled={!absenceAllowed}
        >
          Mulai Absensi
        </button>
          <button 
          onClick={handlePengumuman}
            className="px-4 py-2 bg-[#ffcf43] rounded-md text-black text-xs font-semibold whitespace-nowrap"
          >
            Buat Pengumuman
          </button>
        </div>
      </div>
    </div>
  );
}
