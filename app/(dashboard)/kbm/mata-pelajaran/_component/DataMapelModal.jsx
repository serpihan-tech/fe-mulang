import { useEffect, useState } from "react";
import { format } from "date-fns";
import { CloseCircle } from "iconsax-react";
import Dropdown from "@/app/component/Dropdown";
import CustomTimePicker from "@/app/component/TimePicker";
import { dropdown_data_kelas, dropdown_data_mapel, dropdown_data_ruangan, dropdown_nama_mapel } from "@/app/api/admin/ApiKBM";
import { toast } from "react-toastify";
import { useSemester } from "@/provider/SemesterProvider";
import { dropdown_data_guru } from "@/app/api/ApiKesiswaan";


export default function DataMapelModal({ onCancel, onConfirm, mapelData, isLoading, onEdit, selectedDate }) {
  const [guruOptions, setGuruOptions] = useState([]);
  const { semesterId,allSemesters } = useSemester()
  const [mapelOptions, setMapelOptions] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState("");
  console.log("mapelData", mapelData)

  const handleInputChange = (e) => {
    const input = e.target.value;
    setQuery(input);
    setFormData((prev) => ({ ...prev, name: input }));
  
    const filtered = mapelOptions.filter((item) =>
      item.label.toLowerCase().includes(input.toLowerCase())
    );
    setSuggestions(filtered);
  };

  const handleSelectSuggestion = (suggestion) => {
    setFormData((prev) => ({ ...prev, name: suggestion.label }));
    setQuery(suggestion.label); // opsional, jika ingin tampilannya seragam
    setSuggestions([]);
  };

  const fetchDataMapel = async () => {
    try {
        const data = await dropdown_nama_mapel(semesterId);
        const formattedOptions = data?.modules?.map((mapel) => ({
          label: mapel.name,
          value: mapel.id,
        }));
        setMapelOptions(formattedOptions);
    } catch (error) {
        toast.error(error.message || "Gagal memuat data kelas.");
    } finally {
        // setLoading(false);
    }
  };

  const fetchDataGuru = async () => {
    try {
        const data = await dropdown_data_guru();
        const formattedOptions = data?.map((guru) => ({
          label: guru.name,
          value: guru.id,
        }));
        setGuruOptions(formattedOptions);
    } catch (error) {
        toast.error(error.message || "Gagal memuat data kelas.");
    } finally {
        // setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataGuru();
    fetchDataMapel();
  }, []);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    teacher_id: null,
    academic_year_id: null,
    thumbnailFile: '',
    thumbnailPath: '', 
  })

  const templateImages = [
    "template1.svg",
    "template2.svg",
    "template3.svg",
    "template4.svg",
    "template5.svg",
    "template6.svg",
    "template7.svg",

  ];

  const handleThumbnailSelect = (imageName) => {
    const imagePath = `/svg/template-module-card/${imageName}`;
    const imageUrl = `${window.location.origin}${imagePath}`; // ambil full URL
  
    fetch(imageUrl)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], imageName, { type: blob.type });
        setFormData(prev => ({
          ...prev,
          thumbnailPath: imagePath,
          thumbnailFile: file,
        }));
      });
  };

  useEffect(() => {
    if (mapelData) {
      setFormData({
        id: mapelData.id_mapel || '',
        name: mapelData.mata_pelajaran || '',
        teacher_id: mapelData.id_guru || '',
        academic_year_id: mapelData.id_tahun_ajar || '',
        thumbnailPath: mapelData.thumbnail ? `/svg/template-module-card/${mapelData.thumbnail.split('/').pop()}` : '',

      });
    }
  }, [mapelData]);

  const handleSubmit = async () => {
    const formDataPayload = new FormData();
  
    formDataPayload.append("name", formData.name);
    formDataPayload.append("teacher_id", formData.teacher_id);
    formDataPayload.append("academic_year_id", formData.academic_year_id);
  
    if (formData.thumbnailFile) {
      formDataPayload.append("thumbnail", formData.thumbnailFile);
    }
  
    console.log("Submitting FormData:", formDataPayload);
  
    await onConfirm(formDataPayload);
  };


  console.log("formData", formData)
  console.log("guruOptions", guruOptions)
  console.log("semesterOptions", allSemesters)
  console.log("mapelOptions", mapelOptions)
  return (
    <div className="w-[485px] bg-white dark:bg-dark_net-sec pb-[38px] rounded-lg">
      <div className="w-full h-[54px] flex px-5 py-4 rounded-t-lg bg-[#adc0f5]/10 dark:bg-dark_net-pri items-center">
        <h2 className="text-black dark:text-slate-100 text-xl font-semibold">
          {mapelData ? "Edit" : "Tambah"} Data
        </h2>
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
          {/* ID Jadwal */}
          <div className={`${formData.id === "" ? "hidden" : ""}`}>
            <Input label="ID" value={formData.id} disabled />
          </div>

          {/* Nama Mapel */}
          <div className="relative">
            <Input
              label="Mata Pelajaran"
              placeholder="Masukkan nama mapel.."
              value={formData.name}
              onChange={handleInputChange}
              className="bg-white dark:bg-dark_net-ter border text-black dark:text-slate-100"
            />

            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full mt-1">
                {suggestions.map((item, index) => (
                  <li
                    key={index}
                    className="w-full h-10 p-2 rounded-md bg-white dark:bg-dark_net-ter  "
                    onClick={() => handleSelectSuggestion(item)}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Guru pengampu */}
          <div>
            <label className="text-sm font-medium">Guru pengampu</label>
            <Dropdown
              placeholder="Pilih guru"
              value={
                guruOptions.find((opt) => opt.value === formData.teacher_id) ||
                null
              }
              onChange={(val) =>
                setFormData({ ...formData, teacher_id: val.value })
              }
              className={
                "w-full h-10 p-2 rounded-md bg-white dark:bg-dark_net-ter border border-[#cccccc] "
              }
              options={guruOptions}
            />
          </div>

          {/* Tahun Ajar */}
          <div>
            <label className="text-sm font-medium">Tahun Ajar</label>
            <Dropdown
              placeholder="Pilih tahun ajar"
              value={
                allSemesters.find(
                  (opt) => opt.value === formData.academic_year_id
                ) || null
              }
              onChange={(val) =>
                setFormData({ ...formData, academic_year_id: val.value })
              }
              className={
                "w-full h-10 p-2 rounded-md bg-white dark:bg-dark_net-ter border border-[#cccccc] "
              }
              options={allSemesters}
            />
          </div>

          {/* Pilih Template Thumbnail */}
          <div className="">
            <label className="text-sm font-medium mb-2 block">
              Pilih Template Thumbnail
            </label>
            <div className="flex flex-wrap gap-4">
              {templateImages.map((image, index) => (
                <div
                  key={index}
                  className={`w-16 h-16 flex items-center justify-center rounded-full border cursor-pointer transition-all duration-200
          ${
            formData.thumbnailPath === `/svg/template-module-card/${image}`
              ? "opacity-100 border-blue-500"
              : "opacity-50 border-gray-300"
          }`}
                  onClick={() => handleThumbnailSelect(image)}
                >
                  <img
                    src={`/svg/template-module-card/${image}`}
                    alt={`Template ${index + 1}`}
                    className="w-16 h-16 object-contain" // <<< ini kecil, sekitar 50% ukuran normal
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end space-x-4 mt-5">
          <button
            type="button"
            onClick={onCancel}
            className="w-[103px] h-[38px] px-2 py-1.5 text-sm font-medium border rounded-md border-red-600 dark:border-[#ff4022] text-red-600 dark:text-[#ff4022] hover:bg-red-500 dark:hover:bg-[#ff4022] dark:hover:text-slate-100 hover:text-white bg-white dark:bg-dark_net-quar transition-shadow duration-300 hover:scale-105"
          >
            Batal
          </button>
          <button
            disabled={isLoading}
            type="button"
            onClick={handleSubmit}
            className={`w-[103px] h-[38px] px-2 py-1.5 rounded-md text-white text-sm font-medium ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } transition-shadow duration-300 hover:shadow-md hover:scale-105`}
          >
            {isLoading ? "Membuat..." : "Buat"}
          </button>
        </div>
      </div>
    </div>
  );
}

const Input = ({ label, value, disabled, onChange, placeholder="-"}) => (
    <div>
        <label className="text-sm font-medium">{label}</label>
        <input
            type="text"
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            onChange={onChange}
            className={`w-full mt-1 text-sm  text-black px-3 py-2 border border-gray-300 rounded-md ${disabled ? "bg-gray-200 text-black" : "bg-white dark:bg-dark_net-ter border text-black dark:text-slate-100"}`}
        />
    </div>
);
