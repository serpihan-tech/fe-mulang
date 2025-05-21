"use client";
import React, { useEffect, useState } from "react";
import Dropdown from "@/app/component/Dropdown";
import { AttachCircle } from "iconsax-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLoading } from "@/context/LoadingContext";
import CustomDatePicker from "@/app/component/Datepicker";
import { format, set } from "date-fns";
import { admin_tambah_pengumuman } from "@/app/api/admin/ApiPengumuman";
import { toast, ToastContainer } from "react-toastify";
import { TeacherTambahPengumuman } from "@/app/api/guru/ApiPengumuman";
import { mapelGuru } from "@/app/api/guru/ApiKBM";


export default function TeacherTambahPengumumanForm() {
  const mapel = typeof window !== "undefined" ?  JSON.parse(sessionStorage.getItem("module_id")) : null;
  const kelas = typeof window !== "undefined" ?  JSON.parse(sessionStorage.getItem("class_id")) : null;
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const isEditMode = !!id;
  const [classOption, setClassOption] = useState([]);
  const [mapelOption, setMapelOption] = useState([]);
  const [selectedFile,setSelectedFile] = useState(null);
  const [isLoading,setLoading] =useState(false);
  const [jadwal, setDataJadwal] = useState(null);
  const [selectedMapel, setSelectedMapel] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  

  const [formData, setFormData] = useState({
    title:"",
    content:"",
    date:"",
    files:"",
    class_id: null,
    module_id: null
  })

  const allowedFileTypes = ['jpg', 'png', 'jpeg', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'zip', 'rar'];
  const maxFileSize = 3 * 1024 * 1024; // 3MB in bytes

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size
    if (file.size > maxFileSize) {
      toast.error('Ukuran file maksimal 3MB');
      e.target.value = '';
      return;
    }

    // Check file type
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (!allowedFileTypes.includes(fileExtension)) {
      toast.error(`Tipe file tidak didukung. Tipe yang didukung: ${allowedFileTypes.join(', ')}`);
      e.target.value = '';
      return;
    }

    setSelectedFile(file);
    setFormData(prev => ({
      ...prev,
      files: file
    }));
  };

  const [madeBy, setMadeBy] = useState(null);
  const [tanggal, setTanggal] = useState("");

  const fetchDataJadwal = async () => {
      try {
        const data = await mapelGuru();
        console.log("data jadwal: ", data);
        const dataArray = data.data;
        setDataJadwal(dataArray);
    
        if (Array.isArray(dataArray)) {
          const uniqueMapelMap = new Map();
          dataArray.forEach((mapel) => {
            if (!uniqueMapelMap.has(mapel.moduleId)) {
              uniqueMapelMap.set(mapel.moduleId, {
                label: mapel.moduleName || "Tidak Ada",
                value: mapel.moduleId || "Tidak Ada",
              });
            }
          });
    
          const formattedData = Array.from(uniqueMapelMap.values());
          setMapelOption(formattedData);
          setSelectedMapel(mapel)
          
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    // Ambil data jadwal saat awal
  useEffect(() => {
    fetchDataJadwal();
  }, []);

  // Saat selectedMapel berubah, reset selectedClass dan isi classOption
  useEffect(() => {
    if (!selectedMapel) {
      setClassOption([]);
      setSelectedClass(null);
      return;
    }

    const filteredKelas = jadwal
      .filter((item) => item.moduleId === selectedMapel.value)
      .map((item) => ({
        value: item.classId,
        label: item.className,
      }));

    setClassOption(filteredKelas);

    // Jika dalam edit mode dan ada class_id di formData, cari kelas yang sesuai
    if (isEditMode && formData.class_id) {
      const existingClass = filteredKelas.find(opt => opt.value === formData.class_id);
      if (existingClass) {
        setSelectedClass(existingClass);
      } else {
        setSelectedClass(null);
      }
    } else {
      setSelectedClass(null);
    }
  }, [selectedMapel, jadwal, isEditMode]);

  useEffect(() => {
    if (isEditMode) {
      const storedData = sessionStorage.getItem("detail_pengumuman");
      
      if (storedData) {
        const data = JSON.parse(storedData);
        console.log("data stored", data)
        setFormData({
          title: data.judul || "",
          content: data.deskripsi || "",
          date: new Date(data.plain_date) || "",
          files: data.files || "",
          module_id: data.module_id || null,
          class_id: data.class_id || null
        });
        setMadeBy(data.dibuat_oleh || null)

        // Set dropdown values
        setTanggal(data.plain_date || "");

        // Set mapel and kelas after options are loaded
        if (data.module_id) {
          const mapelData = mapelOption.find(opt => opt.value === data.module_id);
          if (mapelData) {
            setSelectedMapel(mapelData);
          }
        }

        if (data.class_id ) {
          const kelasData = classOption.find(opt => opt.value === data.class_id);
          if (kelasData) {
            setSelectedClass(kelasData);
          }
        }
        
        // Set file if exists
        if (data.files) {
          setSelectedFile(data.files);
        }
      }
    }
  }, [id, mapelOption, classOption]);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      date: tanggal || "",
      module_id: selectedMapel?.value || null,
      class_id: selectedClass?.value || null
    }));    
  }, [ tanggal, selectedMapel, selectedClass]);

  const handleDateChange = async (date) => {
    setTanggal(format(new Date(date),"yyyy-MM-dd"))  
  };

  
  

  const handleSubmit = async () => {
  try {
    console.log("formData", formData);

    // Validasi file
    const file = (() => {
      const f = formData?.files;
      if (f instanceof File) return f;
      if (Array.isArray(f) && f.every(item => item instanceof File)) return f;
      return null;
    })();

    formData.files = file;

    // Copy formData agar tidak mutasi langsung state
    const payload = { ...formData };

    // Submit sesuai role
    const response = await TeacherTambahPengumuman(payload, isEditMode ? id : null);

    // Jika berhasil
    if (response) {
      toast.success(isEditMode ? "Pengumuman berhasil diperbarui" : "Pengumuman berhasil ditambahkan");

      if (isEditMode) {
        sessionStorage.removeItem("detail_pengumuman");
      }

      router.push('/pengumuman');
    }
  } catch (e) {
    toast.error( "Terjadi kesalahan saat mengirim data.");
  }
};

