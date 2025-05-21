"use client";
import React, { useEffect, useState } from "react";
import Dropdown from "@/app/component/Dropdown";
import { AttachCircle } from "iconsax-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLoading } from "@/context/LoadingContext";
import CustomDatePicker from "@/app/component/Datepicker";
import { format } from "date-fns";
import { admin_tambah_pengumuman } from "@/app/api/admin/ApiPengumuman";
import { toast, ToastContainer } from "react-toastify";
import { TeacherTambahPengumuman } from "@/app/api/guru/ApiPengumuman";

export default function AdminTambahPengumumanForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const isEditMode = !!id;

  const [selectedFile,setSelectedFile] = useState(null)
  const [formData, setFormData] = useState({
    title:"",
    content:"",
    target_roles:"",
    category:"",
    date:"",
    files:""
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

  const kategoriOptions = [
    { label: "Akademik", value: "Akademik" },
    { label: "Administrasi", value: "Administrasi" },
    { label: "Kegiatan Sekolah", value: "Kegiatan Sekolah" },
    { label: "Fasilitas", value: "Fasilitas" },
    { label: "Prestasi", value: "Prestasi" },
    { label: "Informasi Umum", value: "Informasi Umum" },
  ];

  const penerimaInformasiOptions = [
    { label: "Semua", value: "semua" },
    { label: "Guru", value: "teacher" },
    { label: "Siswa", value: "student" },
  ];

  const [selectedKategori, setSelectedKategori] = useState(null);
  const [selectedPenerimaInformasi, setSelectedPenerimaInformasi] = useState(null);
  const [madeBy, setMadeBy] = useState(null);
  const [tanggal, setTanggal] = useState(format(new Date(),"yyy-MM-dd"));

  useEffect(() => {
    if (isEditMode) {
      const storedData = sessionStorage.getItem("detail_pengumuman");
      
      if (storedData) {
        const data = JSON.parse(storedData);
        console.log("data stored", data)
        setFormData({
          title: data.judul || "",
          content: data.deskripsi || "",
          target_roles: data.dibuat_oleh === "Teacher" ? "student" : data.target_roles || "",
          category: data.kategori || "",
          date: new Date(data.plain_date) || "",
          files: data.files || "",
          module_id: data.module_id || null,
          class_id: data.class_id || null
        });
        setMadeBy(data.dibuat_oleh || null)

        // Set dropdown values
        setSelectedKategori(kategoriOptions.find(opt => opt.value === data.kategori) || null);
        setSelectedPenerimaInformasi(penerimaInformasiOptions.find(opt => opt.value === (data.dibuat_oleh === "Teacher" ? "student" : data.target_roles)) || null);
        setTanggal(data.plain_date || "");
        
        // Set file if exists
        if (data.files) {
          setSelectedFile(data.files);
        }
      }
    }
  }, [id]);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      category: selectedKategori?.value || "",
      target_roles: selectedPenerimaInformasi?.value || "",
      date: tanggal || "",
    }));    
  }, [selectedKategori, selectedPenerimaInformasi, tanggal]);

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

    // Hapus field tertentu sesuai peran
    if (madeBy === "Teacher") {
      delete payload.target_roles;
    } else {
      delete payload.class_id;
      delete payload.module_id;
    }

    // Submit sesuai role
    let response = null;
    if (madeBy === "Teacher") {
      response = await TeacherTambahPengumuman(payload, isEditMode ? id : null);
    } else {
      response = await admin_tambah_pengumuman(payload, isEditMode ? id : null);
    }

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
            <div className="w-full space-y-[5px]">
              <label className="text-black dark:text-slate-100 text-sm font-medium">
                Kategori
              </label>
              <Dropdown
                options={kategoriOptions}
                value={selectedKategori}
                onChange={setSelectedKategori}
                placeholder="Pilih kategori"
                className="w-full h-10 p-2 text-black rounded-md bg-white dark:bg-dark_net-ter border border-gray-200"
                dropdownStyle="dark:bg-dark_net-ter text-black dark:text-white"
              />
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
                Penerima Informasi
              </label>
              <Dropdown
                options={penerimaInformasiOptions}
                value={selectedPenerimaInformasi}
                onChange={setSelectedPenerimaInformasi}
                placeholder="Pilih penerima informasi"
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
