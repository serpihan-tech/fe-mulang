import { useEffect, useState } from "react";
import { format } from "date-fns";
import { CloseCircle } from "iconsax-react";
import Dropdown from "@/app/component/Dropdown";
import CustomTimePicker from "@/app/component/TimePicker";
import { dropdown_data_kelas, dropdown_data_mapel, dropdown_data_ruangan, dropdown_nama_mapel } from "@/app/api/admin/ApiKBM";
import { toast } from "react-toastify";
import { useSemester } from "@/provider/SemesterProvider";
import { dropdown_data_guru } from "@/app/api/ApiKesiswaan";


export default function DataMapelModal({ onCancel, onConfirm, jadwalData, isLoading, onEdit, selectedDate }) {
  const [guruOptions, setGuruOptions] = useState([]);
  const { semesterId,allSemesters } = useSemester()
  const [mapelOptions, setMapelOptions] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState("");

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
    kode_mapel:'',
    teacher_id: null,
    academic_year_id: null,
    thumbnail: '',
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

  // useEffect(() => {
  //   if (jadwalData) {
  //     setFormData({
  //       id: jadwalData.id_jadwal?.toString() || '',
  //       class_id: jadwalData.id_kelas || null,
  //       days: jadwalData.hari || "",
  //       module_id: jadwalData.id_mapel || null,
  //       room_id: jadwalData.id_ruangan || null,
  //       start_time: jadwalData.jam_mulai || "",
  //       end_time: jadwalData.jam_selesai || "",
  //     });
  //   }
  // }, [jadwalData]);

  const handleSubmit = () => {
    const payload = {
      name: formData.name,
      teacher_id: formData.teacher_id,
      academic_year_id: formData.academic_year_id,
      thumbnail:""
    };
    console.log("payload", payload)
    onConfirm(payload);
  };


  console.log("formData", formData)
  console.log("guruOptions", guruOptions)
  console.log("semesterOptions", allSemesters)
  console.log("mapelOptions", mapelOptions)
  return (
    <div className="z-30 fixed inset-0 bg-black/50 flex justify-center items-center text-black">
        <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">{jadwalData ? "Edit" : "Tambah"} Data</h2>
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

              { /* Nama Mapel */}
              <div className="relative">
                <Input 
                  label="Mata Pelajaran" 
                  placeholder="Masukkan nama mapel.."  
                  value={formData.name}
                  onChange={handleInputChange}
                />

                {suggestions.length > 0 && (
                  <ul className="absolute z-10 bg-white border w-full mt-1 rounded shadow">
                    {suggestions.map((item,index) => (
                      <li
                        key={index}
                        className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
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
                  value={guruOptions.find(opt => opt.value === formData.teacher_id) || null}
                  onChange={(val) => setFormData({ ...formData, teacher_id: val.value })}
                  className={"w-full h-10 p-2 rounded-md bg-white border border-[#cccccc] "}
                  options={guruOptions}
                />
              </div>

              {/* Tahun Ajar */}
              <div>
                <label className="text-sm font-medium">Tahun Ajar</label>
                <Dropdown
                  placeholder="Pilih tahun ajar"
                  value={allSemesters.find(opt => opt.value === formData.academic_year_id) || null}
                  onChange={(val) => setFormData({ ...formData, academic_year_id: val.value })}
                  className={"w-full h-10 p-2 rounded-md bg-white border border-[#cccccc] "}
                  options={allSemesters}
                />
              </div>

              {/* Pilih Template Thumbnail */}
              <div className="">
                <label className="text-sm font-medium mb-2 block">Pilih Template Thumbnail</label>
                <div className="flex flex-wrap gap-4">
                  {templateImages.map((image, index) => (
                    <div
                      key={index}
                      className={`w-16 h-16 flex items-center justify-center rounded-full border cursor-pointer transition-all duration-200
                        ${formData.thumbnail === `/svg/template-module-card/${image}` 
                          ? "opacity-100 border-blue-500" 
                          : "opacity-50 border-gray-300"
                        }`}
                      onClick={() => setFormData({ ...formData, thumbnail: `/svg/template-module-card/${image}` })}
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

            <div className="flex justify-end mt-6 space-x-3">
                <button
                    onClick={onCancel}
                    className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50"
                >
                 Batal
                </button>
                <button
                    //onClick={handleSubmit}
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

const Input = ({ label, value, disabled, onChange, placeholder="-"}) => (
    <div>
        <label className="text-sm font-medium">{label}</label>
        <input
            type="text"
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            onChange={onChange}
            className={`w-full mt-1 text-sm  text-black px-3 py-2 border border-gray-300 rounded-md ${disabled ? "bg-gray-200 text-black" : "bg-white"}`}
        />
    </div>
);