console.log("formData", formData);
console.log("mapel Option", mapelOption)
console.log("kelas Option", classOption)


  return (
    <div className="w-full bg-white dark:bg-dark_net-ter py-8 px-6 ">
      <ToastContainer />
      <div className="text-black dark:text-slate-100 text-xl font-semibold">
        {isEditMode ? "Edit Pengumuman" : "Tambah Pengumuman"}
      </div>
      <div className="flex space-x-16">
        <div className="w-1/2">
          <form action="" className="mt-6 space-y-5">
            <div className="space-y-[5px]">
              <label className="text-black dark:text-slate-100 text-sm font-medium">
                Judul Pengumuman
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e)=>(setFormData(prev => ({
                  ...prev,
                  title: e.target.value
                  })))}
                placeholder="Masukkan judul pengumuman"
                className="w-full border text-black border-gray-200 dark:bg-dark_net-ter rounded-md py-2 px-4 text-sm font-normal"
              />
            </div>
            <div className="space-y-[5px]">
              <label className="text-black dark:text-slate-100 text-sm font-medium">
                Deskripsi Pengumuman
              </label>
              <textarea
                maxLength={255}
                value={formData.content}
                onChange={(e)=>(setFormData(prev => ({
                  ...prev,
                  content: e.target.value
                  })))}
                placeholder="Masukkan deskripsi pengumuman"
                className="w-full border border-gray-200 dark:bg-dark_net-ter rounded-md py-2 px-4 text-black text-sm font-normal"
              />
            </div>
            <div className="space-y-[5px]">
              <label className="text-black dark:text-slate-100 text-sm font-medium">
                File/gambar (opsional)
              </label>
              <div className="relative">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full border text-black border-gray-200 dark:bg-dark_net-ter rounded-md py-2 px-4 text-sm font-normal opacity-0 absolute z-50 cursor-pointer"
                />
                <div className="w-full border border-gray-200 rounded-md py-2 px-4 text-sm font-normal flex items-center justify-between">
                  <span className="text-gray-400">
                    {selectedFile ? (typeof selectedFile === 'string' ? selectedFile : selectedFile.name) : 'Tambahkan file/gambar'}
                  </span>
                  <AttachCircle
                    className="w-6 h-6"
                    variant="Bold"
                    color="#AAAAAA"
                  />
                </div>
              </div>
            </div>
          </form>
        </div> 
        <div className="w-1/2">
          <form action="" className="mt-6 space-y-5">
            <div className="space-y-[5px]">
              <label className="text-black dark:text-slate-100 text-sm font-medium">
                Tanggal Terbit
              </label>
              <CustomDatePicker
                value={formData.date ? new Date(formData.date) : null}
                onChange={handleDateChange}
                customFilterdateStyle={`flex items-center justify-between border border-gray-200 dark:bg-dark_net-ter focus:outline-pri-main rounded-lg px-4 py-2 cursor-pointer min-w-[180px] ${
                    formData.date ? "text-black dark:text-slate-100" : "text-netral-20"
                }`}
              />
            </div>
            <div className="w-full space-y-[5px]">
              <label className="text-black dark:text-slate-100 text-sm font-medium">
                Mata pelajaran 
              </label>
              <Dropdown
                options={mapelOption}
                value={selectedMapel}
                onChange={setSelectedMapel}
                placeholder="Pilih Mata pelajaran"
                className="w-full h-10 p-2 rounded-md bg-white dark:bg-dark_net-ter border border-gray-200"
                dropdownStyle="dark:bg-dark_net-ter text-black dark:text-white"
              />
            </div>
            <div className="w-full space-y-[5px]">
              <label className="text-black dark:text-slate-100 text-sm font-medium">
                Kelas 
              </label>
              <Dropdown
                options={classOption}
                value={selectedClass}
                onChange={setSelectedClass}
                isDisabled={selectedMapel ? false : true}
                placeholder="Pilih Kelas"
                className="w-full h-10 p-2 rounded-md bg-white dark:bg-dark_net-ter border border-gray-200"
                dropdownStyle="dark:bg-dark_net-ter text-black dark:text-white"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="w-full flex justify-end space-x-4">
        <button
          className="w-1/2 md:w-[103px] h-[38px] px-2 py-1.5 text-sm font-medium border rounded-md border-red-600 dark:border-[#ff4022] text-red-600 dark:text-[#ff4022] hover:bg-red-500 dark:hover:bg-[#ff4022] dark:hover:text-slate-100 hover:text-white bg-white dark:bg-dark_net-quar transition-shadow duration-300 hover:shadow-md hover:scale-105 dark:hover:shadow-none"
          onClick={() => {
            if (isEditMode) {
              sessionStorage.removeItem("detail_pengumuman");
            }
            router.back();
          }}
        >
          Kembali
        </button>
        {madeBy !== "Teacher" ? 
          <button
            type="button"
            onClick={handleSubmit} 
            className="w-1/2 md:w-[103px] h-[38px] px-2 py-1.5 rounded-md text-white text-sm font-medium bg-blue-600 hover:bg-blue-700 transition-shadow duration-500 hover:shadow-md hover:scale-105">
            {isEditMode ? "Update" : "Simpan"}
          </button>
        : ''}
      </div>
    </div>
  );
}
