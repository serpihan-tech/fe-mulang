import { useEffect, useState } from "react";
import { CloseCircle } from "iconsax-react";
import CustomDatePicker from "@/app/component/Datepicker";
import { format } from "date-fns";
import { toast } from "react-toastify";

export default function DataKegiatanModal({ onCancel, onConfirm, kegiatanData, isLoading}) {

  const [formData, setFormData] = useState({
    description: "",
    date_start: null,
    date_end: null
  });
  
  const handleDateChange = (field) => (date) => {
    setFormData(prev => ({
      ...prev,
      [field]: date
    }));
  };

  useEffect(() => {
    if (kegiatanData) {
      setFormData({
        description: kegiatanData.nama_kegiatan || "",
        date_start: new Date(kegiatanData.plain_tanggal_mulai) || null,
        date_end: new Date(kegiatanData.plain_tanggal_selesai) || null,
      });
    }
  }, [kegiatanData]);

  const handleSubmit = () => {
    // Check for empty fields
    if (!formData.description.trim()) {
      toast.error("Nama kegiatan tidak boleh kosong");
      return;
    }

    if (!formData.date_start) {
      toast.error("Tanggal mulai tidak boleh kosong");
      return;
    }

    if (!formData.date_end) {
      toast.error("Tanggal selesai tidak boleh kosong");
      return;
    }

    // Validate date range
    const startDate = new Date(formData.date_start);
    const endDate = new Date(formData.date_end);

    if (startDate > endDate) {
      toast.error("Tanggal mulai tidak boleh melewati tanggal selesai");
      return;
    }

    const payload = {
      description: formData.description,
      date_start: formData.date_start ? format(new Date(formData.date_start),"yyyy-MM-dd") : null,
      date_end: formData.date_end ? format(new Date(formData.date_end),"yyyy-MM-dd") : null,
    };
    console.log("payload", payload)
    onConfirm(payload);
  };

  console.log("formData", formData)
  console.log("kegiatanData", kegiatanData)

  return (
    <div className="z-30 fixed inset-0 bg-black/50 flex justify-center items-center text-black dark:text-slate-100">
      <div className="bg-white dark:bg-dark_net-pri w-full max-w-md rounded-xl p-6 shadow-lg">

        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{ kegiatanData ? "Edit" : "Tambah" } Data</h2>
            <CloseCircle size="24" color="currentColor" variant="Bold" className="ml-auto cursor-pointer" onClick={onCancel} />
        </div>
        
        <div className="space-y-4">

          { /* ID Kegiatan */}
          { kegiatanData && (
            <div >
              <Input 
                label="ID" 
                value={kegiatanData.id_kegiatan} 
                disabled 
              />
            </div>
          )}
          
            <div >
              <Input 
                label="Nama kegiatan" 
                value={formData.description}
                placeholder="Masukkan nama kegiatan"
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} 
              />
            </div>

          <div className="w-full space-y-[5px]">
            <label className="text-black dark:text-slate-100 text-sm font-medium">Tanggal Mulai</label>
            <CustomDatePicker
              required
              value={formData.date_start ?? null}
              onChange={handleDateChange('date_start')}
              customFilterdateStyle={`flex items-center justify-between border border-netral-20 dark:bg-dark_net-ter focus:outline-pri-main rounded-lg px-4 py-2 cursor-pointer min-w-[180px] ${
                  formData.date_start ? "text-black dark:text-slate-100" : "text-netral-20"
              }`}
            />
          </div>

          <div className="w-full space-y-[5px]">
            <label className="text-black dark:text-slate-100 text-sm font-medium">Tanggal Selesai</label>
            <CustomDatePicker
              required
              value={formData.date_end ?? null}
              onChange={handleDateChange('date_end')}
              customFilterdateStyle={`flex items-center justify-between border border-netral-20 dark:bg-dark_net-ter focus:outline-pri-main rounded-lg px-4 py-2 cursor-pointer min-w-[180px] ${
                  formData.date_end ? "text-black dark:text-slate-100" : "text-netral-20"
              }`}
            />
          </div>
        </div>

        <div className="flex justify-end mt-6 space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium border rounded-md border-red-600 dark:border-[#ff4022] text-red-600 dark:text-[#ff4022] hover:bg-red-500 dark:hover:bg-[#ff4022] dark:hover:text-slate-100 hover:text-white bg-white dark:bg-dark_net-quar transition-shadow duration-300 hover:scale-105"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`px-4 py-2 text-sm font-medium rounded-md text-white duration-300 hover:scale-105 ${
                isLoading
                ? "bg-blue-300 cursor-not-allowed dark:text-black"
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

const Input = ({ label, value, disabled, onChange, placeholder="-" }) => (
    <div>
        <label className="text-sm font-medium">{label}</label>
        <input
            type="text"
            value={value}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder}
            className={`w-full mt-1 text-sm  text-black px-3 py-2 border border-gray-300 rounded-md ${disabled ? "bg-gray-200 text-black dark:bg-dark_net-ter dark:text-slate-100" : "bg-white dark:bg-dark_net-ter dark:text-slate-100"}`}
        />
    </div>
);
