import { useEffect, useState } from "react";
import { format } from "date-fns";
import { CloseCircle } from "iconsax-react";

const statusOptions = ["Izin", "Alfa", "Sakit", "Hadir"];

export default function EditAbsensiModal({ onCancel, onConfirm, AbsenData, isLoading }) {

  const [formData, setFormData] = useState({
    id:null,
    date: "",
    nis: "",
    namaSiswa: "",
    kelas: "",
    status: "",
    keterangan: "",
  });

  useEffect(() => {
    if (AbsenData) {
      setFormData({
        id:AbsenData.id,
        date: format(new Date(AbsenData.date), "dd-MM-yyyy"),
        nis: AbsenData.classStudent?.student?.studentDetail?.nis || "-",
        namaSiswa: AbsenData.classStudent?.student?.name || "-",
        kelas: AbsenData.classStudent?.class?.name || "-",
        status: AbsenData.status || "Alfa",
        keterangan: AbsenData.reason || "",
      });
    }
  }, [AbsenData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "status") {
      setFormData({
        ...formData,
        [name]: value,
        keterangan: value === "Izin" ? formData.keterangan : "",
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = () => {
    const payload = {
        id: formData.id,
        status: formData.status,
        reason: formData.status === "Izin" ? formData.keterangan : "",
    };
    onConfirm(payload);
  };

  return (
    <div className="z-30 fixed inset-0 bg-black/50 flex justify-center items-center">
        <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Edit Data</h2>
                <CloseCircle size="24" color="currentColor" variant="Bold" className="ml-auto cursor-pointer" onClick={onCancel} />
            </div>
            <div className="space-y-3">
                <Input label="Tanggal" value={formData.date} disabled />
                <Input label="NIS" value={formData.nis} disabled />
                <Input label="Nama Siswa" value={formData.namaSiswa} disabled />
                <Input label="Kelas" value={formData.kelas} disabled />
                <div>
                    <label className="text-sm font-medium">Status Kehadiran</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                    >
                        {statusOptions.map((opt) => (
                            <option key={opt} value={opt}>
                            {opt}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="text-sm font-medium">Keterangan</label>
                    <input
                        type="text"
                        name="keterangan"
                        value={formData.keterangan}
                        onChange={handleChange}
                        className={`w-full mt-1 text-sm px-3 py-2 border border-gray-300 rounded-md ${formData.status !== "Izin" ? "bg-gray-200 text-gray-500" : "bg-white"}`}
                        disabled={formData.status !== "Izin"}
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
                    disabled={
                        isLoading ||
                        (formData.status === "Izin" && formData.keterangan.trim() === "")
                    }
                    className={`px-4 py-2 rounded-md text-white ${
                        isLoading || (formData.status === "Izin" && formData.keterangan.trim() === "")
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

const Input = ({ label, value, disabled }) => (
    <div>
        <label className="text-sm font-medium">{label}</label>
        <input
            type="text"
            value={value}
            disabled={disabled}
            placeholder="-"
            className={`w-full mt-1 text-sm  text-black px-3 py-2 border border-gray-300 rounded-md ${disabled ? "bg-gray-200 text-black" : "bg-white"}`}
        />
    </div>
);
