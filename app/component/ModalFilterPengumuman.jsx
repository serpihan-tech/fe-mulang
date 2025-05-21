import { useState } from "react";
import CustomDatePicker from "./Datepicker";
import { format } from "date-fns";
import { se } from "date-fns/locale";

const KATEGORI_OPTIONS = [
  { label: "Akademik", value: "akademik" },
  { label: "Prestasi", value: "prestasi" },
  { label: "Administrasi", value: "administrasi" },
  { label: "Kegiatan Sekolah", value: "kegiatan sekolah" },
  { label: "Fasilitas", value: "fasilitas" },
  { label: "Informasi Umum", value: "informasi umum" },
];

const DIKIRIM_OLEH_OPTIONS = [
  { label: "Guru", value: "teacher" },
  { label: "Admin", value: "admin" },
];

export default function ModalFilterPengumuman({ isOpen, onClose, onApply, initialValue = {} }) {
  const [dibuatOleh, setDibuatOleh] = useState(initialValue.dibuatOleh || []);
  const [kategori, setKategori] = useState(initialValue.kategori || []);
  const [tanggal, setTanggal] = useState(initialValue.tanggal || null);
  const [filteredDate, setFilteredDate] = useState(null);

  const toggleCheckbox = (arr, setArr, value) => {
    if (arr.includes(value)) {
      setArr(arr.filter((v) => v !== value));
    } else {
      setArr([...arr, value]);
    }
  };

  const handleApply = () => {
    if(tanggal === null){
      onApply({ dibuatOleh, kategori});
    } else {
      onApply({ dibuatOleh, kategori, tanggal:filteredDate });
    }
    onClose();
  };

  const handleDateChange = (date) => {
    const formattedDate = date ? format(new Date(date), "yyyy-MM-dd") : null;
    setTanggal(date);
    setFilteredDate(formattedDate);
  };

  if (!isOpen) return null;

  return (
    <div className="absolute z-50 mt-2 text-sm right-0 bg-white rounded-xl shadow-lg p-6 min-w-[360px] max-w-xs border border-gray-200">
      <div className="mb-4">
        <div className="font-semibold mb-2">Dikirim oleh</div>
        <div className="flex gap-6 mb-2">
          {DIKIRIM_OLEH_OPTIONS.map(opt => (
            <label key={opt.value} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={dibuatOleh.includes(opt.value)}
                onChange={() => toggleCheckbox(dibuatOleh, setDibuatOleh, opt.value)}
                className="accent-pri-main"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <div className="font-semibold mb-2">Kategori</div>
        <div className="grid grid-cols-2 gap-2">
          {KATEGORI_OPTIONS.map(opt => (
            <label key={opt.value} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={kategori.includes(opt.value)}
                onChange={() => toggleCheckbox(kategori, setKategori, opt.value)}
                className="accent-pri-main"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <div className="font-semibold mb-2">Tanggal</div>
        <CustomDatePicker
          value={tanggal}
          onChange={handleDateChange}
          placeholder="Pilih tanggal"
          customFilterdateStyle="w-full flex justify-between border rounded-md px-2 py-2"
        />
      </div>
      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg mt-2"
        onClick={handleApply}
      >
        Terapkan
      </button>
    </div>
  );
}
