import { useEffect, useState } from "react";
import { format } from "date-fns";
import { CloseCircle } from "iconsax-react";
import { toast } from "react-toastify";
import Dropdown from "@/app/component/Dropdown";
import CustomTimePicker from "@/app/component/TimePicker";
import CustomDatePicker from "@/app/component/Datepicker";

const statusOptions = [
  { label: "Izin", value: "Izin" },
  { label: "Alfa", value: "Alfa" },
  { label: "Sakit", value: "Sakit" },
  { label: "Hadir", value: "Hadir" },

];

export default function PresensiPegawaiModal({ onCancel, onConfirm, AbsenData, isLoading, onEdit, selectedDate }) {

  const [formData, setFormData] = useState({
    teacher_id:null,
    date: selectedDate? selectedDate : new Date(),
    email: "",
    nama_guru: "",
    status: "",
    check_in_time: "",
    check_out_time: "",
    id_absen: null,
  });

  const formatTime = (time) => {
    if (!time || time === "-") return "";
    return time.slice(0, 5); // Ambil hanya "HH:mm"
  };

  useEffect(() => {
    if (AbsenData && onEdit=="create") {
      setFormData({
        teacher_id:AbsenData.id_guru,
        id_absen: AbsenData.id_absen,
        date: new Date(formData.date),
        nama_guru: AbsenData.nama_pegawai || "-",
        status: AbsenData.status?.props.status || "Alfa",
        check_in_time: formatTime(AbsenData.jam_masuk) || "-",
        check_out_time: formatTime(AbsenData.jam_pulang) || "-",
        email: AbsenData.email || "-",
      });
    }
  }, [AbsenData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  };

  const handleSubmit = () => {
    // Check if trying to set status as Hadir without existing AbsenData
    if (formData.status === "Hadir" && AbsenData.status?.props.status === "Belum Absen") {
      toast.error("Admin tidak dapat mengubah status menjadi Hadir. Hanya dapat mengatur status Izin, Sakit, atau Alfa.");
      return;
    }

    

    if (formData.status === "Hadir" && (!formData.check_in_time || formData.check_in_time === "-")) {
      toast.error("Jam masuk harus diisi ketika status Hadir");
      return;
    }

    const payload = {
      teacher_id: formData.teacher_id,
      date: format(formData.date, "yyyy-MM-dd"),
      email: formData.email,
      nama_guru: formData.nama_guru,
      status: formData.status,
      id_absen: formData.id_absen,
    };
  
    if (payload.status === "Hadir") {
      payload.check_in_time = formData.check_in_time !== "-" ? formData.check_in_time + ":00" : null;
      payload.check_out_time = formData.check_out_time !== "-" && formData.check_out_time !== "" ? formData.check_out_time + ":00" : null;
    } else {
      payload.check_in_time=null
      payload.check_out_time=null
    }
  
    console.log("payload", payload);
    onConfirm(payload);
  };


  //console.log("formData", formData)
  //console.log("AbsenData", AbsenData)
  return (
    <div className="z-30 fixed inset-0 bg-black/50 flex justify-center items-center text-black dark:text-white">
        <div className="bg-white dark:bg-dark_net-pri w-full max-w-md rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-black dark:text-white">Edit Data</h2>
                <CloseCircle size="24" color="currentColor" variant="Bold" className="ml-auto cursor-pointer" onClick={onCancel} />
            </div>
            
            <div className="space-y-4">
              {/* Nama Guru */}
              <Input label="Nama Guru" value={formData.nama_guru} disabled />

              {/* Email */}
              <Input label="Email" value={formData.email} disabled />

              {/* Tanggal (CustomDatePicker) */}
              <div>
                <label className="text-sm font-medium text-black dark:text-white">Tanggal</label>
                <CustomDatePicker
                  value={formData.date}
                  disabled={true}
                  customFilterdateStyle="flex justify-between items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md w-full text-sm bg-gray-200 dark:bg-dark_net-ter text-black dark:text-white"
                />
              </div>

              {/* Keterangan Absen */}
              <div>
                <label className="text-sm font-medium text-black dark:text-white">Keterangan Absen</label>
                <Dropdown
                  placeholder="Pilih status"
                  value={statusOptions.find(opt => opt.value === formData.status) || null}
                  onChange={(val) => setFormData({ ...formData, status: val.value })}
                  className={"w-full h-10 p-2 rounded-md bg-white dark:bg-dark_net-ter border border-[#cccccc] dark:border-gray-600 text-black dark:text-white"}
                  options={statusOptions}
                />
              </div>

              {formData.status === "Hadir" && (
                <>
                  {/* Jam Masuk & Jam Pulang */}
                  <div className="flex gap-4 mt-4">
                    <div className="w-1/2">
                      <label className="text-sm font-medium text-black dark:text-white">Jam Masuk</label>
                      <CustomTimePicker
                        value={formData.check_in_time}
                        onChange={(val) => setFormData({ ...formData, check_in_time: val })}
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="text-sm font-medium text-black dark:text-white">Jam Pulang</label>
                      <CustomTimePicker
                        value={formData.check_out_time}
                        onChange={(val) => setFormData({ ...formData, check_out_time: val })}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end mt-6 space-x-3">
                <button
                    onClick={onCancel}
                    className="px-4 py-2 border border-red-500 text-red-500 dark:text-red-400 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                 Batal
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className={`px-4 py-2 rounded-md text-white ${
                        isLoading
                        ? "bg-blue-300 dark:bg-blue-700 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                    }`}
                    >
                    {isLoading ? "Menyimpan..." : "Simpan"}
                </button>
            </div>
        </div>
    </div>
  );
}

const Input = ({ label, value, disabled }) => (
    <div>
        <label className="text-sm font-medium text-black dark:text-white">{label}</label>
        <input
            type="text"
            value={value}
            disabled={disabled}
            placeholder="-"
            className={`w-full mt-1 text-sm text-black dark:text-white px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md ${
                disabled 
                ? "bg-gray-200 dark:bg-dark_net-ter text-black dark:text-white" 
                : "bg-white dark:bg-dark_net-ter"
            }`}
        />
    </div>
);
