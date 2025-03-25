import React, { use, useEffect, useState } from "react";
import { Edit, Eye, EyeSlash } from "iconsax-react";
import Image from "next/image";
import { getProfileStudent, updateStudentProfile } from "@/app/api/siswa/ApiSiswa";
import { toast, ToastContainer } from "react-toastify";
import { useProfile } from "@/provider/ProfileProvider";
import ImageCropper from "@/app/component/ImageCropper";
import getCroppedImg from "@/app/component/getCroppedImg";
import { change_password } from "@/app/api/ApiAuth";
import EditPopUp from "@/app/component/EditPopUp";
  

export default function StudentProfile() {
  const data = JSON.parse(sessionStorage.getItem("profile_data"));
  const studentId = data.data.profile.id;
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState('/picture/default.jpg');
  const [selectedFile, setSelectedFile] = useState(null);
  const { setProfileImg } = useProfile();
  const [croppingImage, setCroppingImage] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword : "",
    newPassword : "",
    newPasswordConfirmation : ""
});

  
  const dataURLtoFile = (dataUrl, filename) => {
    let arr = dataUrl.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, { type: mime });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCroppingImage(e.target.result); // Tampilkan cropper dulu
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = async (_, croppedAreaPixels) => {
    const { file, base64 } = await getCroppedImg(croppingImage, croppedAreaPixels);
  
    setImageSrc(base64); // Tampilkan preview gambar yang telah dicrop
    setSelectedFile(file); // Simpan file untuk dikirim ke backend
    setCroppingImage(null); // Tutup modal cropper
  
    setStudentData((prev) => ({
      ...prev,
      studentDetail: { ...prev.studentDetail, profilePicture: base64 }
    }));
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const [tanggal, setTanggal] = useState(formatDate(new Date()));
  const [activeTab, setActiveTab] = useState("editProfile");

  const fetchDetailSiswa = async () => {
    try {
      const data = await getProfileStudent(studentId);
      setStudentData(data.student);
    } catch (error) {
      console.error("Gagal memuat data siswa.", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    fetchDetailSiswa();
  }, [studentId]); 

  useEffect(() => {
      if (studentData) {
        let images = studentData.studentDetail.profilePicture;
        setTanggal(formatDate(new Date(studentData.studentDetail.birthDate)))
        
          console.log("sdee:", studentData);
      }
  }, [studentData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const image = studentData?.studentDetail.profilePicture

    const payload = {
      student: {
        is_graduate: studentData?.isGraduate, 
        name: studentData?.name,
      },
      student_detail: {
        nis: studentData?.studentDetail?.nis || "",
        nisn: studentData?.studentDetail?.nisn || "",
        gender:  "",
        religion: studentData?.studentDetail?.religion || "",
        birth_date:  "",
        birth_place:  "",
        address: studentData?.studentDetail?.address || "",
        enrollment_year:  "",
        parents_name: studentData?.studentDetail?.parentsName || "",
        parents_phone: "",
        parents_job: studentData?.studentDetail?.parentsJob || "",
        students_phone: studentData?.studentDetail?.studentsPhone || "",
        
      },
    };

    try {
      const response = await updateStudentProfile(studentId, payload, selectedFile)
      if(response.status == 200){
        toast.success(response.data.message)
        const newProfileImg = response.data.student.studentDetail.profilePicture;
        setProfileImg(newProfileImg);
        sessionStorage.setItem("profile_img", newProfileImg); 
        
        fetchDetailSiswa(); 
        
      }
      

    } catch (error) {
      toast.error(error);
      alert("Terjadi kesalahan saat memperbarui data.");
    }
  };

  const handleChangePassword = async (e) => {
    setLoading(true)
    e.preventDefault();
    const payload = {
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
      newPasswordConfirmation: formData.newPasswordConfirmation
    };

    try {
      const response = await change_password(payload);
      console.log(response)
      if(response && response.status == 200){
        toast.success(response.data.message)
        fetchDetailSiswa()
        setError(false)
        setErrors(false)
      } else {
        setErrors(true)
      }
      
    } finally {
      
      setLoading(false)
      setIsEdit(false)
      setFormData({ oldPassword: "", newPassword: "", newPasswordConfirmation: "" });
    }
  };
  
  const handleEdit = async(e) => {
    e.preventDefault();
    if(formData.newPassword == formData.newPasswordConfirmation){
      setIsEdit(true)
    } else {
      setError(true)
    }
  }

  const renderContent = () => {
    if (activeTab === "editProfile") {
      return (
        <div>
          {/* Modal Cropper */}
          {croppingImage && (
            <ImageCropper
              image={croppingImage}
              onCropComplete={handleCropComplete}
              onCancel={() => setCroppingImage(null)}
            />
          )}
          <div className= "relative w-[150px] h-[150px] flex items-center">
            <Image 
              src={studentData?.studentDetail.profilePicture || imageSrc } 
              className="rounded-full w-full h-full object-cover"
              alt="user photo" 
              width={150} 
              height={150} 
              priority 
            />
            {/* Tombol Edit */}
            <label className="bg-white rounded-lg w-[30px] h-[30px] cursor-pointer absolute bottom-0 right-0 flex items-center justify-center shadow-md">
              <Edit size={20} color="blue" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div className="w-full flex space-x-11">
              <div className="w-1/2 space-y-[5px]">
                <label className="text-black text-sm font-medium">Nama Lengkap</label>
                <input type="text" 
                  disabled
                  value={studentData?.name||""}
                  className="text-netral-40 w-full rounded-md py-2 px-4 text-sm font-medium bg-[#cccccc] placeholder-black"
                />
              </div>
              <div className="w-1/2 space-y-[5px]">
                <label className="text-black text-sm font-medium">Email</label>
                <input type="email" 
                  disabled
                  value={studentData?.user.email||""}
                  className="w-full text-netral-40 rounded-md py-2 px-4 text-sm font-medium bg-[#cccccc] placeholder-black"
                />
              </div>
            </div>
            <div className="w-full flex space-x-11">
              <div className="w-1/2 space-y-[5px]">
                <label className="text-black text-sm font-medium">NIS / NISN</label>
                <input type="text" 
                  disabled
                  value={studentData?.studentDetail.nis+" / "+ studentData?.studentDetail.nisn ||""}
                  className="w-full rounded-md py-2 px-4 text-sm text-netral-40 font-medium bg-[#cccccc] placeholder-black"
                />
              </div>
              <div className="w-1/2 space-y-[5px]">
                <label className="text-black text-sm font-medium">No. Telepon</label>
                <input type="text" 
                  value={studentData?.studentDetail.studentsPhone||""}
                  maxLength={13}
                  minLength={11}
                  onChange={(e) => setStudentData(prev => ({
                      ...prev,
                      studentDetail: { ...prev.studentDetail, studentsPhone: e.target.value }
                    }))}
                  className="w-full text-black rounded-md py-2 px-4 text-sm font-medium border border-gray-400 placeholder-black"
                />
              </div>
            </div>
            <div className="w-full flex space-x-11">
              <div className="w-1/2 space-y-[5px]">
                <label className="text-black text-sm font-medium">Jenis Kelamin</label>
                
                <div className="flex py-4 space-x-8">
                  {["Laki-Laki", "Perempuan"].map((gender, index) => {
                    const isChecked = studentData?.studentDetail?.gender === gender;
                    return (
                      <div key={index} className="flex items-center space-x-[18px]">
                        <input
                          id={gender.toLowerCase()}
                          type="radio"
                          name="gender"
                          checked={isChecked}
                          disabled
                          className={`w-4 h-4 border-gray-300 focus:ring-2 focus:ring-pri-main 
                            disabled:bg-pri-main disabled:border-pri-main bg-gray-100 
                            dark:bg-gray-700 dark:border-gray-600`}
                        />
                        <label
                          htmlFor={gender.toLowerCase()}
                          className="text-sm font-medium text-black dark:text-gray-300"
                        >
                          {gender}
                        </label>
                      </div>
                    );
                  })}
                </div>
            
              </div>
              <div className="w-1/2 space-y-[5px]">
                <label className="text-black text-sm font-medium">Pilih Status</label>
                <div className="flex py-4 space-x-8">
                  {[
                    { label: "Aktif", value: 0 },
                    { label: "Tidak Aktif", value: 1 }
                    ].map((status, index) => {
                    const isChecked = studentData?.isGraduate === status.value;
                    return (
                      <div key={index} className="flex items-center space-x-[18px]">
                        <input
                          id={status.label.toLowerCase().replace(" ", "-")}
                          type="radio"
                          name="status"
                          checked={isChecked}
                          disabled
                          className={`w-4 h-4 border-gray-300 focus:ring-2 focus:ring-pri-main 
                            disabled:bg-pri-main disabled:border-pri-main bg-gray-100 
                            dark:bg-gray-700 dark:border-gray-600`}
                        />
                        <label
                          htmlFor={status.label.toLowerCase().replace(" ", "-")}
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          {status.label}
                        </label>
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>
            <div className="space-y-[5px]">
              <label className="text-black text-sm font-medium">Agama</label>
                <input type="text" 
                  disabled
                  value={studentData?.studentDetail.religion||""}
                  className="w-full text-netral-40 rounded-md py-2 px-4 text-sm font-medium bg-[#cccccc] placeholder-black"
                />
            </div>
            <div className="w-full flex space-x-11">
              <div className="w-1/2 space-y-[5px]">
                <label className="text-black text-sm font-medium">Tempat Lahir</label>
                <input type="text" 
                  disabled
                  value={studentData?.studentDetail.birthPlace ||""}
                  className="w-full text-netral-40 rounded-md py-2 px-4 text-sm font-medium bg-[#cccccc] placeholder-black"
                />
              </div>
              <div className="w-1/2 space-y-[5px]">
                <label className="text-black text-sm font-medium">Tanggal Lahir</label>
                <input 
                  type="date" 
                  value={tanggal||""}
                  placeholder="Pilih Tanggal"
                  disabled
                  className="w-full text-netral-40 rounded-md py-2 px-4 text-sm font-medium bg-[#cccccc] placeholder-black"
                />
              </div>
            </div>
            <div className="w-full flex justify-end pt-[50px]">
              <button className="w-[147px] h-[38px] px-2 py-1.5 rounded-md text-white text-sm font-medium bg-[#0841e2] hover:bg-blue-700 transition-shadow duration-300 hover:shadow-md hover:shadow-gray-400">
                Simpan
              </button>
            </div>
          </form>
        </div>
      );
  } else if (activeTab === "changePassword") {
    return (

        <div className="mt-6 text-black">
          {/* Pop-up Konfirmasi Delete */}
          {isEdit && (
            <div className="z-30 fixed inset-0 bg-black/50 flex justify-center items-center">
              <EditPopUp
                onCancel={() => setIsEdit(false)}
                onConfirm={handleChangePassword}
                isLoading={loading}
              />
            </div>
          )}
          
          <form onSubmit={handleEdit}>
            <div className="space-y-[5px] mb-5">
              <label className="text-black text-sm font-medium">Kata Sandi Lama</label>
              <div className="relative w-full"> 
                <input 
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  placeholder="Masukkan kata sandi lama"
                  type={showOldPassword ? "text" : "password"}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition duration-200
                    bg-white text-gray-900 placeholder-gray-400 pr-12
                    dark:bg-gray-800 dark:text-white dark:placeholder-netral-30 
                    ${error || errors? 
                      "border-err-main focus:ring-err-main dark:border-red-400 dark:focus:ring-red-400" 
                      : 
                      "border-gray-300 focus:ring-pri-main dark:border-netral-30 dark:focus:ring-pri-border"
                    }`}
                    required
                />
                <button 
                  type="button"
                  className="absolute inset-y-0 right-4 flex items-center justify-center text-gray-500 dark:text-gray-300"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? (
                    <EyeSlash size="20" color="#7F7F7F" variant="Outline" />
                  ) : (
                    <Eye size="20" color="#7F7F7F" variant="Outline"/>
                  )}
                </button>
              </div>
              
            </div>

            <div className="space-y-[5px] mb-5">
              <label className="text-black text-sm font-medium">Kata Sandi Baru</label>
              <div className="relative w-full"> 
                <input 
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Masukkan kata sandi lama"
                  type={showPassword ? "text" : "password"}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition duration-200
                    bg-white text-gray-900 placeholder-gray-400 pr-12
                    dark:bg-gray-800 dark:text-white dark:placeholder-netral-30 
                    ${error || errors ? 
                      "border-err-main focus:ring-err-main dark:border-red-400 dark:focus:ring-red-400" 
                      : 
                      "border-gray-300 focus:ring-pri-main dark:border-netral-30 dark:focus:ring-pri-border"
                    }`}
                    required
                />
                <button 
                  type="button"
                  className="absolute inset-y-0 right-4 flex items-center justify-center text-gray-500 dark:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlash size="20" color="#7F7F7F" variant="Outline" />
                  ) : (
                    <Eye size="20" color="#7F7F7F" variant="Outline"/>
                  )}
                </button>
              </div>
              {error && <span className="text-xs text-err-main absolute">Kata sandi baru dan konfirmasi kata sandi baru harus sama!</span>}
            </div>

            <div className="space-y-[5px] mb-5">
              <label className="text-black text-sm font-medium">Konfirmasi Kata Sandi Baru</label>
              <div className="relative w-full"> 
                <input 
                  name="newPasswordConfirmation"
                  value={formData.newPasswordConfirmation}
                  onChange={handleChange}
                  placeholder="Masukkan kata sandi lama"
                  type={showConfirmPassword ? "text" : "password"}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition duration-200
                    bg-white text-gray-900 placeholder-gray-400 pr-12
                    dark:bg-gray-800 dark:text-white dark:placeholder-netral-30 
                    ${error || errors? 
                      "border-err-main focus:ring-err-main dark:border-red-400 dark:focus:ring-red-400" 
                      : 
                      "border-gray-300 focus:ring-pri-main dark:border-netral-30 dark:focus:ring-pri-border"
                    }`}
                    required
                />
                <button 
                  type="button"
                  className="absolute inset-y-0 right-4 flex items-center justify-center text-gray-500 dark:text-gray-300"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showOldPassword ? (
                    <EyeSlash size="20" color="#7F7F7F" variant="Outline" />
                  ) : (
                    <Eye size="20" color="#7F7F7F" variant="Outline"/>
                  )}
                </button>
              </div>
              {error && <span className="text-xs text-err-main">Kata sandi baru dan konfirmasi kata sandi baru harus sama!</span>}
            </div>

            <div className="w-full flex justify-end pt-[50px]">
              <button 
                type="submit"
                className="w-[147px] h-[38px] px-2 py-1.5 rounded-md text-white text-sm font-medium bg-[#0841e2] hover:bg-blue-800 transition-shadow duration-300 hover:shadow-md hover:shadow-gray-400">
                Simpan
              </button>
            </div>
          </form>
          
        </div>
      );
    }
  };

  return (
    <div>
    <ToastContainer />
      <h1 className="text-black text-xl font-semibold ">Profil Pengguna</h1>
      <div className="w-full py-5 px-4 mt-[25px]">
        <div className="w-full flex border-b-[1.5px] border-[#0841e2] space-x-4">
          <button 
            onClick={() => setActiveTab("editProfile")}
            className={`w-36 px-4 py-[13.5px] ${activeTab === "editProfile" ? "bg-[#0841e2] text-white" : "bg-white text-[#0841e2]"} rounded-t-md text-sm font-semibold justify-center items-center gap-2.5 hover:bg-blue-800 hover:text-white transition-shadow duration-300 hover:shadow-md hover:shadow-gray-400 cursor-pointer`}
            >Edit Profil
          </button>
          <button 
            onClick={() => setActiveTab("changePassword")}
            className={`w-36 px-4 py-[13.5px] ${activeTab === "changePassword" ? "bg-[#0841e2] text-white" : "bg-white text-[#0841e2]"} rounded-t-md text-sm font-semibold justify-center items-center gap-2.5 hover:bg-blue-800 hover:text-white transition-shadow duration-300 hover:shadow-md hover:shadow-gray-400 cursor-pointer`}
            >Ubah Kata Sandi
          </button>
        </div>
        <div className="w-full p-[25px]">
          {renderContent()} 
        </div>
      </div>
    </div>
  )
}