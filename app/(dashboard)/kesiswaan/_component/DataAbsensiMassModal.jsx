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
    <div className="w-[485px] bg-white dark:bg-dark_net-ter pb-[38px] rounded-lg">
      <div className="w-full h-[54px] flex px-5 py-4 rounded-t-lg bg-[#adc0f5]/10 dark:bg-dark_net-pri items-center">
        <div className="text-black dark:text-slate-100 text-xl font-semibold">
          Tambah Data
        </div>
        <CloseCircle
          size="24"
          color="currentColor"
          variant="Bulk"
          className="ml-auto cursor-pointer dark:text-slate-100"
          onClick={onCancel}
        />
      </div>
      <div className="w-full px-5">
      <div className="space-y-4">
          <div className="w-full">
            <label className="text-black dark:text-slate-100 text-sm font-medium">Jadwal</label>
            <Dropdown
              options={jadwalOptions}
              value={selectedJadwal}
              onChange={setSelectedJadwal}
              className="w-full h-10 p-2 rounded-md bg-white dark:bg-dark_net-ter border border-[#cccccc] z-10"
              placeholder="Pilih Jadwal"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Tanggal</label>
            <CustomDatePicker
              value={selectedDate}
              onChange={dateSelection}
              //disabled={true}
              customFilterdateStyle="flex dark:bg-dark_net-ter dark:text-slate-100 justify-between items-center px-3 py-2 text-black px-3 py-2 border border-gray-300 rounded-md bg-white"
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


