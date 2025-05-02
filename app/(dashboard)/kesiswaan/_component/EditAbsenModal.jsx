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
    <div className="w-[485px] bg-white dark:bg-dark_net-sec pb-[38px] rounded-lg space-y-1 md:space-y-3 lg:space-y-5">
      <div className="w-full h-[54px] flex px-5 py-4 rounded-t-lg bg-[#adc0f5]/10 dark:bg-dark_net-pri items-center">
        <div className="text-black dark:text-slate-100 text-xl font-semibold">
          Edit Data
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
        <div className="space-y-3">
          <Input label="Tanggal" value={formData.date} disabled />
          <Input label="NIS" value={formData.nis} disabled />
          <Input label="Nama Siswa" value={formData.namaSiswa} disabled />
          <Input label="Kelas" value={formData.kelas} disabled />
          <div>
            <label className="text-black dark:text-slate-100 text-sm font-medium">
              Status Kehadiran
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md dark:bg-dark_net-ter"
            >
              {statusOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-black dark:bg-dark_net-ter dark:text-slate-100 text-sm font-medium">
              Keterangan
            </label>
            <input
              type="text"
              name="keterangan"
              value={formData.keterangan}
              onChange={handleChange}
              className={`w-full mt-1 text-sm px-3 py-2 border border-gray-300 rounded-md ${
                formData.status !== "Izin"
                  ? "bg-gray-300 text-gray-500"
                  : "bg-white"
              }`}
              disabled={formData.status !== "Izin"}
            />
          </div>
        </div>
        <div className="flex justify-end mt-6 space-x-3">
          <button
            onClick={onCancel}
            className="w-[103px] h-[38px] px-2 py-1.5 text-sm font-medium border rounded-md border-red-600 dark:border-[#ff4022] text-red-600 dark:text-[#ff4022] hover:bg-red-500 dark:hover:bg-[#ff4022] dark:hover:text-slate-100 hover:text-white bg-white dark:bg-dark_net-quar transition-shadow duration-300 hover:scale-105"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            disabled={
              isLoading ||
              (formData.status === "Izin" && formData.keterangan.trim() === "")
            }
            className={`w-[103px] h-[38px] px-2 py-1.5 rounded-md text-white text-sm font-medium ${
              isLoading ||
              (formData.status === "Izin" && formData.keterangan.trim() === "")
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }transition-shadow duration-300 hover:shadow-md hover:scale-105`}
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
        <label className="text-black dark:text-slate-100 text-sm font-medium">{label}</label>
        <input
            type="text"
            value={value}
            disabled={disabled}
            placeholder="-"
            className={`w-full mt-1 text-sm  text-black px-3 py-2 border border-gray-300 rounded-md ${disabled ? "bg-gray-200 text-black" : "bg-white"}`}
        />
    </div>
);
