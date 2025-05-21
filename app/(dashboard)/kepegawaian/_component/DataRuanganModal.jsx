import { useEffect, useState } from "react";
import { CloseCircle } from "iconsax-react";

export default function DataRuanganModal({ onCancel, onConfirm, ruanganData, isLoading}) {

  const [formData, setFormData] = useState({
    name: "",
    id:'',
  });

  useEffect(() => {
    if (ruanganData) {
      setFormData({
        name: ruanganData.nama_ruangan || "",
        id: ruanganData.id_ruangan || null,
      });
    }
  }, [ruanganData]);

  const handleSubmit = () => {
    const payload = {
      name: formData.name,
    };
    console.log("payload", payload)
    onConfirm(payload);
  };

  console.log("formData", formData)
  console.log("ruanganData", ruanganData)

  return (
    <div className="z-30 fixed inset-0 bg-black/50 flex justify-center items-center text-black dark:text-slate-100">
      <div className="bg-white dark:bg-dark_net-pri w-full max-w-md rounded-xl p-6 shadow-lg">

        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{ ruanganData ? "Edit" : "Tambah" } Data</h2>
            <CloseCircle size="24" color="currentColor" variant="Bold" className="ml-auto cursor-pointer" onClick={onCancel} />
        </div>
        
        <div className="space-y-4">

          { /* ID Jadwal */}
          <div className={`${formData.id === '' ? "hidden" : ""}`}>
            <Input 
              label="ID" 
              value={formData.id} 
              disabled 
            />
          </div>

          {/* Nama Ruangan */}
          <Input 
            label="Nama Ruangan" 
            value={formData.name ||""}
            placeholder="Masukkan Nama Ruangan"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
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
