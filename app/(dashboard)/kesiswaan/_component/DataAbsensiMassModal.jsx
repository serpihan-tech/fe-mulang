import { useEffect, useState } from "react";
import { format } from "date-fns";
import { CloseCircle } from "iconsax-react";
import Dropdown from "@/app/component/Dropdown";
import CustomTimePicker from "@/app/component/TimePicker";
import { dropdown_data_kelas, dropdown_data_mapel, dropdown_data_ruangan } from "@/app/api/admin/ApiKBM";
import { toast } from "react-toastify";

const hariOptions = [
  { value: "Senin", label: "Senin" },
  { value: "Selasa", label: "Selasa" },
  { value: "Rabu", label: "Rabu" },
  { value: "Kamis", label: "Kamis" },
  { value: "Jumat", label: "Jumat" },
  { value: "Sabtu", label: "Sabtu" },
  { value: "Minggu", label: "Minggu" },
];

export default function DataAbsensiMassModal({ onCancel, onConfirm, jadwalData, isLoading, onEdit, selectedDate }) {
  const [kelasOptions, setKelasOptions] = useState([]);
  const [ jadwalOptions, setJadwalOptions ] = useState([]);

  const fetchDataKelas = async () => {
    try {
        const data = await dropdown_data_kelas();
        const formattedOptions = data?.data.map((kelas) => ({
          label: kelas.name,
          value: kelas.id,
        }));
        setKelasOptions(formattedOptions);
    } catch (error) {
        toast.error(error.message || "Gagal memuat data kelas.");
    } finally {
        // setLoading(false);
    }
  };

  const fetchDataMapel = async () => {
    try {
        const data = await dropdown_data_mapel();
        const formattedOptions = data?.modules?.map((mapel) => ({
          label: (mapel.name+" - "+mapel.teacher?.name),
          value: mapel.id,
        }));
        setMapelOptions(formattedOptions);
    } catch (error) {
        toast.error(error.message || "Gagal memuat data kelas.");
    } finally {
        // setLoading(false);
    }
  };

  const fetchDataRuangan = async () => {
    try {
        const data = await dropdown_data_ruangan();
        const formattedOptions = data?.rooms?.map((ruangan) => ({
          label: ruangan.name,
          value: ruangan.id,
        }));
        setRuanganOptions(formattedOptions);
    } catch (error) {
        toast.error(error.message || "Gagal memuat data kelas.");
    } finally {
        // setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataKelas();
    fetchDataMapel();
    fetchDataRuangan();
    
  }, []);

  const [formData, setFormData] = useState({
    id:'',
    class_id:null,
    days: "",
    module_id: null,
    room_id: null,
    start_time: "",
    end_time: "",
  });

  const formatTime = (time) => {
    if (!time || time === "-") return "";
    return time.slice(0, 5); // Ambil hanya "HH:mm"
  };

  useEffect(() => {
    if (jadwalData) {
      setFormData({
        id: jadwalData.id_jadwal?.toString() || '',
        class_id: jadwalData.id_kelas || null,
        days: jadwalData.hari || "",
        module_id: jadwalData.id_mapel || null,
        room_id: jadwalData.id_ruangan || null,
        start_time: jadwalData.jam_mulai || "",
        end_time: jadwalData.jam_selesai || "",
      });
    }
  }, [jadwalData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  };

  const handleSubmit = () => {
    const payload = {
      class_id: formData.class_id,
      days: formData.days,
      module_id: formData.module_id,
      room_id: formData.room_id,
      start_time: formData.start_time ? `${formData.start_time}:00` : "",
      end_time: formData.end_time ? `${formData.end_time}:00` : "",
    };
    console.log("payload", payload)
    onConfirm(payload);
  };


  console.log("formData", formData)
  console.log("kelasOptions", kelasOptions)
  console.log("mapelOptions", mapelOptions) 
  console.log("ruanganOptions", ruanganOptions)
  return (
    <div className="z-30 fixed inset-0 bg-black/50 flex justify-center items-center text-black">
        <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Edit Data</h2>
                <CloseCircle size="24" color="currentColor" variant="Bold" className="ml-auto cursor-pointer" onClick={onCancel} />
            </div>
            
            <div className="space-y-4">

              { /* ID Jadwal */}
              <div className={`${formData.id === '' ? "hidden" : ""}`}>
                <Input 
                  label="ID" 
                  value={formData.id} 
                  disabled />
              </div>

              {/* Hari */}
              <div>
                <label className="text-sm font-medium">Hari</label>
                <Dropdown
                  placeholder="Pilih hari"
                  value={hariOptions.find(opt => opt.value === formData.days) || null}
                  onChange={(val) => setFormData({ ...formData, days: val.value })}
                  className={"w-full h-10 p-2 rounded-md bg-white border border-[#cccccc] "}
                  options={hariOptions}
                />
              </div>

              {/* Jam Masuk & Jam Pulang */}
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="text-sm font-medium">Jam Masuk</label>
                  <CustomTimePicker
                    value={formData.start_time}
                    onChange={(val) => setFormData({ ...formData, start_time: val })}
                  />
                </div>
                <div className="w-1/2">
                  <label className="text-sm font-medium">Jam Selesai</label>
                  <CustomTimePicker
                    value={formData.end_time}
                    onChange={(val) => setFormData({ ...formData, end_time: val })}
                  />
                </div>
              </div>

              {/* Kelas */}
              <div>
                <label className="text-sm font-medium">Kelas</label>
                <Dropdown
                  placeholder="Pilih kelas"
                  value={kelasOptions.find(opt => opt.value === formData.class_id) || null}
                  onChange={(val) => setFormData({ ...formData, class_id: val.value })}
                  className={"w-full h-10 p-2 rounded-md bg-white border border-[#cccccc] "}
                  options={kelasOptions || []}
                />
              </div>

              

              {/* Mata pelajaran */}
              <div>
                <label className="text-sm font-medium">Mata pelajaran</label>
                <Dropdown
                  placeholder="Pilih mapel"
                  value={mapelOptions.find(opt => opt.value === formData.module_id) || null}
                  onChange={(val) => setFormData({ ...formData, module_id: val.value })}
                  className={"w-full h-10 p-2 rounded-md bg-white border border-[#cccccc] "}
                  options={mapelOptions || []}
                />
              </div>

              {/* Ruangan */}
              <div>
                <label className="text-sm font-medium">Ruangan</label>
                <Dropdown
                  placeholder="Pilih ruangan"
                  value={ruanganOptions.find(opt => opt.value === formData.room_id) || null}
                  onChange={(val) => setFormData({ ...formData, room_id: val.value })}
                  className={"w-full h-10 p-2 rounded-md bg-white border border-[#cccccc] "}
                  options={ruanganOptions || []}
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

const Input = ({ label, value, disabled, onChange}) => (
    <div>
        <label className="text-sm font-medium">{label}</label>
        <input
            type="text"
            value={value}
            disabled={disabled}
            placeholder="-"
            onChange={onChange}
            className={`w-full mt-1 text-sm  text-black px-3 py-2 border border-gray-300 rounded-md ${disabled ? "bg-gray-200 text-black" : "bg-white"}`}
        />
    </div>
);
