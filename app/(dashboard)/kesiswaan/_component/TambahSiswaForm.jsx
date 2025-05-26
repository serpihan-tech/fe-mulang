"use client"
import React, { useEffect, useState } from "react";
import Dropdown from "@/app/component/Dropdown";
import CustomDatePicker from "@/app/component/Datepicker";
import { format } from "date-fns";
import { data_kelas, data_semester } from "@/app/api/ApiKesiswaan";
import { toast, ToastContainer } from "react-toastify";
import { useSemester } from "@/provider/SemesterProvider";
import getCroppedImg from "@/app/component/getCroppedImg";
import ImageCropper from "@/app/component/ImageCropper";
import { useRouter } from "next/navigation";



export default function TambahSiswaForm({data, onConfirm}) {
  const [classOptions, setClassOption] = useState([])
  const {allSemesters} = useSemester()
  const [selectedPeriod, setSelectedPeriod] = useState(null)
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [originalFile, setOriginalFile] = useState(null);
  const router = useRouter()

  const [formData, setFormData] = useState({
    user:{
      email:"",
      password:"",
      username:""
    },
    student:{
      name:"",
      is_graduate:"0",
    },
    student_detail:{
      gender:"",
      religion:"",
      birth_place: "",
      birth_date: null,
      address: "",
      parents_name: "",
      parents_phone: "",
      parents_job: "",
      students_phone: "",
      nis: "",
      nisn: "",
      enrollment_year: null,
      profile_picture: ""
    },
    class_student:{
      class_student_id:null,
      class_id:null,
      academic_year_id:null,
    }
  })

  useEffect(() => {
    if (!data) return;
  
    setFormData({
      user: {
        email: data.user?.email || "",
        password: "", // Tidak dikembalikan oleh API
        username: data.user?.username || "",
      },
      student: {
        name: data.name || "",
        is_graduate: String(data.isGraduate ?? "0"),
      },
      student_detail: {
        gender: data.studentDetail?.gender || "",
        religion: data.studentDetail?.religion || "",
        birth_place: data.studentDetail?.birthPlace || "",
        birth_date: data.studentDetail?.birthDate || null,
        address: data.studentDetail?.address || "",
        parents_name: data.studentDetail?.parentsName || "",
        parents_phone: data.studentDetail?.parentsPhone || "",
        parents_job: data.studentDetail?.parentsJob || "",
        students_phone: data.studentDetail?.studentsPhone || "",
        nis: data.studentDetail?.nis || "",
        nisn: data.studentDetail?.nisn || "",
        enrollment_year: data.studentDetail?.enrollmentYear || null,
        profile_picture: "",
      },
      class_student: {
        class_student_id: data.classStudent?.[0]?.id || null,
        class_id: data.classStudent?.[0]?.classId || null,
        academic_year_id: data.classStudent?.[0]?.academicYearId || null,
      },
    });
  }, [data]);
  
  
  

  const religionOptions = [
    { label: "Islam", value: "Islam" },
    { label: "Kristen", value: "Kristen" },
    { label: "Katolik", value: "Katolik" },
    { label: "Budha", value: "Budha" },
    { label: "Hindu", value: "Hindu" },
    { label: "Konghucu", value: "Konghucu" },
  ];
  
  useEffect(() => {
    const fetchDataKelas = async (page,limit,search,sortField,sortDir) => {
      try {
          const data = await data_kelas(page=1,limit=99,search='', sortField='', sortDir='');
          // console.log("kelazzzzz",data)
          const formattedOptions = data?.theClass.theClass.map((kelas) => ({
            label: kelas.name,
            value: kelas.id,
          }));
          setClassOption(formattedOptions);
      } catch (error) {
          toast.error(error.message);
      } finally {
          // setLoading(false);
      }
    }

    fetchDataKelas()
  }, [])

  // console.log("kelas", ClassOption)
  // console.log("semester:", allSemesters)
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
        student_detail: {
          ...prev.student_detail,
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
        <div className="md:flex md:space-x-8 lg:space-x-16">

          {/* Data siswa */}
          <div className="md:w-1/2 space-y-5">

              <h1 className="text-black dark:text-slate-100 text-xl font-semibold ">Data Siswa</h1>
              {/* Nis, Nisn */}
              <div className="w-full lg:flex lg:space-x-10 space-y-5 lg:space-y-0">
                <div className="w-full lg:w-1/2 space-y-[5px]">
                  <label className="text-black dark:text-slate-100 text-sm font-medium">NIS</label>
                  <input type="number" 
                    value={formData.student_detail.nis || ""}
                    onChange={handleInputChange("student_detail.nis")}
                    placeholder="Masukkan NIS"
                    className="w-full border border-netral-20 dark:bg-dark_net-ter rounded-md py-2 px-4 text-sm font-normal focus:outline-pri-main"
                  />
                </div>
                <div className="w-full lg:w-1/2 space-y-[5px]">
                  <label className="text-black dark:text-slate-100 text-sm font-medium ">NISN</label>
                  <input type="number" 
                    value={formData.student_detail.nisn || ""}
                    onChange={handleInputChange("student_detail.nisn")}
                    placeholder="Masukkan NISN"
                    className="w-full border border-netral-20 dark:bg-dark_net-ter rounded-md py-2 px-4 text-sm font-normal focus:outline-pri-main"
                  />
                </div>
              </div>
              
              {/* Nama Lengkap */}
              <div className="space-y-[5px]">
                <label className="text-black dark:text-slate-100 text-sm font-medium">Nama Lengkap</label>
                  <input type="text"
                    value={formData.student.name || ""}
                    onChange={handleInputChange("student.name")} 
                    placeholder="Masukkan nama lengkap"
                    className="w-full border border-netral-20 dark:bg-dark_net-ter rounded-md py-2 px-4 text-sm font-normal focus:outline-pri-main"
                  />
              </div>

              {/* Tempat dan tanggal lahir */}
              <div className="w-full lg:flex lg:space-x-10 space-y-5 lg:space-y-0">
                <div className="w-full space-y-[5px]">
                  <label className="text-black dark:text-slate-100 text-sm font-medium">Tempat lahir</label>
                  <input type="text" 
                    value={formData.student_detail.birth_place || ""}
                    onChange={handleInputChange("student_detail.birth_place")} 
                    placeholder="Masukkan tempat lahir"
                    className="w-full border border-netral-20 dark:bg-dark_net-ter rounded-md py-2 px-4 text-sm font-normal focus:outline-pri-main"
                  />
                </div>
                <div className="w-full space-y-[5px]">
                  <label className="text-black dark:text-slate-100 text-sm font-medium">Tanggal lahir</label>
                  <CustomDatePicker
                    required
                    value={formData.student_detail.birth_date ?? null}
                    onChange={handleDateChange('student_detail.birth_date')}
                    customFilterdateStyle={`flex items-center justify-between border border-netral-20 dark:bg-dark_net-ter focus:outline-pri-main rounded-lg px-4 py-2 cursor-pointer min-w-[180px] ${
                        formData.student_detail.birth_date ? "text-black dark:text-slate-100" : "text-netral-20"
                    }`}
                    />
                </div>
              </div>
              
              {/* Tanggal masuk */}
              <div className="w-full space-y-[5px]">
                <label className="text-black dark:text-slate-100 text-sm font-medium">Tanggal Masuk</label>
                <CustomDatePicker
                  required
                  value={formData.student_detail.enrollment_year ?? null}
                  onChange={handleDateChange('student_detail.enrollment_year')}
                  customFilterdateStyle={`flex items-center justify-between border border-netral-20 dark:bg-dark_net-ter focus:outline-pri-main rounded-lg px-4 py-2 cursor-pointer min-w-[180px] ${
                      formData.student_detail.enrollment_year ? "text-black dark:text-slate-100" : "text-netral-20"
                  }`}
                  />
              </div>

              {/* Telp siswa */}
              <div className="space-y-[5px]">
                <label className="text-black dark:text-slate-100 text-sm font-medium">Nomor Telepon Siswa</label>
                  <input type="text"
                    inputMode="numeric"
                    maxLength={13}
                    minLength={11}
                    value={formData.student_detail.students_phone ?? null}
                    onChange={handleInputChange('student_detail.students_phone')}
                    placeholder="Masukkan nomor telepon siswa"
                    className="w-full border border-netral-20 dark:bg-dark_net-ter rounded-md py-2 px-4 text-sm font-normal focus:outline-pri-main"
                  />
              </div>

              {/* Agama */}
              <div className="w-full space-y-[5px]">
                <label className="text-black dark:text-slate-100 text-sm font-medium">Agama</label>
                <Dropdown
                  options={religionOptions}
                  value={religionOptions.find(opt => opt.value === formData.student_detail.religion) || null}
                  onChange={handleDropdownChange("student_detail.religion")}
                  placeholder="Pilih Agama"
                  className="w-full h-10 p-2 rounded-md bg-white border border-netral-20 dark:bg-dark_net-ter"
                  dropdownStyle="dark:bg-black dark:text-white"
                />
              </div>

              {/* kelas dan tahun ajar */}
              <div className="w-full lg:flex lg:space-x-10 space-y-5 lg:space-y-0">
                {/* Kelas */}
                <div className="w-full space-y-[5px]">
                  <label className="text-black dark:text-slate-100 text-sm font-medium">Kelas</label>
                  <Dropdown
                    options={classOptions || null}
                    value={classOptions.find(opt => opt.value === formData.class_student.class_id) || null}
                    onChange={handleDropdownChange("class_student.class_id")}
                    placeholder="Pilih kelas"
                    className="w-full h-10 p-2 rounded-md bg-white border border-netral-20 dark:bg-dark_net-ter"
                    dropdownStyle="dark:bg-black dark:text-white"
                  />
                </div>
                {/* Tahun ajar */}
                <div className="w-full space-y-[5px]">
                  <label className="text-black dark:text-slate-100 text-sm font-medium">Tahun Ajar  </label>
                  <Dropdown
                    options={allSemesters}
                    value={allSemesters.find(opt => opt.value === formData.class_student.academic_year_id) || null}
                    onChange={handleDropdownChange("class_student.academic_year_id")}
                    placeholder="Pilih tahun ajar"
                    className="w-full h-10 p-2 rounded-md bg-white border border-netral-20 dark:bg-dark_net-ter"
                    dropdownStyle="dark:bg-black dark:text-white"
                  />
                </div>
              </div>

              {/* Label gender */}
              <div>
                <label className="text-black dark:text-slate-100 text-sm font-medium">Jenis Kelamin</label>
                <div className="flex py-4 space-x-8">
                <label className="flex items-center gap-2 text-black dark:text-slate-100 text-sm font-medium">
                  <input
                      type="radio"
                      name="gender"
                      value="Laki-laki"
                      checked={formData.student_detail.gender === "Laki-laki"}
                      onChange={handleInputChange("student_detail.gender")}
                      className="w-5 h-5 accent-pri-main"
                  />
                  Laki-laki
                </label>
                <label className="flex items-center gap-2 text-black dark:text-slate-100 text-sm font-medium">
                  <input
                      type="radio"
                      name="gender"
                      value="Perempuan"
                      checked={formData.student_detail.gender === "Perempuan"}
                      onChange={handleInputChange("student_detail.gender")}
                      className="w-5 h-5 accent-pri-main"
                  />
                  Perempuan
                </label>
                </div>
              </div>

              {/* Label Aktif / tidak Aktif */}
              <div>
                <label className="text-black dark:text-slate-100 text-sm font-medium">Pilih Status</label>
                <div className="flex py-4 space-x-8">
                <label className="flex items-center gap-2 text-black dark:text-slate-100 text-sm font-medium">
                  <input
                      type="radio"
                      name="status"
                      value="0"
                      disabled={data?false:true}
                      checked={formData.student.is_graduate === "0"}
                      onChange={handleInputChange("student.is_graduate")}
                      className="w-5 h-5 accent-pri-main"
                  />
                  Aktif
                </label>
                <label className="flex items-center gap-2 text-black dark:text-slate-100 text-sm font-medium">
                  <input
                      type="radio"
                      name="status"
                      value="1"
                      disabled={data?false:true}
                      checked={formData.student.is_graduate === "1"}
                      onChange={handleInputChange("student.is_graduate")}
                      className="w-5 h-5 accent-pri-main"
                  />
                  Tidak Aktif
                </label>
                </div>
              </div>
              
          </div>
          
          {/* Data keluarga dan Data user */}
          <div className="md:w-1/2 space-y-5 mb-6">
            <h1 className="text-black dark:text-slate-100 text-xl font-semibold">Data Keluarga</h1>

            {/* Nama Orang Tua / Wali */}
            <div className="space-y-[5px]">
              <label className="text-black dark:text-slate-100 text-sm font-medium">Nama Orang Tua / Wali</label>
              <input 
                type="text" 
                value={formData.student_detail.parents_name || ""}
                onChange={handleInputChange("student_detail.parents_name")}
                placeholder="Masukkan nama orang tua / wali"
                className="w-full border border-netral-20 dark:bg-dark_net-ter rounded-md py-2 px-4 text-sm font-normal focus:outline-pri-main"
              />
            </div>

              {/* Nomor Telepon Orang Tua / Wali */}
            <div className="space-y-[5px]">
              <label className="text-black dark:text-slate-100 text-sm font-medium">Nomor Telepon Orang Tua / Wali</label>
              <input 
                type="text" 
                inputMode="numeric"
                maxLength={13}
                minLength={11}
                value={formData.student_detail.parents_phone || ""}
                onChange={handleInputChange("student_detail.parents_phone")}
                placeholder="Masukkan nomor telepon orang tua / wali"
                className="w-full border border-netral-20 dark:bg-dark_net-ter rounded-md py-2 px-4 text-sm font-normal focus:outline-pri-main"
              />
            </div>

            {/* Pekerjaan Orang Tua / Wali */}
            <div className="space-y-[5px]">
              <label className="text-black dark:text-slate-100 text-sm font-medium">Pekerjaan Orang Tua / Wali</label>
              <input 
                type="text" 
                value={formData.student_detail.parents_job || ""}
                onChange={handleInputChange("student_detail.parents_job")}
                placeholder="Masukkan pekerjaan orang tua / wali"
                className="w-full border border-netral-20 dark:bg-dark_net-ter rounded-md py-2 px-4 text-sm font-normal focus:outline-pri-main"
              />
            </div>

            {/* Alamat Orang Tua / Wali */}
            <div className="space-y-[5px]">
              <label className="text-black dark:text-slate-100 text-sm font-medium">Alamat Orang Tua / Wali</label>
              <input 
                type="text" 
                value={formData.student_detail.address || ""}
                onChange={handleInputChange("student_detail.address")}
                placeholder="Masukkan alamat orang tua / wali"
                className="w-full border border-netral-20 dark:bg-dark_net-ter rounded-md py-2 px-4 text-sm font-normal focus:outline-pri-main"
              />
            </div>

            <h1 className="text-black dark:text-slate-100 my-5 text-xl font-semibold">Data User</h1>

            {/* Email Siswa */}
            <div className="space-y-[5px]">
              <label className="text-black dark:text-slate-100 text-sm font-medium">Email Siswa</label>
              <input 
                type="email" 
                value={formData.user.email || ""}
                onChange={handleInputChange("user.email")}
                placeholder="Masukkan email siswa"
                className="w-full border border-netral-20 dark:bg-dark_net-ter rounded-md py-2 px-4 text-sm font-normal focus:outline-pri-main"
              />
            </div>

            {/* Username Siswa */}
            <div className="space-y-[5px]">
              <label className="text-black dark:text-slate-100 text-sm font-medium">Username Siswa</label>
              <input 
                type="text" 
                minLength={5}
                maxLength={13}
                value={formData.user.username || ""}
                onChange={handleInputChange("user.username")}
                placeholder="Masukkan username siswa"
                className="w-full border border-netral-20 dark:bg-dark_net-ter rounded-md py-2 px-4 text-sm font-normal focus:outline-pri-main"
              />
            </div>

            {/* Kata Sandi Siswa */}
            <div className="space-y-[5px]">
              <label className="text-black dark:text-slate-100 text-sm font-medium">Kata Sandi Siswa</label>
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
              <label className="text-black dark:text-slate-100 text-sm font-medium">Foto Profil</label>

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

                <div className={`${formData.student_detail.profile_picture?"text-black dark:text-slate-100":"text-netral-20"} px-4 py-2 w-full truncate text-black dark:text-slate-100`}>
                  {formData.student_detail.profile_picture
                    ? formData.student_detail.profile_picture.name
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
            onClick={()=>{router.push("/kesiswaan/data-siswa")}}
            type="button"
            className="w-1/2 md:w-[103px] h-[38px] px-2 py-1.5 text-sm font-medium border rounded-md border-red-600 dark:border-[#ff4022] text-red-600 dark:text-[#ff4022] hover:bg-red-500 dark:hover:bg-[#ff4022] dark:hover:text-slate-100 hover:text-white bg-white dark:bg-dark_net-quar transition-shadow duration-300 hover:shadow-md hover:scale-105 dark:hover:shadow-none">
            Batal
          </button>
          <button 
            type = "submit"
            className="w-1/2 md:w-[103px] h-[38px] px-2 py-1.5 rounded-md text-white text-sm font-medium bg-blue-600 hover:bg-blue-700 transition-shadow duration-500 hover:shadow-md hover:scale-105">
            Simpan
          </button>
        </div>

      </form>
    </div>
  )
}