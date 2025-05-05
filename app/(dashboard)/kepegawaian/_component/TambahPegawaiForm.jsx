"use client"
import React, { useEffect, useState } from "react";
import CustomDatePicker from "@/app/component/Datepicker";
import { format } from "date-fns";
import { toast, ToastContainer } from "react-toastify";
import ImageCropper from "@/app/component/ImageCropper";
import Dropdown from "@/app/component/Dropdown";
import getCroppedImg from "@/app/component/getCroppedImg";
import { useRouter } from "next/navigation";

export default function TambahPegawaiForm({data, onConfirm}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [originalFile, setOriginalFile] = useState(null);
  const router = useRouter();
  const [formData, setFormData] = useState({
    user:{
      email:"",
      password:"",
      username:""
    },
    teacher:{
      gender:"",
      religion:"",
      birth_place: "",
      birth_date: null,
      address: "",
      phone: "",
      name: "",
      nip: "",
      profile_picture: "",
      address: "",
    },
    role: {
      name: "",
    },
  })

  useEffect(() => {
    if (!data) return;
  
    setFormData({
      user: {
        email: data.user?.email || "",
        password: "", 
        username: data.user?.username || "",
      },
      teacher: {
        name: data.name || "",
        nip: data.nip || "",
        gender: data.gender || "",
        religion: data.religion || "",
        birth_place: data.birthPlace || "",
        birth_date: data.birthDate || null,
        address: data.address || "",
        phone: data.phone || "",
        address: data.address || "", 
      },
      role: {
        name: data.role?.name || "Guru",
      },
    });
  }, [data]);
  
  const roleOptions = [
    { label: "Guru", value: "Guru" },
  ];

  const religionOptions = [
    { label: "Islam", value: "Islam" },
    { label: "Kristen", value: "Kristen" },
    { label: "Katolik", value: "Katolik" },
    { label: "Buddha", value: "Buddha" },
    { label: "Hindu", value: "Hindu" },
    { label: "Konghucu", value: "Konghucu" },
  ];
  
  console.log('form: ', formData)

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(formData);
  };

  const setNestedValue = (obj, path, value) => {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const nested = keys.reduce((acc, key) => acc[key], obj);
    nested[lastKey] = value;
  };

  const handleInputChange = (fieldPath) => (e) => {
    const value = e.target.value;
    setFormData((prev) => {
      const updated = { ...prev };
      setNestedValue(updated, fieldPath, value);
      return updated;
    });
  };

  const handleDateChange = (field) => (date) => {
    setFormData((prev) => { 
      const updated = { ...prev };
      setNestedValue(updated, field, new Date(format(date,"yyyy-MM-dd")));
      return updated });
  };

  const handleDropdownChange = (fieldPath) => (selectedOption) => {
    setFormData((prev) => {
      const updated = { ...prev };
      setNestedValue(updated, fieldPath, selectedOption.value);
      return updated;
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setOriginalFile(file);
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      const maxSize = 2 * 1024 * 1024;
  
      if (!validTypes.includes(file.type)) {
        alert("Format file harus .jpeg, .jpg, atau .png");
        e.target.value = null;
        return;
      }
  
      if (file.size > maxSize) {
        alert("Ukuran file maksimal 2MB");
        e.target.value = null;
        return;
      }
  
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = async (imageSrc, croppedAreaPixels) => {
    try {
      const { file } = await getCroppedImg(imageSrc, croppedAreaPixels, originalFile?.name, originalFile?.type);
      setFormData((prev) => ({
        ...prev,
        teacher: {
          ...prev.teacher,
          profile_picture: file,
        },
      }));
  
      setSelectedImage(null); 
    } catch (err) {
      console.error("Crop failed:", err);
    }
  };
  
  const handleCancelCrop = () => {
    setSelectedImage(null);
  };

  

  return (
    <div className="w-full bg-white dark:bg-dark_net-ter py-5 px-6 text-black dark:text-slate-100">
    {selectedImage && (
      <ImageCropper
        image={selectedImage}
        onCropComplete={handleCropComplete}
        onCancel={handleCancelCrop}
      />
    )}
    
      <form onSubmit={handleSubmit}>
        <div className="md:flex md:space-x-16">

          {/* Data guru */}
          <div className="md:w-1/2 space-y-5">

              <h1 className="text-black dark:text-slate-100  text-xl font-semibold ">Data Pegawai</h1>
              {/* Nip */}
              <div className="w-full">
                <div className="space-y-[5px]">
                  <label className="text-black dark:text-slate-100  text-sm font-medium">NIP</label>
                  <input type="number" 
                    value={formData.teacher.nip || ""}
                    onChange={handleInputChange("teacher.nip")}
                    placeholder="Masukkan NIP"
                    className="w-full border border-netral-20 dark:bg-dark_net-ter rounded-md py-2 px-4 text-sm font-normal focus:outline-pri-main"
                  />
                </div>
              </div>
              
              {/* Nama Lenkap */}
              <div className="space-y-[5px]">
                <label className="text-black dark:text-slate-100  text-sm font-medium">Nama Lengkap</label>
                  <input type="text"
                    value={formData.teacher.name || ""}
                    onChange={handleInputChange("teacher.name")} 
                    placeholder="Masukkan nama lengkap"
                    className="w-full border border-netral-20 dark:bg-dark_net-ter rounded-md py-2 px-4 text-sm font-normal focus:outline-pri-main"
                  />
              </div>

              {/* Tempat dan tanggal lahir */}
              <div className="w-full flex space-x-10">
                <div className="w-full space-y-[5px]">
                  <label className="text-black dark:text-slate-100  text-sm font-medium">Tempat lahir</label>
                  <input type="text" 
                    value={formData.teacher.birth_place || ""}
                    onChange={handleInputChange("teacher.birth_place")} 
                    placeholder="Masukkan tempat lahir"
                    className="w-full border border-netral-20 dark:bg-dark_net-ter rounded-md py-2 px-4 text-sm font-normal focus:outline-pri-main"
                  />
                </div>
                <div className="w-full space-y-[5px]">
                  <label className="text-black dark:text-slate-100  text-sm font-medium">Tanggal lahir</label>
                  <CustomDatePicker
                    required
                    value={formData.teacher.birth_date ?? null}
                    onChange={handleDateChange('teacher.birth_date')}
                    customFilterdateStyle={`flex items-center justify-between border border-netral-20 dark:bg-dark_net-ter focus:outline-pri-main rounded-lg px-4 py-2 cursor-pointer min-w-[180px] ${
                        formData.teacher.birth_date ? "text-black dark:text-slate-100 " : "text-netral-20"
                    }`}
                    />
                </div>
              </div>
              
              {/* Telp  */}
              <div className="space-y-[5px]">
                <label className="text-black dark:text-slate-100  text-sm font-medium">Nomor Telepon</label>
                  <input type="text"
                    inputMode="numeric"
                    maxLength={13}
                    minLength={11}
                    value={formData.teacher.phone ?? null}
                    onChange={handleInputChange('teacher.phone')}
                    placeholder="Masukkan nomor telepon pegawai"
                    className="w-full border border-netral-20 dark:bg-dark_net-ter rounded-md py-2 px-4 text-sm font-normal focus:outline-pri-main"
                  />
              </div>

              {/* Agama */}
              <div className="w-full space-y-[5px]">
                <label className="text-black dark:text-slate-100  text-sm font-medium">Agama</label>
                <Dropdown
                  options={religionOptions}
                  value={religionOptions.find(opt => opt.value === formData.teacher.religion) || null}
                  onChange={handleDropdownChange("teacher.religion")}
                  placeholder="Pilih Agama"
                  className="w-full h-10 p-2 rounded-md bg-white border border-netral-20 dark:bg-dark_net-ter"
                  dropdownStyle="dark:bg-black dark:text-white"
                />
              </div>

              {/* Agama */}
              <div className="w-full space-y-[5px]">
                <label className="text-black dark:text-slate-100  text-sm font-medium">Jabatan</label>
                <Dropdown
                  options={roleOptions}
                  value={roleOptions.find(opt => opt.value === formData.role.name) || null}
                  onChange={handleDropdownChange("role.name")}
                  placeholder="Pilih Jabatan"
                  className="w-full h-10 p-2 rounded-md bg-white border border-netral-20 dark:bg-dark_net-ter"
                  dropdownStyle="dark:bg-black dark:text-white"
                />
              </div>

              {/* kelas dan tahun ajar */}
              

              {/* Label gender */}
              <div>
                <label className="text-black dark:text-slate-100  text-sm font-medium">Jenis Kelamin</label>
                <div className="flex py-4 space-x-8">
                <label className="flex items-center gap-2 text-black dark:text-slate-100  text-sm font-medium">
                  <input
                      type="radio"
                      name="gender"
                      value="Laki-laki"
                      checked={formData.teacher.gender == "Laki-laki"}
                      onChange={handleInputChange("teacher.gender")}
                      className="w-5 h-5 accent-pri-main"
                  />
                  Laki-laki
                </label>
                <label className="flex items-center gap-2 text-black dark:text-slate-100  text-sm font-medium">
                  <input
                      type="radio"
                      name="gender"
                      value="Perempuan"
                      checked={formData.teacher.gender === "Perempuan"}
                      onChange={handleInputChange("teacher.gender")}
                      className="w-5 h-5 accent-pri-main"
                  />
                  Perempuan
                </label>
                </div>
              </div>
          </div>
          
          {/* Data keluarga dan Data user */}
          <div className="md:w-1/2 space-y-5 mb-6">
            
            <h1 className="text-black dark:text-slate-100  mb-5 text-xl font-semibold">Data User</h1>
            {/* Alamat Pegawai */}
            <div className="space-y-[5px]">
              <label className="text-black dark:text-slate-100  text-sm font-medium">Alamat Pegawai</label>
              <input 
                type="text" 
                value={formData.teacher.address || ""}
                onChange={handleInputChange("teacher.address")}
                placeholder="Masukkan username pegawai"
                className="w-full border border-netral-20 dark:bg-dark_net-ter rounded-md py-2 px-4 text-sm font-normal focus:outline-pri-main"
              />
            </div>

            {/* Email Pegawai */}
            <div className="space-y-[5px]">
              <label className="text-black dark:text-slate-100  text-sm font-medium">Email Pegawai</label>
              <input 
                type="email" 
                value={formData.user.email || ""}
                onChange={handleInputChange("user.email")}
                placeholder="Masukkan email pegawai"
                className="w-full border border-netral-20 dark:bg-dark_net-ter rounded-md py-2 px-4 text-sm font-normal focus:outline-pri-main"
              />
            </div>

            {/* Username Pegawai */}
            <div className="space-y-[5px]">
              <label className="text-black dark:text-slate-100  text-sm font-medium">Username Pegawai</label>
              <input 
                type="text" 
                minLength={5}
                maxLength={13}
                value={formData.user.username || ""}
                onChange={handleInputChange("user.username")}
                placeholder="Masukkan username pegawai"
                className="w-full border border-netral-20 dark:bg-dark_net-ter rounded-md py-2 px-4 text-sm font-normal focus:outline-pri-main"
              />
            </div>

            {/* Kata Sandi Pegawai */}
            <div className="space-y-[5px]">
              <label className="text-black dark:text-slate-100  text-sm font-medium">Kata Sandi Pegawai</label>
              <input 
                type="password" 
                minLength={8}
                value={formData.user.password || ""}
                onChange={handleInputChange("user.password")}
                placeholder="Masukkan kata sandi baru"
                className="w-full border border-netral-20 dark:bg-dark_net-ter rounded-md py-2 px-4 text-sm font-normal focus:outline-pri-main"
              />
            </div>

          
            <div className="space-y-[5px]">
              <label className="text-black dark:text-slate-100  text-sm font-medium">Foto Profil</label>

              <div className="w-full flex overflow-hidden rounded-md border border-netral-20 dark:bg-dark_net-ter bg-white text-white text-sm">
                <label
                  htmlFor="file-upload"
                  className="bg-pri-main px-4 py-2 cursor-pointer font-semibold shrink-0"
                >
                  Pilih file
                </label>
                
                <input
                  id="file-upload"
                  type="file"
                  accept="image/jpeg, image/jpg, image/png"
                  className="hidden"
                  onChange={handleFileChange}
                />

                <div className={`${formData.teacher.profile_picture?"text-black dark:text-slate-100 ":"text-netral-20"} px-4 py-2 w-full truncate text-black dark:text-slate-100 `}>
                  {formData.teacher.profile_picture
                    ? formData.teacher.profile_picture.name
                    : "No file chosen"}
                </div>
                

                
              </div>
              <p className="text-netral-20 text-sm">JPG, JPEG, PNG File (max. 2MB)</p>
            </div>


          
          </div>
        </div>

        {/* button */}
        <div className="w-full flex justify-end space-x-4">
          <button 
          type="button"
            onClick={() => router.push("/kepegawaian/data-pegawai")}
            className="w-[103px] h-[38px] px-2 py-1.5 text-sm font-medium border rounded-md border-red-600 dark:border-[#ff4022] text-red-600 dark:text-[#ff4022] hover:bg-red-500 dark:hover:bg-[#ff4022] dark:hover:text-slate-100 hover:text-white bg-white dark:bg-dark_net-quar transition-shadow duration-300 hover:shadow-md hover:scale-105 dark:hover:shadow-none">
            Batal
          </button>
          <button 
            type="submit"
            className="w-[103px] h-[38px] px-2 py-1.5 rounded-md text-white text-sm font-medium bg-blue-600 hover:bg-blue-700 transition-shadow duration-500 hover:shadow-md hover:scale-105">
            Simpan
          </button>
        </div>

      </form>
    </div>
  )
}