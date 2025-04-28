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
    <div className="z-30 fixed inset-0 bg-black/50 flex justify-center items-center text-black">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">

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

const Input = ({ label, value, disabled, onChange, placeholder="-" }) => (
    <div>
        <label className="text-sm font-medium">{label}</label>
        <input
            type="text"
            value={value}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder}
            className={`w-full mt-1 text-sm  text-black px-3 py-2 border border-gray-300 rounded-md ${disabled ? "bg-gray-200 text-black" : "bg-white"}`}
        />
    </div>
);
