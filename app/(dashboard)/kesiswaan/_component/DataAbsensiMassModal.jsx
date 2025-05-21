import { JadwalGuru } from "@/app/api/guru/ApiKBM";
import CustomDatePicker from "@/app/component/Datepicker";
import Dropdown from "@/app/component/Dropdown";
import { format } from "date-fns";
import { CloseCircle } from "iconsax-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const hariOrder = {
  'Senin': 1,
  'Selasa': 2,
  'Rabu': 3,
  'Kamis': 4,
  'Jumat': 5,
  'Sabtu': 6,
  'Minggu': 7
};

export default function DataAbsensiMassModal({ onCancel, onConfirm, isLoading, selectedClass }) {
  const scheduleId = typeof window !== "undefined" ?  sessionStorage.getItem("schedule_id") : null;
  const [jadwalOptions, setJadwalOptions] = useState([])
  const [selectedJadwal, setSelectedJadwal] = useState('')
  const [selectedDate, setSelectedDate] = useState(null)
  
  const fetchJadwalGuru = async () => {
    try {
      const data = await JadwalGuru()
      if(data){
        //console.log(selectedClass)
        // Filter data berdasarkan selectedClass
        const filteredData = data.teachers?.filter(jadwal => 
          jadwal.class?.name === selectedClass
        );

        const formattedOptions = filteredData?.map((jadwal) => ({
          label: (jadwal.days +" - "+ jadwal.module?.name+" - "+ jadwal.class?.name) || "Tidak ada",
          value: jadwal.id,
          days: jadwal.days
        }));

        // Sort berdasarkan urutan hari
        const sortedOptions = formattedOptions.sort((a, b) => {
          return hariOrder[a.days] - hariOrder[b.days];
        });

        setJadwalOptions(sortedOptions)
      } else {
        console.error("Data schedule bukan array atau kosong:", data.schedule);
      }
    } catch (error) {
      toast.error("Gagal mengambil data jadwal guru:", error.message);
    }
  };

  const dateSelection = async (date) => {
    setSelectedDate(date)
  }

  useEffect(() => {
    fetchJadwalGuru()
  }, [])

  useEffect(() => {
    const scheduleId = sessionStorage.getItem("schedule_id")
  
    if (scheduleId && jadwalOptions.length > 0) {
      const selectedOption = jadwalOptions.find(option => option.value === Number(scheduleId));
      if (selectedOption) {
        setSelectedJadwal(selectedOption);
      }
    }
  }, [jadwalOptions]);

  const handleSubmit = async () => {
    if (!selectedJadwal || !selectedDate) {
      toast.error("Jadwal dan tanggal harus diisi");
      return;
    }

    // Get day name in Indonesian from the selected date
    const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const selectedDay = dayNames[selectedDate.getDay()];

    if (selectedJadwal.days !== selectedDay) {
      toast.error(`Jadwal yang dipilih adalah hari ${selectedJadwal.days}, silakan pilih tanggal yang sesuai`);
      return;
    }

    const payload = {
      scheduleId: selectedJadwal.value,
      date: selectedDate.toString()
    }

    onConfirm(payload);
  }
  
  console.log("jadwalOptions",jadwalOptions)
  console.log("selectedJadwal",selectedJadwal)
  console.log("selectedDate",selectedDate)
  console.log("scheduleId",scheduleId)

  return (
    <div className="z-30 fixed inset-0 bg-black/50 flex justify-center items-center text-black">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">

        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Tambah Data Jadwal</h2>
            <CloseCircle size="24" color="currentColor" variant="Bold" className="ml-auto cursor-pointer" onClick={onCancel} />
        </div>
        
        <div className="space-y-4">
          <div className="w-full">
            <label className="text-black text-sm font-medium">Jadwal</label>
            <Dropdown
              options={jadwalOptions}
              value={selectedJadwal}
              onChange={setSelectedJadwal}
              className="w-full h-10 p-2 rounded-md bg-white border border-[#cccccc] "
              placeholder="Pilih Jadwal"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Tanggal</label>
            <CustomDatePicker
              value={selectedDate}
              onChange={dateSelection}
              //disabled={true}
              customFilterdateStyle="flex justify-between items-center px-3 py-2 text-black px-3 py-2 border border-gray-300 rounded-md bg-white"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6 space-x-3">
            <button
                onClick={onCancel}
                className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50"
            >
              Batal
            </button>
            <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`px-4 py-2 rounded-md text-white ${
                    isLoading
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                >
                {isLoading ? "Menyimpan..." : "Simpan"}
            </button>
        </div>
      </div>
    </div>
  );
}


